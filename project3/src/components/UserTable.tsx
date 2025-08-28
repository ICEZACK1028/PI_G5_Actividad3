import React from 'react';
import { User } from '../types/User';
import { Edit3, Trash2, Mail, Phone, Briefcase, Building2, Calendar } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No se encontraron usuarios
        </h3>
        <p className="text-gray-500">
          Los usuarios aparecerán aquí cuando agregues algunos o ajustes los filtros
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Nombre</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Edad</th>
              <th className="px-6 py-3 border-b text-left">Teléfono</th>
              <th className="px-6 py-3 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{user.name}</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b">{user.age}</td>
                <td className="px-6 py-4 border-b">{user.phone}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};