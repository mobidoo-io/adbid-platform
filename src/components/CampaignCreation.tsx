import React, { useState, useRef, DragEvent } from 'react';
import { ChevronLeft, Plus, Upload, Check, X } from 'lucide-react';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

type StepType = 'upload' | 'campaign' | 'adsets' | 'ads' | 'review';

const CampaignCreation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('[T4Y]deus_yess_1');
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps: { id: StepType; label: string }[] = [
    { id: 'upload', label: 'Upload' },
    { id: 'campaign', label: 'Campaign' },
    { id: 'adsets', label: 'Ad sets' },
    { id: 'ads', label: 'Ads' },
    { id: 'review', label: 'Review' }
  ];

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    const newFiles: UploadedFile[] = validFiles.map(file => {
      const reader = new FileReader();
      const id = Math.random().toString(36).substr(2, 9);
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      
      const uploadedFile: UploadedFile = {
        id,
        file,
        preview: '',
        type
      };

      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedFiles(prev => prev.map(f => 
            f.id === id ? { ...f, preview: e.target!.result as string } : f
          ));
        }
      };

      if (type === 'image') {
        reader.readAsDataURL(file);
      }

      return uploadedFile;
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleStepClick = (step: StepType) => {
    const clickedIndex = steps.findIndex(s => s.id === step);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (clickedIndex <= currentIndex) {
      setCurrentStep(step);
    }
  };

  const getStepStatus = (step: StepType) => {
    const stepIndex = steps.findIndex(s => s.id === step);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const connectGoogleDrive = () => {
    // Simulate Google Drive connection
    setIsGoogleDriveConnected(true);
    alert('Google Drive connected successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">New campaign</h1>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Save template
            </button>
            <button 
              onClick={handleNextStep}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-center gap-8">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`flex items-center gap-3 transition-colors ${
                    status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  disabled={status === 'pending'}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    status === 'active' ? 'bg-green-500 border-green-500 text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {status === 'completed' ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`font-medium ${
                    status === 'active' ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {currentStep === 'upload' && (
          <>
            {/* Ad Account Section */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Ad account</h2>
              <p className="text-sm text-gray-500 mb-4">
                Select ad account to work with its campaigns and media library
              </p>
              <select 
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="[T4Y]deus_yess_1">[T4Y]deus_yess_1</option>
                <option value="account2">Account 2</option>
                <option value="account3">Account 3</option>
              </select>
            </div>

            {/* Google Drive Section */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Google Drive account
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">optional</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Select Google Drive account to upload media from
              </p>
              <button 
                onClick={connectGoogleDrive}
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-colors ${
                  isGoogleDriveConnected 
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M7.71 3.5L1.15 15l4.58 7.5h12.54l4.58-7.5L16.29 3.5z"/>
                  <path fill="#0F9D58" d="M1.15 15l6.56-11.5L12 12z"/>
                  <path fill="#F4B400" d="M16.29 3.5L22.85 15H12z"/>
                </svg>
                {isGoogleDriveConnected ? 'Google Drive connected' : 'Connect Google Drive account'}
              </button>
            </div>

            {/* Upload Media Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Upload new media
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">optional</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Duplicates will be hidden. Skip if you want to use already uploaded media
              </p>
              
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Upload images / videos
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  or drag and drop files here
                </p>
              </div>

              {/* Uploaded Files Grid */}
              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="relative group">
                      {file.type === 'image' && file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.file.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📹</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="mt-1 text-xs text-gray-600 truncate">
                        {file.file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Other steps content */}
        {currentStep === 'campaign' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Campaign Settings</h2>
            <p className="text-gray-600">Configure your campaign settings here...</p>
          </div>
        )}

        {currentStep === 'adsets' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Ad Sets Configuration</h2>
            <p className="text-gray-600">Set up your ad sets here...</p>
          </div>
        )}

        {currentStep === 'ads' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create Ads</h2>
            <p className="text-gray-600">Design your ads here...</p>
          </div>
        )}

        {currentStep === 'review' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Review & Launch</h2>
            <p className="text-gray-600">Review your campaign before launching...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCreation;