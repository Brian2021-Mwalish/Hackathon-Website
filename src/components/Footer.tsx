import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 border-t border-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/bitsa logo.png" alt="BITSA Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">BITSA</span>
            </div>
            <p className="text-sm text-white">
              Empowering IT students through innovation, collaboration, and excellence.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white">
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Join BITSA</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:bitsaclub@ueab.ac.ke"
                className="flex items-center text-sm text-white hover:text-primary transition-colors"
              >
                <Mail size={16} className="mr-2" />
                bitsaclub@ueab.ac.ke
              </a>
              <a
                href="tel:0708898899"
                className="flex items-center text-sm text-white hover:text-primary transition-colors"
              >
                <Phone size={16} className="mr-2" />
                0708 898 899
              </a>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 text-center text-sm text-white">
          <p>© {currentYear} BITSA - Bachelor of Information Technology Students Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
