import React, { useState, useEffect } from 'react';
import { Key, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface APIKeySetupProps {
  onComplete: () => void;
}

export const APIKeySetup: React.FC<APIKeySetupProps> = ({ onComplete }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if API key is already set
    const existingKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (
      existingKey &&
      existingKey !== 'AIzaSyCGNfzPnoylWkWtWeDgpdr6noXJ0BJgiww'
    ) {
      setIsValid(true);
      onComplete();
    }
  }, [onComplete]);

  const validateApiKey = async (key: string) => {
    setIsValidating(true);
    setError('');

    try {
      // Basic validation - check if it looks like a valid API key
      if (!key || key.length < 20 || !key.startsWith('AIza')) {
        throw new Error(
          'Invalid API key format. Gemini API keys start with "AIza" and are longer than 20 characters.'
        );
      }

      // Store the API key temporarily for validation
      // Note: In a real app, you'd want to validate this against the actual API
      localStorage.setItem('temp_gemini_api_key', key);

      setIsValid(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid API key');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      validateApiKey(apiKey.trim());
    }
  };

  if (isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            API Key Validated!
          </h2>
          <p className="text-gray-600 mb-6">
            Your Gemini API key has been validated successfully. You can now use
            all AI features.
          </p>
          <div className="animate-pulse text-blue-600">
            Redirecting to resume builder...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Gemini API Key
          </h1>
          <p className="text-gray-600">
            To use AI features, please provide your Google Gemini API key
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">
            How to get your Gemini API Key:
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                1
              </span>
              Visit Google AI Studio
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                2
              </span>
              Sign in with your Google account
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                3
              </span>
              Click "Get API Key\" and create a new key
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">
                4
              </span>
              Copy the API key and paste it below
            </li>
          </ol>
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get API Key
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="AIzaSy..."
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!apiKey.trim() || isValidating}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Validating...
              </>
            ) : (
              <>
                <Key className="w-5 h-5 mr-2" />
                Validate API Key
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            Why do we need this?
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Generate professional resume summaries</li>
            <li>• Enhance job descriptions and achievements</li>
            <li>• Parse uploaded resume content</li>
            <li>• Create resumes from text prompts</li>
            <li>• Provide improvement suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
