'use client';

import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disables?: boolean;
}

const Button: FC<IButtonProps> = ({
  type, fullWidth, children, onClick, secondary, danger, disables,
}) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disables}
    className={clsx(
      `
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    `,
      disables && 'opacity-50 cursor-default',
      fullWidth && 'w-full',
      secondary ? 'text-gray-900' : 'text-white',
      danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
      !secondary && !danger && 'bg-sky-500 hover:bg-sky-500 focus-visible:outline-sky-600',
    ) }
  >
    {children}
  </button>
);

export default Button;
