import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Award, Target, Heart, Users } from "lucide-react";
import schoolConfig from "@/config/school";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    setSEOTags(pageConfig.about);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-white/90">
            Learn about our school's rich heritage, values, and commitment to excellence
          </p>
        </div>
      </section>

      {/* School Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our School</h2>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                {schoolConfig.name} is a premier educational institution dedicated to providing quality education and holistic development to students. With a commitment to academic excellence and character building, we have been serving the community for over two decades.
              </p>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Our school offers comprehensive education from Pre-Primary to Senior Secondary levels, with both English and Hindi mediums. We believe in nurturing young minds to become responsible, innovative, and compassionate citizens.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#FFF8E1] rounded-lg">
                  <div className="text-2xl font-bold text-[#C62828] mb-1">25+</div>
                  <div className="text-sm text-[#3E2723]">Years of Service</div>
                </div>
                <div className="p-4 bg-[#FFF8E1] rounded-lg">
                  <div className="text-2xl font-bold text-[#C62828] mb-1">500+</div>
                  <div className="text-sm text-[#3E2723]">Students</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#C62828] to-[#E53935] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">School Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-white/80">Location</div>
                  <div className="font-semibold">{schoolConfig.location}</div>
                </div>
                <div>
                  <div className="text-sm text-white/80">Type</div>
                  <div className="font-semibold">{schoolConfig.details.type}</div>
                </div>
                <div>
                  <div className="text-sm text-white/80">Classes</div>
                  <div className="font-semibold">{schoolConfig.details.classes}</div>
                </div>
                <div>
                  <div className="text-sm text-white/80">Streams</div>
                  <div className="font-semibold">{schoolConfig.details.streams}</div>
                </div>
                <div>
                  <div className="text-sm text-white/80">Contact</div>
                  <div className="font-semibold">{schoolConfig.contact.phone1}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Vision & Mission</h2>
            <p className="section-subtitle">
              Guiding principles that shape our educational approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card-base p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#C62828] rounded-full flex items-center justify-center">
                  <Target size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723] mb-4 text-center">
                Our Vision
              </h3>
              <p className="text-[#6B7280] text-center leading-relaxed">
                To be a leading educational institution that empowers students with knowledge, skills, and values to excel in their personal and professional lives, contributing positively to society and the nation.
              </p>
            </div>

            {/* Mission */}
            <div className="card-base p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#C62828] rounded-full flex items-center justify-center">
                  <Heart size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723] mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-[#6B7280] text-center leading-relaxed">
                To provide quality education in a nurturing environment that fosters academic excellence, character development, and holistic growth, preparing students to become responsible, innovative, and compassionate global citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              Principles that guide our every action and decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "Striving for the highest standards in all we do" },
              { icon: Users, title: "Community", desc: "Building strong relationships and collaboration" },
              { icon: Heart, title: "Integrity", desc: "Upholding honesty and moral principles" },
              { icon: Target, title: "Innovation", desc: "Embracing new ideas and continuous improvement" },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-[#FFF8E1] rounded-full flex items-center justify-center">
                      <Icon size={28} className="text-[#C62828]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#3E2723] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#6B7280]">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">School Management</h2>
            <p className="section-subtitle">
              Dedicated leaders committed to educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-base p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C62828] to-[#E53935] rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                {schoolConfig.management.manager}
              </h3>
              <p className="text-[#6B7280] text-sm">Manager</p>
            </div>
            <div className="card-base p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C62828] to-[#E53935] rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                {schoolConfig.management.principal1}
              </h3>
              <p className="text-[#6B7280] text-sm">Principal</p>
            </div>
            <div className="card-base p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C62828] to-[#E53935] rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                {schoolConfig.management.principal2}
              </h3>
              <p className="text-[#6B7280] text-sm">Principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#C62828] to-[#E53935] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Educational Journey
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of a community dedicated to excellence and holistic development.
          </p>
          <Link href="/admissions">
            <a className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#C62828] font-bold rounded-lg hover:bg-[#FFF8E1] transition-colors">
              Apply for Admission
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
