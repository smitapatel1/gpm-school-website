import { useState, useEffect } from "react";
import { Mail, Phone, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Faculty() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // TODO: Fetch faculty from Firestore
  }, []);

  // Placeholder faculty data
  const placeholderFaculty = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "Senior Teacher",
      subject: "Mathematics",
      qualification: "M.Sc, B.Ed",
      experience: "15 years",
      email: "rajesh@gpmschool.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Mrs. Priya Singh",
      designation: "Teacher",
      subject: "English",
      qualification: "M.A, B.Ed",
      experience: "10 years",
      email: "priya@gpmschool.com",
      phone: "9876543211",
    },
    {
      id: 3,
      name: "Mr. Amit Patel",
      designation: "Teacher",
      subject: "Science",
      qualification: "B.Sc, B.Ed",
      experience: "8 years",
      email: "amit@gpmschool.com",
      phone: "9876543212",
    },
    {
      id: 4,
      name: "Ms. Neha Sharma",
      designation: "Teacher",
      subject: "Hindi",
      qualification: "M.A, B.Ed",
      experience: "7 years",
      email: "neha@gpmschool.com",
      phone: "9876543213",
    },
  ];

  const displayFaculty = faculty.length > 0 ? faculty : placeholderFaculty;

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-lg text-white/90">
            Dedicated educators committed to student success
          </p>
        </div>
      </section>

      {/* Faculty Directory */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Staff Directory</h2>
            <p className="section-subtitle">
              Meet our team of experienced and dedicated educators
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
              }`}
            >
              All Staff
            </button>
            <button
              onClick={() => setFilter("teacher")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "teacher"
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
              }`}
            >
              Teachers
            </button>
            <button
              onClick={() => setFilter("admin")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === "admin"
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
              }`}
            >
              Administration
            </button>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFaculty.map((member) => (
              <div
                key={member.id}
                className="card-base overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Photo Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-[#C62828] to-[#E53935]" />

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#C62828] font-semibold mb-3">
                    {member.designation}
                  </p>

                  {member.subject && (
                    <p className="text-sm text-[#6B7280] mb-2">
                      <strong>Subject:</strong> {member.subject}
                    </p>
                  )}

                  {member.qualification && (
                    <p className="text-sm text-[#6B7280] mb-2">
                      <strong>Qualification:</strong> {member.qualification}
                    </p>
                  )}

                  {member.experience && (
                    <p className="text-sm text-[#6B7280] mb-4">
                      <strong>Experience:</strong> {member.experience}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="border-t border-[#D6D6D6] pt-4 space-y-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-[#C62828] hover:text-[#E53935] transition-colors"
                      >
                        <Mail size={16} />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-[#C62828] hover:text-[#E53935] transition-colors"
                      >
                        <Phone size={16} />
                        {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayFaculty.length === 0 && (
            <div className="text-center py-12 text-[#6B7280]">
              No faculty members found
            </div>
          )}
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Departments</h2>
            <p className="section-subtitle">
              Organized by subject specialization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Mathematics", "Science", "Languages", "Social Studies"].map(
              (dept, idx) => (
                <div key={idx} className="card-base p-6 text-center">
                  <div className="w-12 h-12 bg-[#C62828] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#3E2723]">{dept}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
