import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "../components/ResumePreview";

function ResumeEditor() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
    location: "",
    summary: "",
    skills: {
      programming: "",
      frameworks: "",
      databases: "",
      tools: "",
      softskills: "",
    },
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    achievements: [],
    volunteer: [],
    languages: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // ✅ Ref for printing
  const componentRef = useRef(null);

  // ✅ Handle input change
  const handleChange = (section, key, value, index = null) => {
    if (section === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: { ...prev.skills, [key]: value },
      }));
    } else if (Array.isArray(formData[section])) {
      const updated = [...formData[section]];
      updated[index][key] = value;
      setFormData((prev) => ({ ...prev, [section]: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [section]: value }));
    }
  };

  // ✅ Add new array item
  const addNewItem = (section, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  // ✅ Print / Download function
   const handlePrint = useReactToPrint({
    contentRef: componentRef,  // <-- new API key (instead of content)
    documentTitle: `${formData.name || "My_Resume"}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
    onAfterPrint: () => alert("✅ Resume downloaded successfully!"),
  });

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 bg-gray-50 min-h-screen">
      {/* ===== LEFT PANEL (Form Inputs) ===== */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Resume Builder</h2>

        {/* ===== Header Info ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">
          Header / Contact Info
        </h3>
        {["name", "title", "phone", "email", "linkedin", "github", "website", "location"].map(
          (field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={(e) => handleChange(field, null, e.target.value)}
              className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          )
        )}

        {/* ===== Summary ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">
          Professional Summary
        </h3>
        <textarea
          rows="3"
          placeholder="Write 2–3 lines about your background, expertise, and goals"
          value={formData.summary}
          onChange={(e) => handleChange("summary", null, e.target.value)}
          className="w-full mb-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* ===== Skills ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Skills</h3>
        {Object.keys(formData.skills).map((key) => (
          <input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData.skills[key]}
            onChange={(e) => handleChange("skills", key, e.target.value)}
            className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        ))}

        {/* ===== Experience ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Experience</h3>
        {formData.experience.map((exp, i) => (
          <div key={i} className="mb-4 border p-3 rounded-lg">
            {["title", "company", "location", "duration", "details"].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={exp[key]}
                onChange={(e) => handleChange("experience", key, e.target.value, i)}
                className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() =>
            addNewItem("experience", {
              title: "",
              company: "",
              location: "",
              duration: "",
              details: "",
            })
          }
          className="text-sm bg-green-600 text-white px-4 py-1 rounded-md"
        >
          + Add Experience
        </button>

        {/* ===== Projects ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Projects</h3>
        {formData.projects.map((proj, i) => (
          <div key={i} className="mb-4 border p-3 rounded-lg">
            {["name", "stack", "description", "link"].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={proj[key]}
                onChange={(e) => handleChange("projects", key, e.target.value, i)}
                className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() =>
            addNewItem("projects", {
              name: "",
              stack: "",
              description: "",
              link: "",
            })
          }
          className="text-sm bg-green-600 text-white px-4 py-1 rounded-md"
        >
          + Add Project
        </button>

        {/* ===== Education ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Education</h3>
        {formData.education.map((edu, i) => (
          <div key={i} className="mb-4 border p-3 rounded-lg">
            {["degree", "institution", "duration", "cgpa"].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={edu[key]}
                onChange={(e) => handleChange("education", key, e.target.value, i)}
                className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() =>
            addNewItem("education", {
              degree: "",
              institution: "",
              duration: "",
              cgpa: "",
            })
          }
          className="text-sm bg-green-600 text-white px-4 py-1 rounded-md"
        >
          + Add Education
        </button>

        {/* ===== Certifications ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Certifications</h3>
        {formData.certifications.map((cert, i) => (
          <input
            key={i}
            placeholder="Certification"
            value={cert}
            onChange={(e) => {
              const updated = [...formData.certifications];
              updated[i] = e.target.value;
              setFormData((prev) => ({ ...prev, certifications: updated }));
            }}
            className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          onClick={() => addNewItem("certifications", "")}
          className="text-sm bg-green-600 text-white px-4 py-1 rounded-md"
        >
          + Add Certification
        </button>

        {/* ===== Achievements ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Achievements</h3>
        {formData.achievements.map((ach, i) => (
          <input
            key={i}
            placeholder="Achievement"
            value={ach}
            onChange={(e) => {
              const updated = [...formData.achievements];
              updated[i] = e.target.value;
              setFormData((prev) => ({ ...prev, achievements: updated }));
            }}
            className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          onClick={() => addNewItem("achievements", "")}
          className="text-sm bg-green-600 text-white px-4 py-1 rounded-md"
        >
          + Add Achievement
        </button>

        {/* ===== Languages ===== */}
        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Languages</h3>
        <input
          placeholder="e.g., English, Hindi, Telugu"
          value={formData.languages}
          onChange={(e) => handleChange("languages", null, e.target.value)}
          className="w-full mb-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* ===== Template Selector ===== */}
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full mt-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="modern">Modern</option>
          <option value="elegant">Elegant</option>
          <option value="creative">Creative</option>
          <option value="professional">Professional</option>
          <option value="minimal">Minimal</option>
        </select>

        {/* ===== Download Resume ===== */}
        <button
          onClick={handlePrint}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all font-semibold"
        >
          📄 Download Resume
        </button>
      </div>

      {/* ===== RIGHT PANEL (Preview Section) ===== */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto h-screen">
        <ResumePreview
          ref={componentRef}
          formData={formData}
          selectedTemplate={selectedTemplate}
        />
      </div>
    </div>
  );
}

export default ResumeEditor;
