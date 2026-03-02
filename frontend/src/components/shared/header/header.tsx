import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { useTheme } from "next-themes";
import { ModeToggle } from "../mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./top-bar";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed flex flex-col top-0 left-0 right-0 z-50 bg-white dark:bg-[#101828]/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-[#101828]/90 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <TopBar />
        <nav className="px-4 sm:px-8 md:px-18 py-4 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#101828] dark:bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white dark:text-[#101828]" />
            </div>
            <span className="font-bold text-xl text-[#101828] dark:text-white">TradeFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-semibold text-slate-700 dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* <ModeToggle /> */}

            <Button
              className="hidden md:flex bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold min-w-[44px] min-h-[44px]"
              onClick={() => {
                navigate("/contact");
              }}
              aria-label="Contact us"
            >
              Contact Us
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] text-slate-700 dark:text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          navLinks={navLinks}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
