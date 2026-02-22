import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Request Funding', href: '#funding' },
  { label: 'Agendas & Minutes', href: '#meetings' },
  { label: 'Constitution', href: 'https://docs.google.com/document/d/1yW7dROyhdATU06eI6A5ebajDA1D8zssMhTnNUco4FDs/edit?tab=t.0#heading=h.qy6f6ljkjb7h' },
  { label: 'Accessibility & Resources', href: '#resources' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2C5530] via-[#1A3A1F] to-[#0F2415] text-white relative overflow-hidden">
      {/* Forest illustration background */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg className="w-full h-56" viewBox="0 0 1440 224" preserveAspectRatio="none">
          <path d="M0,112 L240,90 L480,100 L720,85 L960,105 L1200,95 L1440,110 L1440,224 L0,224 Z" fill="#1A3A1F" opacity="0.35" />
          <path d="M0,140 L180,125 L360,138 L540,120 L720,145 L900,130 L1080,142 L1260,125 L1440,135 L1440,224 L0,224 Z" fill="#5D4A2F" opacity="0.45" />
          <path d="M0,170 L240,162 L480,175 L720,165 L960,178 L1200,168 L1440,172 L1440,224 L0,224 Z" fill="#0F2415" opacity="0.55" />
        </svg>

        <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1440 192" preserveAspectRatio="xMidYMax meet">
          <g opacity="0.4" fill="#0F2415">
            <polygon points="150,60 175,105 125,105" />
            <polygon points="150,85 180,140 120,140" />
            <polygon points="150,115 185,175 115,175" />
            <rect x="145" y="175" width="10" height="17" fill="#5D4A2F" />
            <polygon points="250,75 270,110 230,110" />
            <polygon points="250,100 275,145 225,145" />
            <rect x="245" y="145" width="10" height="47" fill="#5D4A2F" />
          </g>
          <g opacity="0.45" fill="#1A3A1F">
            <polygon points="700,50 730,100 670,100" />
            <polygon points="700,75 735,135 665,135" />
            <polygon points="700,105 740,170 660,170" />
            <rect x="695" y="170" width="10" height="22" fill="#6B5444" />
            <polygon points="820,65 845,105 795,105" />
            <polygon points="820,90 850,140 790,140" />
            <rect x="815" y="140" width="10" height="52" fill="#6B5444" />
          </g>
          <g opacity="0.4" fill="#5D4A2F">
            <polygon points="1190,70 1220,115 1160,115" />
            <polygon points="1190,100 1225,155 1155,155" />
            <rect x="1185" y="155" width="10" height="37" fill="#1A3A1F" />
            <polygon points="1290,80 1310,115 1270,115" />
            <polygon points="1290,105 1315,150 1265,150" />
            <rect x="1285" y="150" width="10" height="42" fill="#1A3A1F" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image src="/mcc-logo.jpg" alt="Muir College Council Logo" width={48} height={48} className="rounded-full object-cover" />
              </div>
              <span className="font-semibold text-lg">Muir College Council</span>
            </div>
            <p className="text-green-100/90 text-sm leading-relaxed">
              Representing and supporting the Muir College student community at UC San Diego.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[#AED581]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-green-100/80 hover:text-[#AED581] text-sm transition-colors inline-block"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[#AED581]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-[#7CB342] mt-0.5 flex-shrink-0" />
                <a href="mailto:mcc@ucsd.edu" className="text-green-100/80 hover:text-[#AED581] text-sm transition-colors">
                  mcc@ucsd.edu
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#7CB342] mt-0.5 flex-shrink-0" />
                <span className="text-green-100/80 text-sm">
                  Muir College, UC San Diego<br />
                  La Jolla, CA 92093
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram size={18} className="text-[#7CB342] flex-shrink-0" />
                <a
                  href="https://instagram.com/muircollegecouncil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-100/80 hover:text-[#AED581] text-sm transition-colors"
                >
                  @muircollegecouncil
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-green-100/70">
          <p>&copy; {new Date().getFullYear()} Muir College Council. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}