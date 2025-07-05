import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const steps = [
  'Personal Info',
  'Education',
  'Experience',
  'Projects',
  'Skills',
  'Certifications',
  'Review'
];

export const FormNavigation: React.FC = () => {
  const { currentStep, setCurrentStep, resumeData, setCompletedSteps } = useResume();

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Personal Info
        return !!(resumeData.personalInfo.fullName && 
                 resumeData.personalInfo.email && 
                 resumeData.personalInfo.phone &&
                 resumeData.personalInfo.location);
      case 1: // Education
        return resumeData.education.length > 0 && 
               resumeData.education.every(edu => edu.degree && edu.institution && edu.year);
      case 2: // Experience
        return resumeData.experience.length > 0 && 
               resumeData.experience.every(exp => exp.company && exp.position && exp.duration && exp.description);
      case 3: // Projects
        return resumeData.projects.length > 0 && 
               resumeData.projects.every(proj => proj.title && proj.description && proj.technologies.length > 0);
      case 4: // Skills
        return resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0;
      case 5: // Certifications
        return true; // Optional step
      case 6: // Review
        return true;
      default:
        return false;
    }
  };

  const markStepAsCompleted = (stepIndex: number) => {
    const stepKeys = ['personalInfo', 'education', 'experience', 'projects', 'skills', 'certifications', 'review'];
    setCompletedSteps(prev => ({
      ...prev,
      [stepKeys[stepIndex]]: true
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      markStepAsCompleted(currentStep);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const canProceedToReview = () => {
    // Check if at least personal info and one other major section is filled
    const hasPersonalInfo = !!(resumeData.personalInfo.fullName && 
                              resumeData.personalInfo.email && 
                              resumeData.personalInfo.phone &&
                              resumeData.personalInfo.location);
    
    const hasEducation = resumeData.education.length > 0;
    const hasExperience = resumeData.experience.length > 0;
    const hasProjects = resumeData.projects.length > 0;
    const hasSkills = resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0;
    
    return hasPersonalInfo && (hasEducation || hasExperience || hasProjects || hasSkills);
  };

  const isOptionalStep = currentStep === 5; // Certifications is optional
  const isReviewStep = currentStep === 6;
  const canShowNext = currentStep < steps.length - 1;
  const canShowSkip = !isReviewStep && !validateCurrentStep() && !isOptionalStep;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="font-medium text-gray-900">{steps[currentStep]}</p>
          {isOptionalStep && (
            <p className="text-xs text-blue-600 mt-1">Optional Section</p>
          )}
        </div>
        
        <div className="flex gap-2">
          {canShowSkip && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Skip
            </button>
          )}
          
          {canShowNext && (
            <button
              onClick={handleNext}
              disabled={isReviewStep && !canProceedToReview()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
      
      {isReviewStep && !canProceedToReview() && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            Please fill in your personal information and at least one other section (Education, Experience, Projects, or Skills) before reviewing.
          </p>
        </div>
      )}
    </div>
  );
};