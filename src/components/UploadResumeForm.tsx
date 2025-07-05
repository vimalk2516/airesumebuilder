import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { pdfParsingService } from '../services/pdfParsingService';
import { geminiService } from '../services/geminiService';

interface UploadResumeFormProps {
  onComplete: () => void;
}

export const UploadResumeForm: React.FC<UploadResumeFormProps> = ({ onComplete }) => {
  const { setResumeData, setAiEnhancedContent } = useResume();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'enhancing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // Step 1: Parse PDF - this will always succeed with fallback
      setUploadStatus('parsing');
      const extractedText = await pdfParsingService.extractTextFromPDF(file);
      setExtractedText(extractedText);
      
      console.log('Extracted text length:', extractedText.length);
      console.log('Extracted text preview:', extractedText.substring(0, 200));

      // Step 2: Use AI to structure the data
      setUploadStatus('enhancing');
      const structuredData = await geminiService.parseResumeText(extractedText);
      
      // Step 3: Set the resume data
      setResumeData(structuredData);
      
      // Step 4: Generate enhanced content
      const enhancedContent = await geminiService.enhanceResume(structuredData);
      setAiEnhancedContent(enhancedContent);

      setUploadStatus('success');
      
      // Auto-proceed after success
      setTimeout(() => {
        onComplete();
      }, 2000);

    } catch (error) {
      console.error('Error processing resume:', error);
      setUploadStatus('error');
      
      // Provide more helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          setErrorMessage('AI processing requires a valid API key. The resume was uploaded but AI enhancement failed.');
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
          setErrorMessage('AI service quota exceeded. Please try again later or use manual entry.');
        } else {
          setErrorMessage(`Processing failed: ${error.message}`);
        }
      } else {
        setErrorMessage('Failed to process resume. Please try uploading a different file or create from scratch.');
      }
    }
  }, [setResumeData, setAiEnhancedContent, onComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: uploadStatus !== 'idle' && uploadStatus !== 'error'
  });

  const getStatusContent = () => {
    switch (uploadStatus) {
      case 'uploading':
        return {
          icon: <Loader className="w-8 h-8 text-blue-600 animate-spin" />,
          title: 'Uploading Resume...',
          description: 'Reading your PDF file.'
        };
      case 'parsing':
        return {
          icon: <Loader className="w-8 h-8 text-blue-600 animate-spin" />,
          title: 'Extracting Information...',
          description: 'Analyzing PDF content and extracting text data.'
        };
      case 'enhancing':
        return {
          icon: <Loader className="w-8 h-8 text-purple-600 animate-spin" />,
          title: 'AI Processing...',
          description: 'Structuring data and enhancing content with AI.'
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-600" />,
          title: 'Resume Processed Successfully!',
          description: 'Your resume has been parsed and enhanced. Redirecting to editor...'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          title: 'Processing Issue',
          description: errorMessage
        };
      default:
        return null;
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Upload your existing PDF resume and let AI extract and enhance the information
        </p>
      </div>

      {statusContent ? (
        <div className="text-center py-12">
          <div className="mb-4">{statusContent.icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{statusContent.title}</h3>
          <p className="text-gray-600 max-w-md mx-auto">{statusContent.description}</p>
          
          {uploadStatus === 'error' && (
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setUploadStatus('idle');
                  setErrorMessage('');
                  setUploadedFile(null);
                  setExtractedText('');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              
              {extractedText && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Extracted Text Preview:</h4>
                  <p className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                    {extractedText.substring(0, 500)}...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <FileText className={`w-16 h-16 mx-auto ${isDragActive ? 'text-blue-600' : 'text-gray-400'}`} />
            
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
              </p>
              <p className="text-gray-600">
                or <span className="text-blue-600 font-medium">click to browse</span>
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Supports PDF files up to 10MB</p>
              <p>Works with text-based PDFs (not scanned images)</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">How it works:</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            PDF text extraction with multiple parsing methods
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            AI analyzes and structures your resume data
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Content is enhanced to industry standards
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            You can edit and customize everything
          </div>
        </div>
      </div>
    </div>
  );
};