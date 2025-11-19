import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import ResumePreviewAlt from "../components/ResumePreviewAlt"; // ✅ new template import
import ResumePreviewClassic from "../components/ResumePreviewClassic"; // ✅ another template

function ResumeEditor() {
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ResumePreview data={resumeData} />;
      case "minimal":
        return <ResumePreviewAlt data={resumeData} />;
      case "classic":
        return <ResumePreviewClassic data={resumeData} />;
      default:
        return <ResumePreview data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Resume Editor</h1>

        {/* Template Selector */}
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="mt-3 md:mt-0 bg-white border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
          <option value="classic">Classic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResumeForm onChange={setResumeData} />
        {renderTemplate()}
      </div>
    </div>
  );
}

export default ResumeEditor;
