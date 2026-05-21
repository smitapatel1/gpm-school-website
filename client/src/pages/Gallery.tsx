import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LazyImage from "@/components/LazyImage";
import { setSEOTags, pageConfig } from "@/lib/seo";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  uploadedAt: any;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSEOTags(pageConfig.gallery);
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const galleryImages: GalleryImage[] = [];
      const uniqueCategories = new Set<string>();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.imageUrl) {
          galleryImages.push({
            id: doc.id,
            title: data.title || "Untitled",
            category: data.category || "events",
            imageUrl: data.imageUrl,
            uploadedAt: data.uploadedAt,
          });
          if (data.category) {
            uniqueCategories.add(data.category);
          }
        }
      });

      setImages(galleryImages.sort((a, b) => b.uploadedAt?.toDate?.() - a.uploadedAt?.toDate?.() || 0));

      // Set categories from Firestore data
      if (uniqueCategories.size > 0) {
        setCategories(Array.from(uniqueCategories).sort());
      } else {
        // Fallback to default categories
        setCategories(["events", "sports", "academics", "cultural"]);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      // Fallback to default categories on error
      setCategories(["events", "sports", "academics", "cultural"]);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons: Record<string, string> = {
    events: "🎉",
    sports: "⚽",
    academics: "📚",
    cultural: "🎭",
  };

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-white/90">
            Capture moments from our school life
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {!loading && (
        <section className="py-12 bg-white border-b border-[#D6D6D6]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === "all"
                    ? "bg-[#C62828] text-white"
                    : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
                }`}
              >
                <span>🎨</span>
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 capitalize ${
                    selectedCategory === cat
                      ? "bg-[#C62828] text-white"
                      : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
                  }`}
                >
                  <span>{categoryIcons[cat] || "📷"}</span>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#C62828]" size={40} />
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <LazyImage
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold">{image.title}</p>
                      <p className="text-sm text-white/80 capitalize">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#6B7280]">
              <p className="text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <LazyImage
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-white/80 capitalize mt-2">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {images.length}
              </div>
              <p className="text-[#6B7280]">Total Photos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {categories.length + 1}
              </div>
              <p className="text-[#6B7280]">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {images.filter((img) => img.category === "events").length}
              </div>
              <p className="text-[#6B7280]">Events</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {images.filter((img) => img.category === "sports").length}
              </div>
              <p className="text-[#6B7280]">Sports</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
