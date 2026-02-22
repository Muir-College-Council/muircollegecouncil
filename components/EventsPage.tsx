'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allEvents = [
  {
    title: 'MCC General Meeting',
    date: 'Friday, December 13, 2024',
    time: '5:00 PM - 6:30 PM',
    location: 'Muir College Room 201',
    description: 'Join us for our bi-weekly general meeting to discuss upcoming initiatives and vote on funding requests.',
    tag: 'Council Meeting',
    tagColor: 'green' as const,
    category: 'meeting',
    month: 'december',
  },
  {
    title: 'Winter Wonderland Social',
    date: 'Tuesday, December 17, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'Muir Quad',
    description: 'Celebrate the end of fall quarter with food, music, and festive activities. Free for all Muir students!',
    tag: 'Social',
    tagColor: 'green' as const,
    category: 'social',
    month: 'december',
  },
  {
    title: 'Leadership Workshop',
    date: 'Monday, January 8, 2025',
    time: '4:00 PM - 5:30 PM',
    location: 'Virtual (Zoom)',
    description: 'Learn about leadership opportunities within MCC and how to get involved in student government.',
    tag: 'Workshop',
    tagColor: 'green' as const,
    category: 'workshop',
    month: 'january',
  },
  {
    title: 'Budget Town Hall',
    date: 'Wednesday, January 15, 2025',
    time: '5:30 PM - 7:00 PM',
    location: 'Muir College Room 201',
    description: 'Have your say in how MCC allocates funds for winter quarter. Open forum for all Muir students.',
    tag: 'Council Meeting',
    tagColor: 'green' as const,
    category: 'meeting',
    month: 'january',
  },
  {
    title: 'Triton Talks: Career Panel',
    date: 'Thursday, January 23, 2025',
    time: '6:00 PM - 7:30 PM',
    location: 'Muir College Room 105',
    description: 'Connect with Muir alumni working in various industries and get career insights and advice.',
    tag: 'Workshop',
    tagColor: 'green' as const,
    category: 'workshop',
    month: 'january',
  },
  {
    title: 'Study Break Treats',
    date: 'Monday, February 3, 2025',
    time: '8:00 PM - 10:00 PM',
    location: 'Muir Quad',
    description: 'Take a break from midterms with free snacks, music, and stress-relief activities.',
    tag: 'Social',
    tagColor: 'green' as const,
    category: 'social',
    month: 'february',
  },
  {
    title: 'MCC General Meeting',
    date: 'Friday, February 7, 2025',
    time: '5:00 PM - 6:30 PM',
    location: 'Muir College Room 201',
    description: 'Regular meeting to discuss ongoing projects and new funding requests for student organizations.',
    tag: 'Council Meeting',
    tagColor: 'green' as const,
    category: 'meeting',
    month: 'february',
  },
  {
    title: 'Sustainability Fair',
    date: 'Saturday, February 15, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'Muir Quad',
    description: 'Learn about sustainability initiatives on campus and how you can get involved in environmental advocacy.',
    tag: 'Social',
    tagColor: 'green' as const,
    category: 'social',
    month: 'february',
  },
  {
    title: 'Volunteer Day: Beach Cleanup',
    date: 'Sunday, February 23, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'La Jolla Shores',
    description: 'Join MCC for a community service day cleaning up our local beaches. Transportation provided.',
    tag: 'Social',
    tagColor: 'green' as const,
    category: 'social',
    month: 'february',
  },
];

export function EventsPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  const filteredEvents = allEvents.filter((event) => {
    const matchesType = filterType === 'all' || event.category === filterType;
    const matchesDate = filterDate === 'all' || event.month === filterDate;
    return matchesType && matchesDate;
  });

  const clearFilters = () => {
    setFilterType('all');
    setFilterDate('all');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#2C5530] via-[#1A3A1F] to-[#0F2415] text-white py-16 relative overflow-hidden">
        {/* Rolling hills */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">Events</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl">
            Explore all upcoming Muir College Council events, meetings, and community gatherings.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-[#E8E6E1] sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-[#2C5530]" />
              <span className="font-medium text-gray-700">Filter Events:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px] border-[#7CB342]/30 focus:ring-[#7CB342]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="meeting">Council Meeting</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-full sm:w-[180px] border-[#7CB342]/30 focus:ring-[#7CB342]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="december">December 2024</SelectItem>
                  <SelectItem value="january">January 2025</SelectItem>
                  <SelectItem value="february">February 2025</SelectItem>
                </SelectContent>
              </Select>

              {(filterType !== 'all' || filterDate !== 'all') && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No events found matching your filters.</p>
              <Button
                onClick={clearFilters}
                className="bg-[#5A6F5C] text-white hover:bg-[#3F4F41]"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
