import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, AIEnhancedContent, FormSteps } from '../types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  aiEnhancedContent: AIEnhancedContent | null;
  setAiEnhancedContent: React.Dispatch<React.SetStateAction<AIEnhancedContent | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  completedSteps: FormSteps;
  setCompletedSteps: React.Dispatch<React.SetStateAction<FormSteps>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    github: '',
    website: ''
  },
  careerObjective: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: []
  },
  certifications: [],
  languages: []
};

const initialCompletedSteps: FormSteps = {
  personalInfo: false,
  education: false,
  experience: false,
  projects: false,
  skills: false,
  certifications: false,
  review: false
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [aiEnhancedContent, setAiEnhancedContent] = useState<AIEnhancedContent | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<FormSteps>(initialCompletedSteps);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      aiEnhancedContent,
      setAiEnhancedContent,
      currentStep,
      setCurrentStep,
      completedSteps,
      setCompletedSteps,
      isGenerating,
      setIsGenerating
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};