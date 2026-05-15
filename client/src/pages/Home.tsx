import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, Award, Calendar, Bell, Zap } from "lucide-react";
import schoolConfig from "@/config/school";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig, setSchemaMarkup, organizationSchema } from "@/lib/seo";

export default function Home() {
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setSEOTags(pageConfig.home);
    setSchemaMarkup(organizationSchema);
    // TODO: Fetch latest notices from Firestore
    // TODO: Fetch upcoming events from Firestore
  }, []);

  const highlights = [
    {
      icon: BookOpen,
      label: "Classes",
      value: "PG to 12",
      description: "Comprehensive education from pre-primary to senior secondary",
    },
    {
      icon: Users,
      label: "Students",
      value: "500+",
      description: "Growing community of learners",
    },
    {
      icon: Award,
      label: "Excellence",
      value: "100%",
      description: "Committed to academic excellence",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#C62828] via-[#E53935] to-[#B71C1C] text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to {schoolConfig.shortName}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                {schoolConfig.name} - Nurturing minds, building futures. Excellence in education for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions">
                  <a className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#C62828] font-bold rounded-lg hover:bg-[#FFF8E1] transition-colors">
                    Apply Now
                    <ArrowRight size={20} />
                  </a>
                </Link>
                <Link href="/about">
                  <a className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                    Learn More
                  </a>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-2">25+</div>
                      <div className="text-sm">Years of Excellence</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-2">500+</div>
                      <div className="text-sm">Happy Students</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-2">50+</div>
                      <div className="text-sm">Expert Faculty</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-2">100%</div>
                      <div className="text-sm">Pass Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">
              Committed to providing quality education and holistic development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="card-base p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#FFF8E1] rounded-full flex items-center justify-center">
                      <Icon size={32} className="text-[#C62828]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#C62828] mb-2">
                    {item.value}
                  </h3>
                  <h4 className="text-lg font-semibold text-[#3E2723] mb-2">
                    {item.label}
                  </h4>
                  <p className="text-[#6B7280]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notices Ticker Section */}
      <section className="py-12 bg-[#FFF8E1] border-y border-[#D6D6D6]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2 bg-[#C62828] text-white rounded-lg font-bold">
              <Bell size={20} />
              Latest
            </div>
            <div className="flex gap-4 overflow-x-auto flex-1">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <Link key={notice.id} href="/notices">
                    <a className="flex-shrink-0 px-4 py-2 bg-white rounded-lg border border-[#D6D6D6] hover:border-[#C62828] transition-colors text-sm text-[#3E2723] whitespace-nowrap">
                      {notice.title}
                    </a>
                  </Link>
                ))
              ) : (
                <div className="text-[#6B7280] text-sm">No notices at the moment</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">
                Stay updated with our latest events and activities
              </p>
            </div>
            <Link href="/events">
              <a className="hidden sm:inline-flex items-center gap-2 text-[#C62828] font-bold hover:gap-3 transition-all">
                View All
                <ArrowRight size={20} />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="card-base overflow-hidden hover:shadow-lg transition-all duration-300">
                  {event.imageUrl && (
                    <div className="w-full h-48 bg-gradient-to-br from-[#C62828] to-[#E53935] overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#C62828] text-sm font-bold">
                      <Calendar size={16} />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-bold text-[#3E2723] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm line-clamp-2 mb-4">
                      {event.description}
                    </p>
                    <Link href={`/events/${event.id}`}>
                      <a className="inline-flex items-center gap-2 text-[#C62828] font-bold text-sm hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight size={16} />
                      </a>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[#6B7280]">
                No upcoming events at the moment
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#C62828] to-[#E53935] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Start your journey of academic excellence and personal growth with us today.
          </p>
          <Link href="/admissions">
            <a className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#C62828] font-bold rounded-lg hover:bg-[#FFF8E1] transition-colors">
              Apply for Admission
              <ArrowRight size={20} />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
