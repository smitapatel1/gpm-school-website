import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import schoolConfig from "@/config/school";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3E2723] text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#C62828] rounded-lg flex items-center justify-center font-bold text-lg">
                G
              </div>
              <div>
                <div className="font-bold text-sm">{schoolConfig.shortName}</div>
                <div className="text-xs text-gray-300">School</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              {schoolConfig.name}
            </p>
            <p className="text-xs text-gray-400">
              {schoolConfig.details.type}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/academics">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Academics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admissions">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Admissions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faculty">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Faculty
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-bold mb-4 text-white">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gallery">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Events
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/notices">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Notices
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{schoolConfig.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${schoolConfig.contact.phone1}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {schoolConfig.contact.phone1}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href={`mailto:${schoolConfig.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {schoolConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} {schoolConfig.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {schoolConfig.social.facebook && (
              <a
                href={schoolConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
            )}
            {schoolConfig.social.instagram && (
              <a
                href={schoolConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            )}
            {schoolConfig.social.twitter && (
              <a
                href={schoolConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            )}
          </div>

          {/* Made By */}
          <p className="text-xs text-gray-500">
            Website made by{" "}
            <a
              href={schoolConfig.footer.madeByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors underline"
            >
              {schoolConfig.footer.madeBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
