import { Flame, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Services: ["HVAC Systems", "Solar Panels", "Battery Storage", "Smart Energy", "Maintenance"],
  Company:  ["About Us", "Our Team", "Projects", "Blog", "Careers"],
  Support:  ["Get a Quote", "FAQ", "Contact Us", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="bg-stone-charcoal border-t border-stone-sandstone/12">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-stone-amber rounded-full flex items-center justify-center">
                <Flame size={16} className="text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-stone-titanium text-[15px] leading-tight">Élan Climat</div>
                <div className="text-[9px] text-stone-amber tracking-[.2em] font-semibold">& ÉNERGIE</div>
              </div>
            </div>
            <p className="text-stone-sand-lt/45 text-[13px] font-light leading-relaxed mb-6 max-w-55">
              Expert HVAC, solar and battery solutions. Sustainable comfort, intelligently delivered.
            </p>
            <div className="flex gap-2">
              {[
                { name: "Mail", icon: Mail, href: "mailto:contact@elan.co.ke" },
                { name: "Phone", icon: Phone, href: "tel:+254796952717" }
              ].map(({ name, icon: Icon, href }) => (
                <a key={name} href={href}
                  className="w-8 h-8 border border-stone-sandstone/20 rounded-full flex items-center justify-center text-stone-sand-lt/40 hover:bg-stone-amber hover:border-stone-amber hover:text-white transition-all duration-200">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="text-[12px] font-bold text-stone-amber tracking-[.15em] mb-4">{heading.toUpperCase()}</div>
              <ul className="flex flex-col gap-3">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-stone-sand-lt/45 text-[14px] font-light hover:text-[#ff9d00] transition-colors duration-200">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-sandstone/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-stone-sand-lt/30 text-[12px]">© 2020 - {new Date().getFullYear()} Élan Climat & Énergie.</div>
          <div className="flex items-center gap-2 text-stone-sand-lt/30 text-[12px]">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-amber" />
            Committed to a greener future. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
