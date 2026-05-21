import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, FileText, Mail, Instagram } from "lucide-react";
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
              <FileText size={20} />
              <span className="text-xs font-medium">Admission</span>
            </a>
          </Link>

          {/* Contact Button */}
          <Link href="/contact">
            <a className="flex flex-col items-center gap-1 px-4 py-2 text-[#C62828] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1">
              <Mail size={20} />
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.557.821-2.816 2.088-3.604 3.616-1.202 2.257-.629 4.953 1.213 6.617.925.78 2.21 1.227 3.393 1.227a5.5 5.5 0 001.5-.203c1.557-.821 2.816-2.088 3.604-3.616 1.202-2.257.629-4.953-1.213-6.617-.925-.78-2.21-1.227-3.393-1.227m5.84-3.65c-1.202 0-2.429.194-3.58.574-2.237.747-4.102 2.128-5.38 3.899C.566 6.026.073 8.25.565 10.228c.492 1.978 1.793 3.591 3.365 4.922 1.572 1.33 3.6 2.096 5.786 2.096.992 0 1.923-.134 2.799-.396 2.237-.747 4.102-2.128 5.38-3.899 1.278-1.771 1.771-3.995 1.279-5.973-.492-1.978-1.793-3.591-3.365-4.922C19.661.756 17.633-.01 15.447-.01z"/>
            </svg>
            <span className="text-xs font-medium">WhatsApp</span>
          </a>

          {/* Instagram Button - Only show if URL is configured */}
          {schoolConfig.social.instagram && (
            <a
              href={schoolConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#E1306C] hover:bg-[#FFF8E1] rounded-lg transition-colors flex-1"
            >
              <Instagram size={20} />
              <span className="text-xs font-medium">Instagram</span>
            </a>
          )}
        </div>
      </div>

      {/* Add padding to body to account for sticky bottom bar on mobile */}
      <div className="h-20 lg:h-0" />
    </>
  );
}
