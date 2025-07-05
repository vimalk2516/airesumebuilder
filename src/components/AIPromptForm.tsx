import React, { useState } from 'react';
import { Sparkles, User, Briefcase, GraduationCap, Target, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { geminiService } from '../services/geminiService';

interface AIPromptFormProps {
  onComplete: () => void;
}

export const AIPromptForm: React.FC<AIPromptFormProps> = ({ onComplete }) => {
  const { setResumeData, setAiEnhancedContent } = useResume();
  const [formData, setFormData] = useState({
    fullName: '',
    targetRole: '',
    experience: '',
    education: '',
    skills: '',
    achievements: '',
    additionalInfo: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.fullName || !formData.targetRole || !formData.experience) {
      setError('Please fill in at least your name, target role, and experience.');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate resume from prompt
      const generatedResume = await geminiService.generateResumeFromPrompt(formData);
      setResumeData(generatedResume);

      // Generate enhanced content
      const enhancedContent = await geminiService.enhanceResume(generatedResume);
      setAiEnhancedContent(enhancedContent);

      // Auto-proceed after success
      setTimeout(() => {
        onComplete();
      }, 1500);

    } catch (error) {
      console.error('Error generating resume:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = formData.fullName && formData.targetRole && formData.experience;

  if (isGenerating) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center py-12">
          <Loader className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Resume...</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            AI is analyzing your information and creating a professional resume tailored to your background.
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>✨ Generating professional summary</p>
            <p>📝 Creating detailed descriptions</p>
            <p>🎯 Optimizing for your target role</p>
            <p>🚀 Adding industry keywords</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Resume Generator</h2>
        <p className="text-gray-600">
          Tell us about yourself and let AI create a professional resume for you
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-2" />
              Target Role *
            </label>
            <input
              type="text"
              value={formData.targetRole}
              onChange={(e) => handleInputChange('targetRole', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Software Engineer, Marketing Manager, etc."
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 mr-2" />
            Professional Experience *
          </label>
          <textarea
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Describe your work experience, including companies, roles, and key responsibilities. Example: 'Worked as a Software Engineer at TechCorp for 3 years, developing web applications using React and Node.js...'"
          />
        </div>

        {/* Education */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education Background
          </label>
          <textarea
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Your educational background, degrees, institutions, and graduation years. Example: 'Bachelor of Computer Science from MIT, graduated 2020...'"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Skills & Technologies
          </label>
          <textarea
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="List your technical and soft skills. Example: 'JavaScript, React, Python, Project Management, Team Leadership...'"
          />
        </div>

        {/* Achievements */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Key Achievements & Projects
          </label>
          <textarea
            value={formData.achievements}
            onChange={(e) => handleInputChange('achievements', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Notable achievements, projects, awards, or certifications. Example: 'Led a team of 5 developers to build an e-commerce platform that increased sales by 40%...'"
          />
        </div>

        {/* Additional Information */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Additional Information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Any other relevant information like languages, volunteer work, interests, etc."
          />
        </div>

        {error && (
          <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!isFormValid}
          className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate My Resume with AI
        </button>

        <div className="bg-purple-50 rounded-lg p-6">
          <h4 className="font-semibold text-purple-900 mb-3">How AI Creates Your Resume:</h4>
          <div className="space-y-2 text-sm text-purple-800">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Analyzes your background and target role
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Creates professional summaries and descriptions
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Optimizes content with industry keywords
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Structures information in professional format
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};