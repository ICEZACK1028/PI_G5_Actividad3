import { User, UserFormData } from '../types/User';

const API_URL = 'http://localhost:5000';

export const api = {
    // Obtener todos los usuarios
    getUsers: async (): Promise<User[]> => {
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Crear un usuario
    createUser: async (userData: UserFormData): Promise<void> => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error creating user');
        }
    },

    // Actualizar un usuario
    updateUser: async (id: string, userData: UserFormData): Promise<void> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error updating user');
        }
    },

    // Eliminar un usuario
    deleteUser: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error deleting user');
        }
    },
};