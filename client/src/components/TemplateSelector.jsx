import { Layout, Check } from 'lucide-react';
import React from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const templates = [
    { id: 'classic', name: 'Classic', preview: "A clean, traditional layout with proper sectioning and readable typography." },
    { id: 'modern', name: 'Modern', preview: "A modern layout with strong color usage and improved spacing." },
    { id: 'minimal', name: 'Minimal', preview: "A simple minimal layout focusing on pure readability." },
    { id: 'minimal_image', name: 'Minimal Image', preview: "Minimal layout with a single image and clean typography." },
  ];

  return (
    <div className="relative">
      
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-blue-600 
        bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full w-72 p-3 mt-2 space-y-3 z-20 bg-white rounded-md border border-gray-200 shadow">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => { onChange(template.id); setIsOpen(false); }}
              className={`
                relative p-3 border rounded-md cursor-pointer transition-all
                ${selectedTemplate === template.id 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-gray-200 hover:bg-gray-100"}
              `}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <h4 className="font-medium text-gray-800">{template.name}</h4>
              <p className="mt-1 text-xs text-gray-500 italic leading-tight">
                {template.preview}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TemplateSelector;
