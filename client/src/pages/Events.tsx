import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  useEffect(() => {
    // TODO: Fetch events from Firestore
  }, []);

  // Placeholder events
  const placeholderEvents = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: new Date("2026-06-15"),
      endDate: new Date("2026-06-15"),
      time: "09:00 AM - 04:00 PM",
      location: "School Grounds",
      description: "Annual sports competition featuring various athletic events and team competitions.",
      category: "sports",
      imageUrl: "https://via.placeholder.com/600x400?text=Sports+Day",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Science Exhibition",
      date: new Date("2026-06-20"),
      endDate: new Date("2026-06-20"),
      time: "10:00 AM - 03:00 PM",
      location: "School Auditorium",
      description: "Students showcase innovative science projects and experiments.",
      category: "academics",
      imageUrl: "https://via.placeholder.com/600x400?text=Science+Exhibition",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Annual Day Celebration",
      date: new Date("2026-07-10"),
      endDate: new Date("2026-07-10"),
      time: "05:00 PM - 09:00 PM",
      location: "School Auditorium",
      description: "Grand celebration featuring cultural performances, awards, and entertainment.",
      category: "cultural",
      imageUrl: "https://via.placeholder.com/600x400?text=Annual+Day",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Foundation Day",
      date: new Date("2026-05-01"),
      endDate: new Date("2026-05-01"),
      time: "10:00 AM - 12:00 PM",
      location: "School Campus",
      description: "Celebration of school foundation with special programs and activities.",
      category: "event",
      imageUrl: "https://via.placeholder.com/600x400?text=Foundation+Day",
      status: "past",
    },
  ];

  const displayEvents = events.length > 0 ? events : placeholderEvents;

  const upcomingEvents = displayEvents.filter((e) => e.status === "upcoming");
  const pastEvents = displayEvents.filter((e) => e.status === "past");

  const currentEvents = selectedTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-lg text-white/90">
            Stay updated with our latest events and activities
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-[#D6D6D6]">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTab("upcoming")}
              className={`px-6 py-2 font-medium rounded-lg transition-all ${
                selectedTab === "upcoming"
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setSelectedTab("past")}
              className={`px-6 py-2 font-medium rounded-lg transition-all ${
                selectedTab === "past"
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {currentEvents.length > 0 ? (
            <div className="space-y-8">
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="card-base overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="md:col-span-1 h-64 md:h-auto bg-gradient-to-br from-[#C62828] to-[#E53935] overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 p-8">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-[#FFF8E1] text-[#C62828] text-xs font-bold rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#3E2723] mb-4">
                        {event.title}
                      </h3>

                      <p className="text-[#6B7280] mb-6 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[#3E2723]">
                          <Calendar size={20} className="text-[#C62828]" />
                          <span>
                            {event.date.toLocaleDateString()} 
                            {event.endDate && event.endDate !== event.date && 
                              ` - ${event.endDate.toLocaleDateString()}`
                            }
                          </span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-3 text-[#3E2723]">
                            <Clock size={20} className="text-[#C62828]" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-[#3E2723]">
                          <MapPin size={20} className="text-[#C62828]" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <button className="px-6 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#6B7280]">
              <p className="text-lg">
                {selectedTab === "upcoming"
                  ? "No upcoming events at the moment"
                  : "No past events to display"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Calendar Preview */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Event Calendar</h2>
            <p className="section-subtitle">
              All important dates at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-base p-6">
              <h3 className="text-lg font-bold text-[#3E2723] mb-4">
                Upcoming Events
              </h3>
              <ul className="space-y-3">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <li key={event.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#C62828] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#3E2723]">
                        {event.title}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {event.date.toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-base p-6">
              <h3 className="text-lg font-bold text-[#3E2723] mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-[#C62828]">
                    {displayEvents.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-[#C62828]">
                    {upcomingEvents.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Past Events</p>
                  <p className="text-3xl font-bold text-[#C62828]">
                    {pastEvents.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
