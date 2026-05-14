import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch gallery images from Firestore
  }, []);

  const categories = [
    { id: "all", label: "All", icon: "🎨" },
    { id: "events", label: "Events", icon: "🎉" },
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "academics", label: "Academics", icon: "📚" },
    { id: "cultural", label: "Cultural", icon: "🎭" },
  ];

  // Placeholder images
  const placeholderImages = [
    { id: 1, category: "events", title: "Annual Day Celebration", url: "https://via.placeholder.com/400x300?text=Annual+Day" },
    { id: 2, category: "sports", title: "Sports Day", url: "https://via.placeholder.com/400x300?text=Sports+Day" },
    { id: 3, category: "academics", title: "Science Exhibition", url: "https://via.placeholder.com/400x300?text=Science+Exhibition" },
    { id: 4, category: "cultural", title: "Cultural Program", url: "https://via.placeholder.com/400x300?text=Cultural+Program" },
    { id: 5, category: "events", title: "School Assembly", url: "https://via.placeholder.com/400x300?text=School+Assembly" },
    { id: 6, category: "sports", title: "Cricket Tournament", url: "https://via.placeholder.com/400x300?text=Cricket" },
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;
  const filteredImages =
    selectedCategory === "all"
      ? displayImages
      : displayImages.filter((img) => img.category === selectedCategory);

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
      <section className="py-12 bg-white border-b border-[#D6D6D6]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-[#C62828] text-white"
                    : "bg-[#FFF8E1] text-[#3E2723] hover:bg-[#E8D6B3]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold">{image.title}</p>
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
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
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
                {displayImages.length}
              </div>
              <p className="text-[#6B7280]">Total Photos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">5</div>
              <p className="text-[#6B7280]">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayImages.filter((img) => img.category === "events").length}
              </div>
              <p className="text-[#6B7280]">Events</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C62828] mb-2">
                {displayImages.filter((img) => img.category === "sports").length}
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
