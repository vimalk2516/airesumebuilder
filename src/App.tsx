import React, { useState } from 'react';
import { ResumeProvider } from './contexts/ResumeContext';
import { StepIndicator } from './components/StepIndicator';
import { FormNavigation } from './components/FormNavigation';
import { ResumePreview } from './components/ResumePreview';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { EducationForm } from './components/forms/EducationForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { CertificationsForm } from './components/forms/CertificationsForm';
import { ReviewForm } from './components/ReviewForm';
import { OnboardingFlow } from './components/OnboardingFlow';
import { UploadResumeForm } from './components/UploadResumeForm';
import { AIPromptForm } from './components/AIPromptForm';
import { ChatBot } from './components/ChatBot';
import { useResume } from './contexts/ResumeContext';
import { FileText, Sparkles, ArrowLeft, Zap } from 'lucide-react';

const FormStep: React.FC = () => {
  const { currentStep } = useResume();

  switch (currentStep) {
    case 0:
      return <PersonalInfoForm />;
    case 1:
      return <EducationForm />;
    case 2:
      return <ExperienceForm />;
    case 3:
      return <ProjectsForm />;
    case 4:
      return <SkillsForm />;
    case 5:
      return <CertificationsForm />;
    case 6:
      return <ReviewForm />;
    default:
      return <PersonalInfoForm />;
  }
};

const AppContent: React.FC = () => {
  const { currentStep, completedSteps } = useResume();
  const [creationMethod, setCreationMethod] = useState<'scratch' | 'upload' | 'ai' | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = (method: 'scratch' | 'upload' | 'ai') => {
    setCreationMethod(method);
    if (method === 'scratch') {
      setShowOnboarding(false);
    }
  };

  const handleMethodComplete = () => {
    setShowOnboarding(false);
  };

  const handleBackToOnboarding = () => {
    setShowOnboarding(true);
    setCreationMethod(null);
  };

  // Show onboarding flow
  if (showOnboarding && !creationMethod) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Show upload form
  if (creationMethod === 'upload' && showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Glassmorphism Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <header className="relative backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Upload Resume
                  </h1>
                  <p className="text-gray-600">Upload your existing resume for AI enhancement</p>
                </div>
              </div>
              <button
                onClick={handleBackToOnboarding}
                className="flex items-center px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 text-gray-700 rounded-lg hover:bg-white/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Options
              </button>
            </div>
          </div>
        </header>
        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UploadResumeForm onComplete={handleMethodComplete} />
        </main>
      </div>
    );
  }

  // Show AI prompt form
  if (creationMethod === 'ai' && showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Glassmorphism Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-blue-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <header className="relative backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI Resume Generator
                  </h1>
                  <p className="text-gray-600">Let AI create your resume from your description</p>
                </div>
              </div>
              <button
                onClick={handleBackToOnboarding}
                className="flex items-center px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 text-gray-700 rounded-lg hover:bg-white/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Options
              </button>
            </div>
          </div>
        </header>
        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AIPromptForm onComplete={handleMethodComplete} />
        </main>
      </div>
    );
  }

  // Show main resume builder
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ResumeMade Easy
                </h1>
                <p className="text-gray-600">Create professional resumes with AI enhancement</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-500 backdrop-blur-sm bg-white/30 px-3 py-1 rounded-full border border-white/40">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>Powered by Gemini AI</span>
              </div>
              <button
                onClick={handleBackToOnboarding}
                className="flex items-center px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 text-gray-700 rounded-lg hover:bg-white/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Method
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
        
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-300px)]">
          {/* Form Section - Left Side */}
          <div className="lg:w-1/2 space-y-6">
            <FormStep />
            <FormNavigation />
          </div>
          
          {/* Preview Section - Right Side */}
          <div className="lg:w-1/2">
            <div className="sticky top-8">
              <div className="mb-4">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Live Preview
                </h2>
                <p className="text-gray-600 text-sm">
                  See how your resume looks as you build it. Changes appear in real-time.
                </p>
              </div>
              <div className="h-[calc(100vh-400px)] overflow-y-auto">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;