import React, { useState } from 'react';
import { Download, Eye, Star, Zap, Award, Briefcase } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { pdfService } from '../services/pdfService';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: 'modern' | 'classic' | 'creative';
  icon: React.ComponentType<any>;
  premium?: boolean;
}

const templates: Template[] = [
  {
    id: 'modern-glass',
    name: 'Modern Glass',
    description: 'Clean glassmorphism design with modern typography',
    preview: '/api/placeholder/300/400',
    style: 'modern',
    icon: Zap,
    premium: true
  },
  {
    id: 'executive-pro',
    name: 'Executive Pro',
    description: 'Professional layout for senior positions',
    preview: '/api/placeholder/300/400',
    style: 'classic',
    icon: Award,
    premium: true
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    description: 'Bold design for creative professionals',
    preview: '/api/placeholder/300/400',
    style: 'creative',
    icon: Briefcase,
    premium: false
  }
];

export const TemplateSelector: React.FC = () => {
  const { resumeData, aiEnhancedContent } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState('modern-glass');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (templateId: string) => {
    setIsGenerating(true);
    try {
      await pdfService.generatePDF(resumeData, aiEnhancedContent, templateId);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Choose Your Template
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select from our professionally designed templates optimized for ATS systems and modern hiring practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`
                relative cursor-pointer transition-all duration-300 transform hover:scale-105
                backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-6
                ${isSelected ? 'ring-4 ring-blue-500/50 shadow-2xl' : 'hover:shadow-xl'}
              `}
            >
              {template.premium && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  PRO
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${
                    template.style === 'modern' ? 'bg-blue-500' :
                    template.style === 'classic' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="capitalize">{template.style} Style</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Preview functionality
                    }}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg text-gray-700 hover:bg-white/40 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(template.id);
                    }}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm disabled:opacity-50"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {isGenerating ? 'Generating...' : 'Download'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg border border-white/30 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Template Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">ATS Optimized</h4>
            <p className="text-sm text-gray-600">All templates pass through 95%+ of ATS systems</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Professional Design</h4>
            <p className="text-sm text-gray-600">Crafted by professional designers and HR experts</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Industry Specific</h4>
            <p className="text-sm text-gray-600">Tailored for different industries and roles</p>
          </div>
        </div>
      </div>
    </div>
  );
};