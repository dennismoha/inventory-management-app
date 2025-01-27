// Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', size = 'medium', disabled = false }) => {
  // Button size and color classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-100'
  };

  // Combining classes based on props
  const buttonClasses = `${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} rounded-lg transition-all duration-300`;

  return (
    <button onClick={!disabled ? onClick : undefined} className={buttonClasses} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
