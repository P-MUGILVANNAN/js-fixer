import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="w-full">
      <label htmlFor="code-input" className="block text-sm font-semibold text-gray-700 mb-2">
        Paste your JavaScript here
      </label>
      <div className="relative group">
        <textarea
          id="code-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="// e.g. const x = 10;"
          className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-y text-gray-800 disabled:bg-gray-50 disabled:text-gray-400"
          spellCheck={false}
        />
        <div className="absolute top-2 right-2 pointer-events-none">
           <span className="text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">JS</span>
        </div>
      </div>
    </div>
  );
};

export default CodeInput;