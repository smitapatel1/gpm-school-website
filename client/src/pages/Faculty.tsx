import { useState, useEffect } from "react";
import { Mail, Phone, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function Faculty() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setSEOTags(pageConfig.faculty);
    // TODO: Fetch faculty from Firestore
  }, []);

  // Placeholder faculty data with category field
  const placeholderFaculty = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "Senior Teacher",
      category: "teachers",
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
      category: "teachers",
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
      category: "teachers",
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
      category: "teachers",
      subject: "Hindi",
      qualification: "M.A, B.Ed",
      experience: "7 years",
      email: "neha@gpmschool.com",
      phone: "9876543213",
    },
    {
      id: 5,
      name: "Mr. Vikram Singh",
      designation: "Principal",
      category: "management",
      qualification: "M.A, B.Ed, M.Ed",
      experience: "20 years",
      email: "principal@gpmschool.com",
      phone: "9876543214",
    },
    {
      id: 6,
      name: "Mrs. Anjali Verma",
      designation: "Vice Principal",
      category: "management",
      qualification: "M.Sc, B.Ed",
      experience: "18 years",
      email: "vp@gpmschool.com",
      phone: "9876543215",
    },
    {
      id: 7,
      name: "Mr. Ravi Kumar",
      designation: "Office Manager",
      category: "office_staff",
      qualification: "B.Com",
      experience: "12 years",
      email: "office@gpmschool.com",
      phone: "9876543216",
    },
    {
      id: 8,
      name: "Ms. Divya Patel",
      designation: "Receptionist",
      category: "office_staff",
      qualification: "12th Pass",
      experience: "5 years",
      email: "reception@gpmschool.com",
      phone: "9876543217",
    },
    {
      id: 9,
      name: "Mr. Suresh",
      designation: "Maintenance Staff",
      category: "support_staff",
      qualification: "10th Pass",
      experience: "8 years",
      phone: "9876543218",
    },
    {
      id: 10,
      name: "Mrs. Lakshmi",
      designation: "Cleaning Staff",
      category: "support_staff",
      qualification: "10th Pass",
      experience: "6 years",
      phone: "9876543219",
    },
  ];

  const displayFaculty = faculty.length > 0 ? faculty : placeholderFaculty;

  // Filter faculty by category
  const filteredFaculty = displayFaculty.filter((member) => {
    if (filter === "all") return true;
    return member.category === filter;
  });

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
            {[
              { id: "all", label: "All Staff" },
              { id: "teachers", label: "Teachers" },
              { id: "management", label: "Management" },
              { id: "office_staff", label: "Office Staff" },
              { id: "support_staff", label: "Support Staff" },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-[#C62828] text-white shadow-lg"
                    : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((member) => (
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

          {filteredFaculty.length === 0 && (
            <div className="text-center py-12 text-[#6B7280]">
              No faculty members found in this category
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
