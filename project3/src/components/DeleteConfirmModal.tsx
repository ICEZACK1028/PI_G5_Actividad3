import React from 'react';
import { User } from '../types/User';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  onClose,
  onConfirm,
  user
}) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Confirmar eliminación
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            ¿Estás seguro de que deseas eliminar al usuario{' '}
            <strong className="text-gray-900">{user.name}</strong>?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Esta acción no se puede deshacer. Toda la información del usuario será eliminada permanentemente.
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Trash2 size={18} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};