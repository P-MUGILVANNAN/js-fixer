import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import FixButton from './components/FixButton';
import ResultCard from './components/ResultCard';
import { fixJavaScriptCode } from './services/fixer';
import { FixResult, FixStatus } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [status, setStatus] = useState<FixStatus>(FixStatus.IDLE);
  const [result, setResult] = useState<FixResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFixCode = async () => {
    if (!code.trim()) return;

    setStatus(FixStatus.LOADING);
    setErrorMessage(null);
    setResult(null);

    try {
      const fixResult = await fixJavaScriptCode(code);
      setResult(fixResult);
      setStatus(FixStatus.SUCCESS);
    } catch (error) {
      setStatus(FixStatus.ERROR);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };

  const reset = () => {
    setResult(null);
    setStatus(FixStatus.IDLE);
    setErrorMessage(null);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (status !== FixStatus.IDLE) {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
             </div>
             <h1 className="text-xl font-bold text-gray-900 tracking-tight">
               JS <span className="text-brand-600">Fixer</span>
             </h1>
          </div>
          <a href="https://github.com/google/generative-ai-js" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
            Developed by MV Softkey TechHub
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col gap-8">
          
          {/* Intro Text */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Debug JavaScript Instantly
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Paste your broken code below. AI will detect syntax errors, fix logical bugs, and explain exactly what went wrong.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-6">
            <CodeInput 
              value={code} 
              onChange={handleCodeChange}
              disabled={status === FixStatus.LOADING}
            />
            
            <div className="flex justify-center">
              <FixButton 
                onClick={handleFixCode} 
                isLoading={status === FixStatus.LOADING}
                disabled={!code.trim()}
              />
            </div>
          </div>

          {/* Error Message */}
          {status === FixStatus.ERROR && errorMessage && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start">
               <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span className="text-red-700 font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Results Section */}
          {status === FixStatus.SUCCESS && result && (
            <ResultCard result={result} />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} JS Error Fixer.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;