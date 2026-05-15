import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function Admissions() {
  useEffect(() => {
    setSEOTags(pageConfig.admissions);
  }, []);

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    class: "",
    phone: "",
    address: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Submit form to Firestore
      // TODO: Send email notifications to admin and applicant
      setSubmitted(true);
      setFormData({
        studentName: "",
        parentName: "",
        class: "",
        phone: "",
        address: "",
        email: "",
      });
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const classes = ["PG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-lg text-white/90">
            Join our community of learners and achievers
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Admission Process</h2>
            <p className="section-subtitle">
              Simple and transparent admission procedure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Fill Form", desc: "Complete the admission inquiry form" },
              { step: "2", title: "Verification", desc: "We verify your documents" },
              { step: "3", title: "Interview", desc: "Meet with our admission team" },
              { step: "4", title: "Confirmation", desc: "Receive admission confirmation" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="card-base p-6 text-center">
                  <div className="w-12 h-12 bg-[#C62828] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[#3E2723] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B7280]">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-[#C62828] transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility and Fee Structure */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligibility */}
            <div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                {[
                  "Must be of appropriate age for the class",
                  "Birth certificate or age proof required",
                  "Previous school records (if applicable)",
                  "Valid address proof",
                  "Medical fitness certificate",
                  "No restrictions based on caste, creed, or religion",
                ].map((criterion, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#C62828] flex-shrink-0 mt-1" />
                    <span className="text-[#6B7280]">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Structure */}
            <div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
                Fee Structure
              </h2>
              <div className="space-y-3">
                <div className="card-base p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#3E2723]">Pre-Primary (PG-UKG)</span>
                    <span className="text-[#C62828] font-bold">₹15,000/year</span>
                  </div>
                </div>
                <div className="card-base p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#3E2723]">Primary (1-5)</span>
                    <span className="text-[#C62828] font-bold">₹20,000/year</span>
                  </div>
                </div>
                <div className="card-base p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#3E2723]">Secondary (6-8)</span>
                    <span className="text-[#C62828] font-bold">₹25,000/year</span>
                  </div>
                </div>
                <div className="card-base p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#3E2723]">Senior Secondary (9-12)</span>
                    <span className="text-[#C62828] font-bold">₹30,000/year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Online Admission Inquiry</h2>
              <p className="section-subtitle">
                Fill the form below to express your interest in admission
              </p>
            </div>

            {submitted ? (
              <div className="card-base p-8 text-center bg-green-50 border-green-200">
                <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-600 mb-4">
                  Your admission inquiry has been submitted successfully. We will contact you soon with further details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-base p-8 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                {/* Student Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                    placeholder="Enter student's full name"
                  />
                </div>

                {/* Parent Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                    placeholder="Enter parent's full name"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Desired Class *
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                  >
                    <option value="">Select a class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                    placeholder="Enter contact number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors resize-none"
                    placeholder="Enter full address"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>

                <p className="text-xs text-[#6B7280] text-center">
                  * Required fields
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
