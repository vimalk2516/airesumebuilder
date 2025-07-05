import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

interface ATSScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    sections: number;
    contact: number;
    experience: number;
  };
  suggestions: string[];
  strengths: string[];
}

export const ATSScoreCard: React.FC = () => {
  const { resumeData, aiEnhancedContent } = useResume();
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateATSScore = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const score = analyzeResumeForATS(resumeData, aiEnhancedContent);
      setAtsScore(score);
      setIsCalculating(false);
    }, 2000);
  };

  useEffect(() => {
    if (resumeData.personalInfo.fullName) {
      calculateATSScore();
    }
  }, [resumeData, aiEnhancedContent]);

  const analyzeResumeForATS = (resume: any, enhanced: any): ATSScore => {
    let keywordsScore = 0;
    let formattingScore = 85; // Base formatting score
    let sectionsScore = 0;
    let contactScore = 0;
    let experienceScore = 0;

    // Contact Information Analysis
    if (resume.personalInfo.email) contactScore += 25;
    if (resume.personalInfo.phone) contactScore += 25;
    if (resume.personalInfo.location) contactScore += 25;
    if (resume.personalInfo.linkedIn) contactScore += 25;

    // Sections Analysis
    if (resume.personalInfo.fullName) sectionsScore += 20;
    if (resume.education.length > 0) sectionsScore += 20;
    if (resume.experience.length > 0) sectionsScore += 20;
    if (resume.skills.technical.length > 0) sectionsScore += 20;
    if (resume.projects.length > 0) sectionsScore += 20;

    // Keywords Analysis
    const totalSkills = resume.skills.technical.length + resume.skills.soft.length;
    keywordsScore = Math.min(100, totalSkills * 5);

    // Experience Analysis
    if (resume.experience.length > 0) {
      experienceScore += 40;
      const hasQuantifiedAchievements = resume.experience.some((exp: any) => 
        /\d+%|\$\d+|\d+\+/.test(exp.description)
      );
      if (hasQuantifiedAchievements) experienceScore += 30;
      if (enhanced?.professionalExperience?.length > 0) experienceScore += 30;
    }

    const overall = Math.round(
      (keywordsScore * 0.25 + formattingScore * 0.2 + sectionsScore * 0.2 + contactScore * 0.15 + experienceScore * 0.2)
    );

    const suggestions = [];
    const strengths = [];

    // Generate suggestions
    if (keywordsScore < 70) suggestions.push("Add more relevant technical skills and industry keywords");
    if (contactScore < 75) suggestions.push("Complete your contact information including LinkedIn profile");
    if (experienceScore < 70) suggestions.push("Add quantified achievements with specific metrics and percentages");
    if (resume.projects.length === 0) suggestions.push("Include relevant projects to showcase your practical experience");
    if (!enhanced) suggestions.push("Use AI enhancement to optimize your content for ATS systems");

    // Generate strengths
    if (contactScore >= 75) strengths.push("Complete contact information");
    if (sectionsScore >= 80) strengths.push("Well-structured resume sections");
    if (keywordsScore >= 70) strengths.push("Good keyword density");
    if (experienceScore >= 70) strengths.push("Strong experience descriptions");

    return {
      overall,
      breakdown: {
        keywords: keywordsScore,
        formatting: formattingScore,
        sections: sectionsScore,
        contact: contactScore,
        experience: experienceScore
      },
      suggestions,
      strengths
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  if (isCalculating) {
    return (
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h3>
          <p className="text-gray-600">Calculating ATS compatibility score...</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!atsScore) return null;

  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Target className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">ATS Compatibility Score</h2>
        </div>
        <button
          onClick={calculateATSScore}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
        >
          Recalculate
        </button>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreBackground(atsScore.overall)} text-white mb-4`}>
          <div className="text-center">
            <div className="text-3xl font-bold">{atsScore.overall}</div>
            <div className="text-sm opacity-90">/ 100</div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {atsScore.overall >= 80 ? 'Excellent' : atsScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
        </h3>
        <p className="text-gray-600">
          Your resume is {atsScore.overall >= 80 ? 'highly' : atsScore.overall >= 60 ? 'moderately' : 'poorly'} optimized for ATS systems
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(atsScore.breakdown).map(([category, score]) => (
          <div key={category} className="text-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
            <div className={`text-2xl font-bold ${getScoreColor(score)} mb-1`}>
              {score}
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {category === 'contact' ? 'Contact Info' : category}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div 
                className={`h-1 rounded-full bg-gradient-to-r ${getScoreBackground(score)}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Strengths and Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {atsScore.strengths.length > 0 && (
          <div className="bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-900">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {atsScore.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-sm text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {atsScore.suggestions.length > 0 && (
          <div className="bg-orange-50/50 backdrop-blur-sm border border-orange-200/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
              <h4 className="font-semibold text-orange-900">Improvement Areas</h4>
            </div>
            <ul className="space-y-2">
              {atsScore.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start text-sm text-orange-800">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ATS Tips */}
      <div className="mt-6 bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-900">ATS Optimization Tips</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>• Use standard section headings (Experience, Education, Skills)</div>
          <div>• Include relevant keywords from job descriptions</div>
          <div>• Use simple, clean formatting without graphics</div>
          <div>• Save as PDF to preserve formatting</div>
          <div>• Include quantified achievements with numbers</div>
          <div>• Use standard fonts (Arial, Calibri, Times New Roman)</div>
        </div>
      </div>
    </div>
  );
};