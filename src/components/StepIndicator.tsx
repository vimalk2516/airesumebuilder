import React from 'react';
import { Check, User, GraduationCap, Briefcase, Code, Award, FileText, Eye } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: any;
}

const steps = [
  { id: 0, title: 'Personal Info', icon: User, key: 'personalInfo', required: true },
  { id: 1, title: 'Education', icon: GraduationCap, key: 'education', required: false },
  { id: 2, title: 'Experience', icon: Briefcase, key: 'experience', required: false },
  { id: 3, title: 'Projects', icon: Code, key: 'projects', required: false },
  { id: 4, title: 'Skills', icon: Award, key: 'skills', required: false },
  { id: 5, title: 'Certifications', icon: FileText, key: 'certifications', required: false },
  { id: 6, title: 'Review', icon: Eye, key: 'review', required: false }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, completedSteps }) => {
  const { setCurrentStep, resumeData } = useResume();

  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    const isCompleted = completedSteps[step.key as keyof typeof completedSteps];
    const isCurrent = currentStep === stepIndex;
    
    // Check if step has content
    let hasContent = false;
    switch (stepIndex) {
      case 0: // Personal Info
        hasContent = !!(resumeData.personalInfo.fullName || resumeData.personalInfo.email);
        break;
      case 1: // Education
        hasContent = resumeData.education.length > 0;
        break;
      case 2: // Experience
        hasContent = resumeData.experience.length > 0;
        break;
      case 3: // Projects
        hasContent = resumeData.projects.length > 0;
        break;
      case 4: // Skills
        hasContent = resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0;
        break;
      case 5: // Certifications
        hasContent = resumeData.certifications.length > 0;
        break;
      case 6: // Review
        hasContent = true;
        break;
    }

    return { isCompleted, isCurrent, hasContent };
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const { isCompleted, isCurrent, hasContent } = getStepStatus(index);

          return (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105
                    ${isCompleted 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : isCurrent 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : hasContent
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                  title={`Go to ${step.title}`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </button>
                <div className="text-center mt-2">
                  <span className={`
                    text-sm font-medium transition-colors duration-300 block
                    ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : hasContent ? 'text-blue-500' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </span>
                  {!step.required && (
                    <span className="text-xs text-gray-400">Optional</span>
                  )}
                  {hasContent && !isCompleted && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-4 transition-colors duration-300
                  ${hasContent || index < currentStep ? 'bg-blue-300' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Click on any section above to jump directly to it. Fill out sections in any order you prefer.
        </p>
        <div className="flex justify-center items-center gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 border-2 border-blue-400 rounded-full"></div>
            <span>Has Content</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
            <span>Empty</span>
          </div>
        </div>
      </div>
    </div>
  );
};