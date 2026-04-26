"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

const info = [
  { icon: Phone,  label: "Call us",  value: "+254 796 952 717" },
  { icon: Mail,   label: "Email",    value: "contact@elan-climat.co.ke" },
  { icon: MapPin, label: "Visit",    value: "1113 Kayahwe Rd, Off Galana Rd, Kilimani. Nairobi, Kenya" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputCls = `w-full px-4 py-3 rounded-xl border border-stone-sandstone/30 bg-stone-titanium/50
    text-stone-charcoal text-sm font-sans placeholder:text-stone-char-xlt/40 outline-none
    focus:border-stone-amber focus:ring-1 focus:ring-stone-amber/30 transition-all duration-200`;

  return (
    <section id="contact" className="bg-stone-charcoal py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,146,42,0.1) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 border border-stone-amber/30 bg-stone-amber/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[11px] font-semibold text-stone-amber tracking-[.12em]">GET IN TOUCH</span>
            </div>
            <h2 className="font-serif font-bold text-stone-titanium leading-tight mb-5" style={{ fontSize: "clamp(32px,4vw,50px)" }}>
              Start Your Energy <em className="text-stone-amber not-italic">Transformation</em>
            </h2>
            <p className="text-stone-sand-lt/65 font-light leading-relaxed mb-12" style={{ fontSize: 16 }}>
              Free consultations, no pressure. Our team is here to help whether you are ready to install or just exploring your options.
            </p>

            <div className="flex flex-col gap-6">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 shrink-0 bg-stone-amber/15 border border-stone-amber/25 rounded-xl flex items-center justify-center">
                    <Icon size={17} className="text-stone-amber" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-sand-lt/50 font-semibold tracking-widest mb-0.5">{label.toUpperCase()}</div>
                    <div className="text-stone-titanium text-[14px] font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/4 border border-stone-sandstone/15 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle size={52} className="text-stone-amber mx-auto mb-5" />
                <h3 className="font-serif text-stone-titanium text-2xl mb-3">Message Received!</h3>
                <p className="text-stone-sand-lt/65 font-light text-sm leading-relaxed">Thank you for reaching out. One of our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-stone-titanium text-xl mb-1">Request a Free Quote</h3>

                <div className="grid grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Full name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <input className={inputCls} type="email" placeholder="Email address"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>

                <input className={inputCls} type="tel" placeholder="Phone (optional)"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />

                <select className={inputCls}
                  value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  <option value="">Select a service…</option>
                  {["HVAC Installation","Solar Panel Installation","Battery Storage","Smart Energy System","Maintenance & Service","Multiple Services"].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <textarea className={`${inputCls} resize-none min-h-25`}
                  placeholder="Tell us about your project…"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />

                <button onClick={() => setSent(true)}
                  className="btn-primary justify-center mt-2 rounded-xl! py-3.5!">
                  Send Message <Send size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
