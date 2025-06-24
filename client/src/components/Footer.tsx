import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hiddekel-gray text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">HIDDEKEL</h3>
                <p className="text-gray-400 text-sm">INVESTMENTS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              "We are the land developers of choice" - Building Zimbabwe's future with premium residential developments that enhance quality of life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">About</Link></li>
              <li><Link href="/stands" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">Stands</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">Gallery</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-hiddekel-gold transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p className="text-sm">Suite 13,16 First Floor<br />Merchant House<br />43 Robson Manyika Ave</p>
              <p className="text-sm">+263 716 236 518</p>
              <p className="text-sm">info@hiddekel.org</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Hiddekel Investments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
