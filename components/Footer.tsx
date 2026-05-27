// components/footer/Footer.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ElanLogo from "./ElanLogo";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },
];

const SERVICES = [
  "HVAC Systems",
  "Solar Installation",
  "Solar Water Heaters",
  "Cold Room Installation",
  "Elevator Installation",
  "Electrical",
  "Plumbing",
  "Maintenance & Repair",
];

const QUICK_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Admin", href: "/admin" },
];

const CONTACT_INFO = [
  { label: "+254 796 952 717", href: "tel:+254796952717" },
  { label: "hello@elanclimat.co.ke", href: "mailto:hello@elanclimat.co.ke" },
  { label: "www.elanclimat.co.ke", href: "https://www.elanclimat.co.ke" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f6] px-6 md:px-10 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-14 border-b border-gray-200">
          {/* Logo LEFT + text/socials RIGHT */}
          <div className="flex items-start gap-5 max-w-sm">
            {/* Logo */}
            <div className="shrink-0">
              <ElanLogo size={150} />
            </div>

            {/* Description + socials */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                Smart solutions for HVAC, solar, refrigeration, electrical, and
                elevator systems across Kenya.
              </p>

              <div className="flex items-center gap-2">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-transparent transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Blog CTA card */}
          <div className="bg-[#141d14] rounded-3xl px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:max-w-md w-full">
            <p className="text-white font-extrabold text-xl leading-snug tracking-tight">
              Insights
              <br />
              and updates
            </p>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 bg-white hover:bg-transparent border-2 border-white text-black hover:text-white font-bold pl-5 pr-2 py-2 rounded-full transition-all duration-300 shrink-0"
            >
              <span className="text-xs tracking-wider uppercase">
                View Blog
              </span>
              <div className="bg-black group-hover:bg-white p-2 rounded-full text-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 translate-x-1">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 py-14 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 hover:text-[#111111] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-[#111111] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 invisible">
              hidden
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(4).map((service) => (
                <li key={service}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-[#111111] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              {CONTACT_INFO.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-600 hover:text-[#111111] transition-colors break-all"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-gray-400">
          <p>
            © {`2018 – ${new Date().getFullYear()}`} Élan Climat & Énergie. All
            rights reserved.
          </p>
          <p className="font-medium">
            smart solutions.{" "}
            <span className="text-gray-500 font-semibold">
              Sustainable future.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
