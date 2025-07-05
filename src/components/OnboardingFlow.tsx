import React, { useState } from 'react';
import { FileText, Upload, Sparkles, ArrowRight, User, Zap } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

interface OnboardingFlowProps {
  onComplete: (method: 'scratch' | 'upload' | 'ai') => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<'scratch' | 'upload' | 'ai' | null>(null);

  const methods = [
    {
      id: 'scratch' as const,
      title: 'Create from Scratch',
      description: 'Build your resume step by step with our guided form',
      icon: FileText,
      color: 'blue',
      features: ['Step-by-step guidance', 'Real-time preview', 'Professional templates']
    },
    {
      id: 'upload' as const,
      title: 'Upload Existing Resume',
      description: 'Upload your PDF resume and let AI enhance it',
      icon: Upload,
      color: 'green',
      features: ['PDF parsing', 'Auto-fill forms', 'AI enhancement']
    },
    {
      id: 'ai' as const,
      title: 'AI-Generated Resume',
      description: 'Describe your background and let AI create your resume',
      icon: Sparkles,
      color: 'purple',
      features: ['AI-powered creation', 'Smart suggestions', 'Instant generation']
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-blue-200',
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        border: isSelected ? 'border-green-500' : 'border-green-200',
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        border: isSelected ? 'border-purple-500' : 'border-purple-200',
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Welcome to ResumeMade Easy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to create your professional resume. Each method is designed to help you build an outstanding resume quickly and efficiently.
          </p>
        </div>

        {/* Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            const colorClasses = getColorClasses(method.color, isSelected);

            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`
                  relative cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${colorClasses.bg} ${colorClasses.border} border-2 rounded-2xl p-8
                  ${isSelected ? 'shadow-xl ring-4 ring-opacity-20' : 'shadow-lg hover:shadow-xl'}
                `}
                style={{
                  ringColor: isSelected ? `var(--${method.color}-500)` : 'transparent'
                }}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-full ${colorClasses.icon} bg-white shadow-md mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  <div className="space-y-3">
                    {method.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center text-sm text-gray-700">
                        <div className={`w-2 h-2 rounded-full ${colorClasses.icon.replace('text-', 'bg-')} mr-3`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedMethod && (
          <div className="text-center">
            <button
              onClick={() => onComplete(selectedMethod)}
              className={`
                inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-xl
                transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                ${getColorClasses(
                  methods.find(m => m.id === selectedMethod)?.color || 'blue',
                  false
                ).button}
              `}
            >
              Continue with {methods.find(m => m.id === selectedMethod)?.title}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              You can always switch methods later or combine approaches
            </p>
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Enhancement</h4>
            <p className="text-sm text-gray-600">
              Every resume gets enhanced with professional AI optimization
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Multiple Formats</h4>
            <p className="text-sm text-gray-600">
              Download as PDF resume or HTML portfolio website
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Preview</h4>
            <p className="text-sm text-gray-600">
              See your resume update instantly as you make changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};