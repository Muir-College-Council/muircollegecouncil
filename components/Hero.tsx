import { Button } from './ui/button';
import { Calendar, FileText, Trees } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#2C5530] via-[#3D6F42] to-[#5A6F5C] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#AED581] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#8B6F47] rounded-full blur-3xl"></div>
      </div>

      {/* Clean vector forest illustration */}
      <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-80" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 L240,140 L480,155 L720,145 L960,160 L1200,150 L1440,165 L1440,320 L0,320 Z" fill="#1A3A1F" opacity="0.3" />
          <path d="M0,200 L180,185 L360,195 L540,180 L720,200 L900,185 L1080,195 L1260,180 L1440,190 L1440,320 L0,320 Z" fill="#5D4A2F" opacity="0.4" />
          <path d="M0,240 L240,230 L480,245 L720,235 L960,250 L1200,238 L1440,245 L1440,320 L0,320 Z" fill="#0F2415" opacity="0.5" />
        </svg>

        <svg className="absolute bottom-0 w-full h-72" viewBox="0 0 1440 288" preserveAspectRatio="xMidYMax meet">
          <g opacity="0.4" fill="#1A3A1F">
            <polygon points="100,120 130,180 70,180" />
            <polygon points="100,155 135,220 65,220" />
            <polygon points="100,190 140,260 60,260" />
            <rect x="95" y="260" width="10" height="28" fill="#5D4A2F" />
            <polygon points="180,140 205,190 155,190" />
            <polygon points="180,170 210,230 150,230" />
            <rect x="175" y="230" width="10" height="58" fill="#5D4A2F" />
          </g>
          <g opacity="0.45" fill="#2C5530">
            <polygon points="700,100 735,165 665,165" />
            <polygon points="700,135 740,210 660,210" />
            <polygon points="700,175 745,260 655,260" />
            <rect x="695" y="260" width="10" height="28" fill="#6B5444" />
            <polygon points="820,130 850,185 790,185" />
            <polygon points="820,160 855,225 785,225" />
            <rect x="815" y="225" width="10" height="63" fill="#6B5444" />
          </g>
          <g opacity="0.4" fill="#5D4A2F">
            <polygon points="1240,125 1275,190 1205,190" />
            <polygon points="1240,165 1280,240 1200,240" />
            <rect x="1235" y="240" width="10" height="48" fill="#1A3A1F" />
            <polygon points="1340,155 1365,200 1315,200" />
            <polygon points="1340,185 1370,240 1310,240" />
            <rect x="1335" y="240" width="10" height="48" fill="#1A3A1F" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#7CB342]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Trees className="text-[#AED581]" size={24} />
            </div>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[#AED581] to-transparent"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Muir College Council
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
            Representing and supporting the Muir College student community at UC San Diego.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#7CB342] text-white hover:bg-[#689F38] text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              asChild
            >
              <a href="#events">
                <Calendar className="mr-2" size={20} />
                View Events
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 text-lg px-8 py-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              asChild
            >
              <a href="#meetings">
                <FileText className="mr-2" size={20} />
                View Meeting Agendas
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 34.7C840 32 960 32 1080 37.3C1200 43 1320 53 1380 58.7L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#FDFBF7" />
        </svg>
      </div>
    </section>
  );
}
