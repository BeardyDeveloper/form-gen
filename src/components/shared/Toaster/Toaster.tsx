import React from 'react';
import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

import { ToastBody } from './ToastBody/ToastBody';
import { ToastIcon } from './ToastIcon/ToastIcon';

export enum ToastType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

interface ToastConfig {
  title?: string;
  text?: string;
  options?: ToastOptions;
}

export const toaster = (toastType: ToastType, config: ToastConfig) => {
  const { title, text, options } = config;

  switch (toastType) {
    case ToastType.Success:
      return toast.success(<ToastBody title={title} text={text} />, {
        ...options,
        autoClose: 70000,
        draggable: true,
        icon: <ToastIcon type={ToastType.Success} />,
      });
    case ToastType.Info:
      return toast.info(<ToastBody title={title} text={text} />, {
        ...options,
        autoClose: 70000,
        draggable: true,
        icon: <ToastIcon type={ToastType.Info} />,
      });

    case ToastType.Warning:
      return toast.warning(<ToastBody title={title} text={text} />, {
        ...options,
        autoClose: 70000,
        draggable: true,
        icon: <ToastIcon type={ToastType.Warning} />,
      });

    case ToastType.Error:
      return toast.error(<ToastBody title={title} text={text} />, {
        ...options,
        autoClose: 70000,
        draggable: true,
        icon: <ToastIcon type={ToastType.Error} />,
      });

    default:
      return toast.error(<ToastBody title={title} text={text} />, {
        ...options,
        autoClose: 70000,
        draggable: true,
        icon: <ToastIcon type={ToastType.Error} />,
      });
  }
};
