import React, { useState } from 'react';
import { Users, Plus, Database } from 'lucide-react';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { SearchBar } from './components/SearchBar';
import { useUsers } from './hooks/useUsers';
import { User } from './types/User';

function App() {
  const {
    users,
    totalUsers,
    searchTerm,
    setSearchTerm,
    addUser,
    updateUser,
    deleteUser
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (userData: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser(userData);
    }
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestión de Usuarios
              </h1>
              <p className="text-gray-600 flex items-center space-x-2 mt-1">
                <Database size={16} />
                <span>{totalUsers} usuarios registrados</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCreateUser}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-gray-600 text-sm">Usuarios mostrados</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{totalUsers}</div>
            <div className="text-gray-600 text-sm">Total registrados</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(users.reduce((acc, u) => acc + u.age, 0) / users.length) || 0}
            </div>
            <div className="text-gray-600 text-sm">Edad promedio</div>
          </div>
        </div>

        {/* Users Table */}
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/* Empty State for No Users */}
        {users.length === 0 && (
          <div className="text-center py-16 mt-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza agregando un usuario'}
            </p>
            <button
              onClick={handleCreateUser}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus size={20} />
              <span>Agregar Usuario</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          user={editingUser}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteUser}
          user={userToDelete}
        />
      )}
    </div>
  );
}

export default App;