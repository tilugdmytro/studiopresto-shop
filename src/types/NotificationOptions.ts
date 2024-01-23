import { ToastOptions } from 'react-toastify';

export interface NotificationOptions {
  position?: ToastOptions['position'];
  autoClose?: ToastOptions['autoClose'];
  hideProgressBar?: ToastOptions['hideProgressBar'];
  closeOnClick?: ToastOptions['closeOnClick'];
  pauseOnHover?: ToastOptions['pauseOnHover'];
  draggable?: ToastOptions['draggable'];
}