import { ReactNode } from 'react';

type AuthButtonProps = {
  label?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function AuthButton({ label, children, onClick, disabled }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-semibold rounded-xl px-6 py-4 text-center transition-all duration-300 text-lg ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 hover:shadow-lg transform hover:scale-105'
      }`}
    >
      {children ?? label}
    </button>
  );
}

