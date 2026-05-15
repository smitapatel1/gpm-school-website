import { useState, useEffect } from "react";
import { Trash2, Upload, Loader2, X, Image as ImageIcon } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  uploadedAt: any;
}

const categories = ["events", "sports", "academics", "cultural"];

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "events",
    imageUrl: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data: GalleryImage[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as GalleryImage);
      });
      setGallery(data.sort((a, b) => b.uploadedAt?.toDate?.() - a.uploadedAt?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setUploading(true);
      const docRef = await addDoc(collection(db, "gallery"), {
        ...formData,
        uploadedAt: Timestamp.now(),
      });
      setGallery((prev) => [
        { id: docRef.id, ...formData, uploadedAt: Timestamp.now() },
        ...prev,
      ]);
      resetForm();
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        setGallery((prev) => prev.filter((img) => img.id !== id));
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", category: "events", imageUrl: "" });
    setShowForm(false);
  };

  const filteredGallery =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((img) => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-[#C62828] text-white"
              : "bg-white border border-[#D6D6D6] text-[#3E2723] hover:border-[#C62828]"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedCategory === cat
                ? "bg-[#C62828] text-white"
                : "bg-white border border-[#D6D6D6] text-[#3E2723] hover:border-[#C62828]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium"
      >
        <Upload size={20} />
        Add Image to Gallery
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">Add Image to Gallery</h3>
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
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828]"
                />
                <p className="text-xs text-[#6B7280] mt-2">
                  Upload your image to Firebase Storage or use an external image URL
                </p>
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
                  {uploading ? "Uploading..." : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="card-base p-8 text-center">
          <ImageIcon className="mx-auto mb-4 text-[#D6D6D6]" size={48} />
          <p className="text-[#6B7280]">No images in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGallery.map((image) => (
            <div key={image.id} className="card-base overflow-hidden hover:shadow-md transition-shadow">
              {image.imageUrl && (
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h4 className="font-bold text-[#3E2723] mb-2">{image.title}</h4>
                <span className="inline-block px-3 py-1 bg-[#FFF8E1] text-[#C62828] rounded-full text-xs font-semibold mb-4 capitalize">
                  {image.category}
                </span>
                <button
                  onClick={() => deleteImage(image.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors font-medium text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
