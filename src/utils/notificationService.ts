import { toast } from 'react-toastify';
import { NotificationOptions } from '../types/NotificationOptions';

export const showSuccessNotification = (message: string, options?: NotificationOptions) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showErrorNotification = (message: string, options?: NotificationOptions) => {
  toast.error(message, {
    ...options,
  });
};
