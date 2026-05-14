import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { LogOut, Menu, X, Users, FileText, Calendar, Image, MessageSquare, BarChart3 } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import schoolConfig from "@/config/school";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    admissions: 0,
    notices: 0,
    events: 0,
    gallery: 0,
    faculty: 0,
    contacts: 0,
  });

  useEffect(() => {
    // TODO: Fetch stats from Firestore
    setStats({
      admissions: 12,
      notices: 8,
      events: 5,
      gallery: 24,
      faculty: 18,
      contacts: 15,
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("adminLoggedIn");
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "admissions", label: "Admissions", icon: Users },
    { id: "notices", label: "Notices", icon: FileText },
    { id: "events", label: "Events", icon: Calendar },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "contacts", label: "Contact Inquiries", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-[#FFFDF7]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#3E2723] text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-[#C62828] rounded-lg flex items-center justify-center font-bold">
              G
            </div>
            {sidebarOpen && <span className="font-bold">Admin</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-[#C62828] text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-600/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#D6D6D6] px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3E2723]">
            {menuItems.find((m) => m.id === activeTab)?.label}
          </h1>
          <div className="text-right">
            <p className="text-sm text-[#6B7280]">{schoolConfig.name}</p>
            <p className="text-xs text-[#6B7280]">Admin Panel</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold text-[#3E2723] mb-6">Dashboard Overview</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Admissions", value: stats.admissions, icon: Users, color: "bg-blue-50 text-blue-600" },
                  { label: "Notices", value: stats.notices, icon: FileText, color: "bg-green-50 text-green-600" },
                  { label: "Events", value: stats.events, icon: Calendar, color: "bg-purple-50 text-purple-600" },
                  { label: "Gallery Images", value: stats.gallery, icon: Image, color: "bg-orange-50 text-orange-600" },
                  { label: "Faculty", value: stats.faculty, icon: Users, color: "bg-pink-50 text-pink-600" },
                  { label: "Contact Inquiries", value: stats.contacts, icon: MessageSquare, color: "bg-indigo-50 text-indigo-600" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="card-base p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#6B7280] text-sm font-medium mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-[#3E2723]">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <Icon size={24} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="card-base p-6">
                <h3 className="text-lg font-bold text-[#3E2723] mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    "New admission inquiry from Rajesh Kumar",
                    "Event 'Annual Sports Day' created",
                    "Gallery updated with new photos",
                    "New notice published",
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFFDF7] rounded-lg">
                      <div className="w-2 h-2 bg-[#C62828] rounded-full" />
                      <p className="text-sm text-[#6B7280]">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "admissions" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#3E2723]">Manage Admissions</h2>
                <button className="px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                  Add New
                </button>
              </div>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Admissions management interface</p>
              </div>
            </div>
          )}

          {activeTab === "notices" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#3E2723]">Manage Notices</h2>
                <button className="px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                  Add New Notice
                </button>
              </div>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Notices management interface</p>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#3E2723]">Manage Events</h2>
                <button className="px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                  Add New Event
                </button>
              </div>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Events management interface</p>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#3E2723]">Manage Gallery</h2>
                <button className="px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                  Upload Images
                </button>
              </div>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Gallery management interface</p>
              </div>
            </div>
          )}

          {activeTab === "faculty" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#3E2723]">Manage Faculty</h2>
                <button className="px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                  Add Staff Member
                </button>
              </div>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Faculty management interface</p>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              <h2 className="text-xl font-bold text-[#3E2723] mb-6">Contact Inquiries</h2>
              <div className="card-base p-6">
                <p className="text-[#6B7280]">TODO: Contact inquiries management interface</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
