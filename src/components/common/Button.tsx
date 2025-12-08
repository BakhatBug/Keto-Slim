import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'submit';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ariaLabel,
  icon,
  iconPosition = 'right',
}) => {
  const baseStyles = 'text-lg font-bold py-2 rounded-lg flex items-center justify-between gap-2 shadow transition hover:opacity-90 cursor-pointer disabled:opacity-50';

  const variantStyles = {
    primary: 'bg-[rgb(54,188,159)] border-2 border-[rgb(54,188,159)] text-white',
    secondary: 'bg-transparent border-2 border-[rgb(54,188,159)] text-[rgb(54,188,159)]',
    submit: 'bg-[rgb(54,188,159)] border border-[rgb(54,188,159)] text-white',
  };

  const variantClass = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`${baseStyles} ${variantClass} ${className}`}
    >
      {iconPosition === 'left' && icon && (
        <span className="ml-2">{icon}</span>
      )}
      {iconPosition === 'left' && !icon && (
        <span className="w-5 mr-2"></span>
      )}

      <span className="flex-1 text-center">{children}</span>

      {iconPosition === 'right' && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {iconPosition === 'right' && !icon && (
        <span className="w-5 mr-2"></span>
      )}
    </button>
  );
}

export default Button;
