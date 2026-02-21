import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconColor: string;
  iconBgColor: string;
}

export function ActionCard({ icon: Icon, title, description, href, iconColor, iconBgColor }: ActionCardProps) {
  return (
    <a
      href={href}
      className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 hover:border-[#C4A574] hover:-translate-y-1 block"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={28} style={{ color: iconColor }} strokeWidth={2} />
      </div>
      <h4 className="text-[#5D4A2F] mb-2 group-hover:text-[#8B6F47] transition-colors">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </a>
  );
}
