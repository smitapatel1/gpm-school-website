import { useState, useEffect } from "react";
import { BookOpen, Clock, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function Academics() {
  useEffect(() => {
    setSEOTags(pageConfig.academics);
  }, []);

  const classes = [
    { name: "Pre-Primary", medium: "English", description: "PG, LKG, UKG" },
    { name: "Primary", medium: "English & Hindi", description: "Classes 1-5" },
    { name: "Secondary", medium: "English & Hindi", description: "Classes 6-8" },
    { name: "Senior Secondary", medium: "Hindi", description: "Classes 9-12 (Science)" },
  ];

  const subjects = {
    "Primary (1-5)": ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Art", "Physical Education"],
    "Secondary (6-8)": ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education"],
    "Senior Secondary (9-12)": ["English", "Hindi", "Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Physical Education"],
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
          <p className="text-lg text-white/90">
            Comprehensive curriculum designed for holistic development
          </p>
        </div>
      </section>

      {/* Class Structure */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Class Structure</h2>
            <p className="section-subtitle">
              Quality education from Pre-Primary to Senior Secondary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls, idx) => (
              <div key={idx} className="card-base p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#FFF8E1] rounded-full flex items-center justify-center">
                    <BookOpen size={24} className="text-[#C62828]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#3E2723] mb-2 text-center">
                  {cls.name}
                </h3>
                <p className="text-sm text-[#6B7280] mb-3 text-center">
                  {cls.description}
                </p>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#FFF8E1] text-[#C62828] text-xs font-bold rounded-full">
                    {cls.medium}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Subjects Offered</h2>
            <p className="section-subtitle">
              Comprehensive curriculum covering all essential subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(subjects).map(([level, subjectList]) => (
              <div key={level} className="card-base p-8">
                <h3 className="text-xl font-bold text-[#3E2723] mb-6">{level}</h3>
                <ul className="space-y-3">
                  {subjectList.map((subject, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#C62828] rounded-full" />
                      <span className="text-[#6B7280]">{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Teaching Approach</h2>
            <p className="section-subtitle">
              Modern pedagogy combined with traditional values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-base p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF8E1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} className="text-[#C62828]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                    Interactive Learning
                  </h3>
                  <p className="text-[#6B7280]">
                    Engaging classroom discussions and hands-on activities to promote active participation and critical thinking.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-base p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF8E1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-[#C62828]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                    Continuous Assessment
                  </h3>
                  <p className="text-[#6B7280]">
                    Regular evaluations and feedback to monitor student progress and provide personalized support.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-base p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF8E1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-[#C62828]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                    Flexible Scheduling
                  </h3>
                  <p className="text-[#6B7280]">
                    Well-structured timetables with adequate time for academics, sports, and extracurricular activities.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-base p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF8E1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} className="text-[#C62828]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                    Holistic Development
                  </h3>
                  <p className="text-[#6B7280]">
                    Focus on character building, leadership skills, and overall personality development alongside academics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examination Schedule */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Examination Schedule</h2>
            <p className="section-subtitle">
              Regular assessments to evaluate student progress
            </p>
          </div>

          <div className="max-w-2xl mx-auto card-base p-8">
            <div className="space-y-6">
              <div className="border-b border-[#D6D6D6] pb-6">
                <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                  Periodic Tests
                </h3>
                <p className="text-[#6B7280] mb-2">
                  Conducted every month to assess student understanding of concepts
                </p>
                <p className="text-sm text-[#6B7280]">
                  <strong>Frequency:</strong> Monthly | <strong>Duration:</strong> 1 hour
                </p>
              </div>

              <div className="border-b border-[#D6D6D6] pb-6">
                <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                  Unit Tests
                </h3>
                <p className="text-[#6B7280] mb-2">
                  Comprehensive evaluation at the end of each unit
                </p>
                <p className="text-sm text-[#6B7280]">
                  <strong>Frequency:</strong> Quarterly | <strong>Duration:</strong> 2 hours
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                  Final Examinations
                </h3>
                <p className="text-[#6B7280] mb-2">
                  End-of-year comprehensive examinations
                </p>
                <p className="text-sm text-[#6B7280]">
                  <strong>Frequency:</strong> Bi-annually | <strong>Duration:</strong> 3 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
