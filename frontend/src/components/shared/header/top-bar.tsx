import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function TopBar() {
  const { settings } = useSiteSettings();

  return (
    <div className="w-full bg-slate-100 dark:bg-[#101828] text-slate-700 dark:text-white h-[32px] px-4 sm:px-8 md:px-18 flex items-center justify-between text-xs">
      {/* Left: Contact Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Phone className="w-3 h-3 text-[#D4AF37]" />
          <a href={`tel:${settings.company_phone}`} className="text-[10px] text-slate-700 dark:text-white/90 hover:text-[#D4AF37] transition-colors" aria-label="Call us">
            {settings.company_phone}
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Mail className="w-3 h-3 text-[#D4AF37]" />
          <a href={`mailto:${settings.company_email}`} className="text-[10px] text-slate-700 dark:text-white/90 hover:text-[#D4AF37] transition-colors" aria-label="Email us">
            {settings.company_email}
          </a>
        </div>
      </div>

      {/* Right: Social Links */}
      <div className="flex items-center gap-1">
        <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1" aria-label="Facebook">
          <Facebook className="w-3 h-3" />
        </a>
        <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1" aria-label="Twitter">
          <Twitter className="w-3 h-3" />
        </a>
        <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1" aria-label="LinkedIn">
          <Linkedin className="w-3 h-3" />
        </a>
        <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-white hover:text-[#D4AF37] transition-colors p-1" aria-label="Instagram">
          <Instagram className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
