import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Loader2, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

interface Faculty {
  id: string;
  name: string;
  designation: string;
  subject?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  experience?: string;
  createdAt: any;
}

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    subject: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    photoUrl: "",
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "faculty"));
      const data: Faculty[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Faculty);
      });
      setFaculty(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "faculty", editingId), {
          ...formData,
          updatedAt: Timestamp.now(),
        });
        setFaculty((prev) =>
          prev.map((f) => (f.id === editingId ? { ...f, ...formData } : f))
        );
      } else {
        const docRef = await addDoc(collection(db, "faculty"), {
          ...formData,
          createdAt: Timestamp.now(),
        });
        setFaculty((prev) => [
          { id: docRef.id, ...formData, createdAt: Timestamp.now() },
          ...prev,
        ]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id: string) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await deleteDoc(doc(db, "faculty", id));
        setFaculty((prev) => prev.filter((f) => f.id !== id));
      } catch (error) {
        console.error("Error deleting faculty:", error);
      }
    }
  };

  const startEdit = (member: Faculty) => {
    setFormData({
      name: member.name,
      designation: member.designation,
      subject: member.subject || "",
      email: member.email || "",
      phone: member.phone || "",
      qualification: member.qualification || "",
      experience: member.experience || "",
      photoUrl: member.photoUrl || "",
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      subject: "",
      email: "",
      phone: "",
      qualification: "",
      experience: "",
      photoUrl: "",
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
        Add Staff Member
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingId ? "Edit Faculty" : "Add Staff Member"}
              </h3>
              <button onClick={resetForm} className="text-[#6B7280] hover:text-[#3E2723]">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g., M.Sc, B.Ed"
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 15 years"
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-[#D6D6D6] text-[#3E2723] rounded-lg hover:bg-[#FFFDF7] transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium text-sm"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Faculty Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : faculty.length === 0 ? (
        <div className="card-base p-8 text-center">
          <p className="text-[#6B7280]">No faculty members found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculty.map((member) => (
            <div key={member.id} className="card-base p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[#3E2723]">{member.name}</h4>
                  <p className="text-sm text-[#C62828] font-semibold">{member.designation}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(member)}
                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteFaculty(member.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {member.subject && (
                  <p className="text-[#6B7280]">
                    <span className="font-semibold">Subject:</span> {member.subject}
                  </p>
                )}
                {member.qualification && (
                  <p className="text-[#6B7280]">
                    <span className="font-semibold">Qualification:</span> {member.qualification}
                  </p>
                )}
                {member.experience && (
                  <p className="text-[#6B7280]">
                    <span className="font-semibold">Experience:</span> {member.experience}
                  </p>
                )}
                {member.email && (
                  <p className="text-[#6B7280]">
                    <span className="font-semibold">Email:</span> {member.email}
                  </p>
                )}
                {member.phone && (
                  <p className="text-[#6B7280]">
                    <span className="font-semibold">Phone:</span> {member.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
