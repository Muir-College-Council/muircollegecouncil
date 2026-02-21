import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tag: string;
  tagColor: 'green' | 'blue' | 'orange';
}

const tagColorMap = {
  green: 'bg-[#D4E3D5] text-[#3F4F41]',
  blue: 'bg-blue-100 text-blue-800',
  orange: 'bg-orange-100 text-orange-800',
};

export function EventCard({ title, date, time, location, description, tag, tagColor }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 hover:border-[#C4A574] hover:-translate-y-1 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${tagColorMap[tagColor]}`}>
          <Tag size={12} />
          {tag}
        </span>
      </div>

      <h4 className="text-[#5D4A2F] mb-3">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{description}</p>

      <div className="space-y-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#7CB342] flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[#7CB342] flex-shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#7CB342] flex-shrink-0" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
