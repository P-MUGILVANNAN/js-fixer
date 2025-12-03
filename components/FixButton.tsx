import React from 'react';
import Spinner from './Spinner';

interface FixButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const FixButton: React.FC<FixButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all transform duration-200
        flex items-center justify-center min-w-[160px]
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed opacity-70' 
          : 'bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
        }
      `}
    >
      {isLoading ? <Spinner /> : 'Fix Error'}
    </button>
  );
};

export default FixButton;