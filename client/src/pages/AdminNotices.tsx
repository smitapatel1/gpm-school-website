import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Loader2, X } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  pdfUrl?: string;
  pdfPath?: string;
  pdfName?: string;
  date: any;
  createdAt?: any;
  updatedAt?: any;
}

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    pdfUrl: "",
    pdfFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const categories = ["academic", "admission", "event", "general"];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "notices"));
      const data: Notice[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Notice);
      });
      setNotices(data.sort((a, b) => b.date?.toDate?.() - a.date?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("PDF file size must be less than 10 MB");
      return;
    }

    setFormData((prev) => ({ ...prev, pdfFile: file }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setUploading(true);
      let pdfUrl = formData.pdfUrl;
      let pdfPath = "";
      let pdfName = "";

      // Upload PDF to Firebase Storage if provided
      if (formData.pdfFile) {
        const timestamp = Date.now();
        pdfName = formData.pdfFile.name;
        pdfPath = `notices/${formData.category}/${timestamp}_${pdfName}`;
        const storageRef = ref(storage, pdfPath);
        await uploadBytes(storageRef, formData.pdfFile);
        pdfUrl = await getDownloadURL(storageRef);
      }

      const noticeData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        ...(pdfUrl && { pdfUrl, pdfPath, pdfName }),
        date: Timestamp.now(),
        ...(editingId ? { updatedAt: Timestamp.now() } : { createdAt: Timestamp.now() }),
      };

      if (editingId) {
        await updateDoc(doc(db, "notices", editingId), noticeData);
        setNotices((prev) =>
          prev.map((n) => (n.id === editingId ? { ...n, ...noticeData } : n))
        );
      } else {
        const docRef = await addDoc(collection(db, "notices"), noticeData);
        setNotices((prev) => [
          { id: docRef.id, ...noticeData },
          ...prev,
        ]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving notice:", error);
      alert("Error saving notice. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteNotice = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        const notice = notices.find((n) => n.id === id);
        
        // Delete PDF from Firebase Storage if it exists
        if (notice?.pdfPath) {
          try {
            const storageRef = ref(storage, notice.pdfPath);
            await deleteObject(storageRef);
          } catch (storageError) {
            console.warn("PDF file not found in storage, continuing with deletion:", storageError);
          }
        }
        
        // Delete notice from Firestore
        await deleteDoc(doc(db, "notices", id));
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("Error deleting notice. Please try again.");
      }
    }
  };

  const startEdit = (notice: Notice) => {
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      pdfUrl: notice.pdfUrl || "",
      pdfFile: null,
    });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "general", pdfUrl: "", pdfFile: null });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDeleteWithConfirm = (id: string) => {
    const notice = notices.find((n) => n.id === id);
    const message = notice?.pdfName 
      ? `Delete notice "${notice.title}" and its PDF file?`
      : `Delete notice "${notice?.title}"?`;
    
    if (confirm(message)) {
      deleteNotice(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium"
      >
        <Plus size={20} />
        Add New Notice
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingId ? "Edit Notice" : "Add New Notice"}
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
                  rows={3}
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

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Upload PDF File (optional)
                </label>
                <label className="flex flex-col items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#D6D6D6] rounded-lg cursor-pointer hover:border-[#C62828] hover:bg-[#FFF8E1] transition-colors">
                  <span className="text-sm font-medium text-[#3E2723]">
                    {formData.pdfFile ? formData.pdfFile.name : "Click to upload PDF"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-1">
                  Or PDF URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  placeholder="https://example.com/notice.pdf"
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
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
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notices List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : notices.length === 0 ? (
        <div className="card-base p-8 text-center">
          <p className="text-[#6B7280]">No notices found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notices.map((notice) => (
            <div key={notice.id} className="card-base p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#3E2723] mb-2">{notice.title}</h4>
                  <p className="text-sm text-[#6B7280] mb-3">{notice.description}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-[#FFF8E1] text-[#C62828] rounded-full text-xs font-semibold">
                      {notice.category}
                    </span>
                    {notice.pdfUrl && (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(notice)}
                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                <button
                  onClick={() => handleDeleteWithConfirm(notice.id)}
                  className="text-[#C62828] hover:text-[#E53935] transition-colors"
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
