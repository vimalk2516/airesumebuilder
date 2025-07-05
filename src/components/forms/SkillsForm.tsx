import React, { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

export const SkillsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          technical: [...prev.skills.technical, newTechnicalSkill.trim()]
        }
      }));
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: prev.skills.technical.filter((_, i) => i !== index)
      }
    }));
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          soft: [...prev.skills.soft, newSoftSkill.trim()]
        }
      }));
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        soft: prev.skills.soft.filter((_, i) => i !== index)
      }
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <Award className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Skills & Languages</h2>
      </div>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.skills.technical.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  onClick={() => removeTechnicalSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., JavaScript, Python, React"
            />
            <button
              onClick={addTechnicalSkill}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.skills.soft.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {skill}
                <button
                  onClick={() => removeSoftSkill(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., Leadership, Communication, Problem Solving"
            />
            <button
              onClick={addSoftSkill}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.languages.map((language, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
              >
                {language}
                <button
                  onClick={() => removeLanguage(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., English (Native), Spanish (Fluent)"
            />
            <button
              onClick={addLanguage}
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> AI will analyze your skills and suggest additional relevant skills based on your experience and projects.
        </p>
      </div>
    </div>
  );
};