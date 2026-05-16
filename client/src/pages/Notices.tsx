import { useState, useEffect } from "react";
import { Download, Calendar, Tag, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function Notices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSEOTags(pageConfig.notices);
    // TODO: Fetch notices from Firestore
  }, []);

  // Placeholder notices
  const placeholderNotices = [
    {
      id: 1,
      title: "Annual Examination Schedule",
      category: "academic",
      date: new Date("2026-05-20"),
      description: "Final examination schedule for all classes",
      pdfUrl: "#",
    },
    {
      id: 2,
      title: "School Holiday Announcement",
      category: "general",
      date: new Date("2026-05-15"),
      description: "School will remain closed for summer vacation",
      pdfUrl: "#",
    },
    {
      id: 3,
      title: "Admission Form Distribution",
      category: "admission",
      date: new Date("2026-05-10"),
      description: "Admission forms for next academic year are now available",
      pdfUrl: "#",
    },
    {
      id: 4,
      title: "Sports Day Participation",
      category: "event",
      date: new Date("2026-05-05"),
      description: "All students must participate in the annual sports day",
      pdfUrl: "#",
    },
  ];

  const displayNotices = notices.length > 0 ? notices : placeholderNotices;

  const categories = [
    { id: "all", label: "All Notices" },
    { id: "academic", label: "Academic" },
    { id: "admission", label: "Admission" },
    { id: "event", label: "Events" },
    { id: "general", label: "General" },
  ];

  const filteredNotices = displayNotices
    .filter((notice) =>
      selectedCategory === "all" ? true : notice.category === selectedCategory
    )
    .filter((notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices & Circulars</h1>
          <p className="text-lg text-white/90">
            Important announcements and updates from the school
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-[#D6D6D6]">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#C62828] text-white"
                    : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {filteredNotices.length > 0 ? (
            <div className="space-y-6">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="card-base p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 bg-[#FFF8E1] text-[#C62828] text-xs font-bold rounded-full">
                          {categories.find((c) => c.id === notice.category)?.label}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                          <Calendar size={14} />
                          {notice.date.toLocaleDateString()}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#3E2723] mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        {notice.description}
                      </p>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => {
                        if (notice.pdfUrl && notice.pdfUrl !== "#") {
                          const link = document.createElement("a");
                          link.href = notice.pdfUrl;
                          link.setAttribute("download", "");
                          link.click();
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium whitespace-nowrap"
                    >
                      <Download size={18} />
                      <span className="hidden sm:inline">Download PDF</span>
                      <span className="sm:hidden">PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#6B7280]">
              <p className="text-lg">No notices found matching your search</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayNotices.length}
              </div>
              <p className="text-[#6B7280]">Total Notices</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayNotices.filter((n) => n.category === "academic").length}
              </div>
              <p className="text-[#6B7280]">Academic</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayNotices.filter((n) => n.category === "admission").length}
              </div>
              <p className="text-[#6B7280]">Admission</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayNotices.filter((n) => n.category === "event").length}
              </div>
              <p className="text-[#6B7280]">Events</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
