import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function ResumeForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        try {
          const res = await API.get(`/resumes/${id}`);
          setFormData(res.data);
          if (onChange) onChange(res.data);
        } catch (err) {
          console.error("Error loading resume:", err);
        }
      };
      fetchResume();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (onChange) onChange(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/resumes/${id}`, formData);
        alert("Resume updated successfully!");
      } else {
        await API.post("/resumes", formData);
        alert("Resume created successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("Error saving resume!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200"
      >
        <h2 className="col-span-2 text-3xl font-bold text-center text-gray-800 mb-4">
          {id ? "Edit Resume" : "Create Your Resume"}
        </h2>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-lg hover:shadow-xl font-semibold transition-transform transform hover:-translate-y-1"
          >
            {id ? "Update Resume" : "Save Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;
