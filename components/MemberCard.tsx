import { User } from 'lucide-react';

interface MemberCardProps {
  name: string;
  role: string;
  avatar?: string;
}

export function MemberCard({ name, role }: MemberCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-100 hover:border-[#C4A574]">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7CB342] to-[#5A6F5C] flex items-center justify-center text-white flex-shrink-0">
          <User size={28} />
        </div>
        <div>
          <h4 className="text-[#5D4A2F] mb-1 font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
