import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import schoolConfig from "@/config/school";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setSEOTags, pageConfig } from "@/lib/seo";

export default function Contact() {
  useEffect(() => {
    setSEOTags(pageConfig.contact);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Submit contact form to Firestore
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C62828] to-[#E53935] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/90">
            Get in touch with us for any queries or information
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Address */}
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-[#C62828]" />
              </div>
              <h3 className="font-bold text-[#3E2723] mb-2">Address</h3>
              <p className="text-sm text-[#6B7280]">{schoolConfig.location}</p>
            </div>

            {/* Phone */}
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-[#C62828]" />
              </div>
              <h3 className="font-bold text-[#3E2723] mb-2">Phone</h3>
              <div className="space-y-1">
                <p className="text-sm text-[#6B7280]">{schoolConfig.contact.phone1}</p>
                <p className="text-sm text-[#6B7280]">{schoolConfig.contact.phone2}</p>
              </div>
            </div>

            {/* Email */}
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-[#C62828]" />
              </div>
              <h3 className="font-bold text-[#3E2723] mb-2">Email</h3>
              <a
                href={`mailto:${schoolConfig.contact.email}`}
                className="text-sm text-[#C62828] hover:text-[#E53935] transition-colors"
              >
                {schoolConfig.contact.email}
              </a>
            </div>

            {/* Hours */}
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-[#C62828]" />
              </div>
              <h3 className="font-bold text-[#3E2723] mb-2">Hours</h3>
              <p className="text-sm text-[#6B7280]">Mon - Fri: 8:00 AM - 4:00 PM</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-96 bg-gradient-to-br from-[#C62828] to-[#E53935] rounded-xl overflow-hidden flex items-center justify-center text-white">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg font-semibold">School Location Map</p>
              <p className="text-sm text-white/80">Interactive map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Send us a Message</h2>
              <p className="section-subtitle">
                We'll get back to you as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card-base p-8 space-y-6">
              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-700">Message Sent!</p>
                    <p className="text-sm text-green-600">
                      Thank you for contacting us. We'll respond shortly.
                    </p>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                  placeholder="Your phone number"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#3E2723] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-[#D6D6D6] rounded-lg focus:outline-none focus:border-[#C62828] transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-[#6B7280] text-center">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Quick Links</h2>
            <p className="section-subtitle">
              Need something specific? Here are some quick links
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/admissions"
              className="card-base p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-[#3E2723] mb-2">Admissions</h3>
              <p className="text-sm text-[#6B7280]">
                Apply for admission to our school
              </p>
            </a>

            <a
              href="/notices"
              className="card-base p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-3">📢</div>
              <h3 className="font-bold text-[#3E2723] mb-2">Notices</h3>
              <p className="text-sm text-[#6B7280]">
                Check latest announcements
              </p>
            </a>

            <a
              href="/events"
              className="card-base p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-bold text-[#3E2723] mb-2">Events</h3>
              <p className="text-sm text-[#6B7280]">
                View upcoming events
              </p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
