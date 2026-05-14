import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import schoolConfig from "@/config/school";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Faculty", href: "/faculty" },
    { label: "Gallery", href: "/gallery" },
    { label: "Notices", href: "/notices" },
    { label: "Events", href: "/events" },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-[#D6D6D6] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-[#C62828] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  G
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-[#3E2723] text-sm leading-tight">
                    {schoolConfig.shortName}
                  </div>
                  <div className="text-xs text-[#6B7280]">School</div>
                </div>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="nav-link text-sm font-medium">
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Phone Button */}
              <a
                href={`tel:${schoolConfig.contact.phone1}`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C62828] text-white hover:bg-[#E53935] transition-colors text-sm font-medium"
              >
                <Phone size={16} />
                <span className="hidden md:inline">Call</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 hover:bg-[#FFF8E1] rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-[#D6D6D6] pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-lg hover:bg-[#FFF8E1] text-[#3E2723] font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sticky Bottom Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-[#D6D6D6] shadow-lg z-30">
        <div className="flex items-center justify-around py-3">
          {/* Call Button */}
          <a
            href={`tel:${schoolConfig.contact.phone1}`}
            className="flex flex-col items-center gap-1 px-4 py-2 text-[#C62828] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1"
          >
            <Phone size={20} />
            <span className="text-xs font-medium">Call</span>
          </a>

          {/* Admission Button */}
          <Link href="/admissions">
            <a className="flex flex-col items-center gap-1 px-4 py-2 text-[#C62828] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1">
              <MessageCircle size={20} />
              <span className="text-xs font-medium">Admission</span>
            </a>
          </Link>

          {/* Contact Button */}
          <Link href="/contact">
            <a className="flex flex-col items-center gap-1 px-4 py-2 text-[#C62828] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1">
              <MessageCircle size={20} />
              <span className="text-xs font-medium">Contact</span>
            </a>
          </Link>

          {/* WhatsApp Button */}
          <a
            href={schoolConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-4 py-2 text-[#25D366] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1"
          >
            <MessageCircle size={20} />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Add padding to body to account for sticky bottom bar on mobile */}
      <div className="h-20 lg:h-0" />
    </>
  );
}
