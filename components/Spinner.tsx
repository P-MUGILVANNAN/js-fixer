import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="text-white font-medium">Analyzing Code...</span>
    </div>
  );
};

export default Spinner;