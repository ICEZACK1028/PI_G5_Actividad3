import { useState, useEffect, useMemo } from 'react';
import { User, UserFormData } from '../types/User';
import { api } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  const addUser = async (userData: UserFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.createUser(userData);
      await loadUsers(); // Recargar la lista después de crear
    } catch (err) {
      setError('Error al crear el usuario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: UserFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.updateUser(userId, userData);
      await loadUsers(); // Recargar la lista después de actualizar
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.deleteUser(userId);
      await loadUsers(); // Recargar la lista después de eliminar
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users: filteredUsers,
    totalUsers: users.length,
    searchTerm,
    setSearchTerm,
    addUser,
    updateUser,
    deleteUser,
    isLoading,
    error
  };
};