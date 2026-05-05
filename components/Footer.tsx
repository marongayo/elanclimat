'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'white' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600 }}>Élan Climat</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginTop: 2 }}>&amp; Énergie</div>
            </div>
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', maxWidth: 260 }}>
              Premium climate control and renewable energy solutions — designed for lasting comfort and sustainability.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 18 }}>Services</h4>
            {['HVAC Installation', 'Solar Power Systems', 'Battery Storage', 'Maintenance & Repair', 'Energy Audits'].map(s => (
              
              <Link key={s} href="/#services" style={{ display: 'block', fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                {s}
              </Link>
              
            ))}
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 18 }}>Company</h4>
            {[{ l: 'About Us', h: '/#about' }, { l: 'Blog & News', h: '/blog' }, { l: 'Shop', h: '/shop' }, { l: 'Contact', h: '/#contact' }, { l: 'Admin', h: '/admin' }].map(item => (
              <a key={item.l} href={item.h} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                {item.l} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 18 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: <Phone size={14} />, text: '+254 796 952 717' },
                { icon: <Mail size={14} />, text: 'hello@elanclimat.co.ke' },
                { icon: <MapPin size={14} />, text: 'Ananas Business Park, Off Garrissa Road, Thika' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: 'var(--sage)', marginTop: 1 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
          © 2019 - {`${new Date().getFullYear()} `} Élan Climat &amp; Énergie. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
