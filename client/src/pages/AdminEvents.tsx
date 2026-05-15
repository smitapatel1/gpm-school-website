import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Loader2, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

interface Event {
  id: string;
  title: string;
  description: string;
  date: any;
  endDate?: any;
  location: string;
  imageUrl?: string;
  category: string;
  createdAt: any;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    imageUrl: "",
    category: "sports",
  });

  const categories = ["sports", "cultural", "academic", "celebration"];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "events"));
      const data: Event[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Event);
      });
      setEvents(data.sort((a, b) => b.date?.toDate?.() - a.date?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        date: formData.date ? Timestamp.fromDate(new Date(formData.date)) : Timestamp.now(),
        endDate: formData.endDate ? Timestamp.fromDate(new Date(formData.endDate)) : null,
      };

      if (editingId) {
        await updateDoc(doc(db, "events", editingId), {
          ...eventData,
          updatedAt: Timestamp.now(),
        });
        setEvents((prev) =>
          prev.map((e) => (e.id === editingId ? { ...e, ...eventData } : e))
        );
      } else {
        const docRef = await addDoc(collection(db, "events"), {
          ...eventData,
          createdAt: Timestamp.now(),
        });
        setEvents((prev) => [{ id: docRef.id, ...eventData, createdAt: Timestamp.now() }, ...prev]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const startEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date?.toDate?.()?.toISOString()?.split("T")[0] || "",
      endDate: event.endDate?.toDate?.()?.toISOString()?.split("T")[0] || "",
      location: event.location,
      imageUrl: event.imageUrl || "",
      category: event.category,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      endDate: "",
      location: "",
      imageUrl: "",
      category: "sports",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium"
      >
        <Plus size={20} />
        Add New Event
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingId ? "Edit Event" : "Add New Event"}
              </h3>
              <button onClick={resetForm} className="text-[#6B7280] hover:text-[#3E2723]">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-[#D6D6D6] text-[#3E2723] rounded-lg hover:bg-[#FFFDF7] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : events.length === 0 ? (
        <div className="card-base p-8 text-center">
          <p className="text-[#6B7280]">No events found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="card-base p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#3E2723] mb-2">{event.title}</h4>
                  <p className="text-sm text-[#6B7280] mb-3">{event.description}</p>
                  <div className="flex items-center gap-3 flex-wrap text-sm">
                    <span className="text-[#3E2723]">📍 {event.location}</span>
                    <span className="px-3 py-1 bg-[#FFF8E1] text-[#C62828] rounded-full text-xs font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(event)}
                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
