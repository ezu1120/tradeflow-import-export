import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-slate-100 dark:bg-[#101828] text-slate-700 dark:text-white h-[32px] px-4 sm:px-8 md:px-18 flex items-center justify-between text-xs">
      {/* Left: Contact Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Phone className="w-3 h-3 text-[#D4AF37]" />
          <a 
            href="tel:+251991001124" 
            className="text-[10px] text-slate-700 dark:text-white/90 hover:text-[#D4AF37] transition-colors"
            aria-label="Call us"
          >
            +251 991 001 124
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Mail className="w-3 h-3 text-[#D4AF37]" />
          <a 
            href="mailto:hello@tradehub.com" 
            className="text-[10px] text-slate-700 dark:text-white/90 hover:text-[#D4AF37] transition-colors"
            aria-label="Email us"
          >
            hello@tradehub.com
          </a>
        </div>
      </div>

      {/* Right: Social Links */}
      <div className="flex items-center gap-1">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="w-3 h-3" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Visit our Twitter page"
        >
          <Twitter className="w-3 h-3" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Visit our LinkedIn page"
        >
          <Linkedin className="w-3 h-3" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Visit our Instagram page"
        >
          <Instagram className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
