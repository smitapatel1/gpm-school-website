import { useState, useEffect } from "react";
import { Download, Calendar, Tag, Search, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Notices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSEOTags(pageConfig.notices);
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notices"));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setNotices(data.sort((a, b) => b.date?.toDate?.() - a.date?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder notices for when no real data exists
  const placeholderNotices = [
    {
      id: "1",
      title: "Annual Examination Schedule",
      category: "academic",
      date: new Date("2026-05-20"),
      description: "Final examination schedule for all classes",
      pdfUrl: "",
    },
    {
      id: "2",
      title: "School Holiday Announcement",
      category: "general",
      date: new Date("2026-05-15"),
      description: "School will remain closed for summer vacation",
      pdfUrl: "",
    },
    {
      id: "3",
      title: "Admission Form Distribution",
      category: "admission",
      date: new Date("2026-05-10"),
      description: "Admission forms for next academic year are now available",
      pdfUrl: "",
    },
    {
      id: "4",
      title: "Sports Day Participation",
      category: "event",
      date: new Date("2026-05-05"),
      description: "All students must participate in the annual sports day",
      pdfUrl: "",
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

  if (loading && notices.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF7]">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-[#C62828] mx-auto mb-4" />
            <p className="text-[#6B7280]">Loading notices...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices & Circulars</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Stay updated with the latest school announcements, schedules, and important circulars
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-[#6B7280]" size={20} />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[#C62828] text-white"
                    : "bg-white border border-[#D6D6D6] text-[#3E2723] hover:border-[#C62828]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Notices List */}
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6B7280] text-lg">No notices found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-lg p-6 border border-[#D6D6D6] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#3E2723] mb-2">{notice.title}</h3>
                      <p className="text-[#6B7280] mb-4">{notice.description}</p>

                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-sm text-[#6B7280]">
                          <Calendar size={16} />
                          {notice.date instanceof Date
                            ? notice.date.toLocaleDateString()
                            : new Date(notice.date?.toDate?.() || notice.date).toLocaleDateString()}
                        </span>

                        <span className="px-3 py-1 bg-[#FFF8E1] text-[#C62828] rounded-full text-xs font-semibold capitalize">
                          {notice.category}
                        </span>

                        {notice.pdfUrl && (
                          <a
                            href={notice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <Download size={16} />
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
