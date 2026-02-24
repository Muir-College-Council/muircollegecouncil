'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ActionCard } from '@/components/ActionCard';
import { EventCard } from '@/components/EventCard';
import { MemberCard } from '@/components/MemberCard';
import { Footer } from '@/components/Footer';
import {
  DollarSign, FileText, Calendar, Users,
  Sparkles, Target, MessageCircle, Trees, Sprout, ChevronRight, ChevronLeft, Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const actionCards = [
  {
    icon: DollarSign,
    title: 'Apply for Funding',
    description: 'Submit your funding request for student organization events and initiatives.',
    href: '#funding',
    iconColor: '#2C5530',
    iconBgColor: '#E8F5E1',
  },
  {
    icon: FileText,
    title: 'View Agendas & Minutes',
    description: 'Access meeting agendas, minutes, and council documents.',
    href: '#agendas',
    iconColor: '#7CB342',
    iconBgColor: '#E8F5E1',
  },
  {
    icon: Calendar,
    title: 'Upcoming Events',
    description: 'Browse upcoming MCC events, meetings, and community gatherings.',
    href: '#events',
    iconColor: '#2C5530',
    iconBgColor: '#E8F5E1',
  },
  {
    icon: Users,
    title: 'Office Hours & Contact',
    description: 'Connect with council members during office hours or reach out anytime.',
    href: '#contact',
    iconColor: '#7CB342',
    iconBgColor: '#E8F5E1',
  },
];

const events = [
  {
    title: 'MCC General Meeting',
    date: 'Friday, December 13, 2024',
    time: '5:00 PM - 6:30 PM',
    location: 'Muir College Room 201',
    description: 'Join us for our bi-weekly general meeting to discuss upcoming initiatives and vote on funding requests.',
    tag: 'Council Meeting',
    tagColor: 'green' as const,
  },
  {
    title: 'Winter Wonderland Social',
    date: 'Tuesday, December 17, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'Muir Quad',
    description: 'Celebrate the end of fall quarter with food, music, and festive activities. Free for all Muir students!',
    tag: 'Social',
    tagColor: 'green' as const,
  },
  {
    title: 'Leadership Workshop',
    date: 'Monday, January 8, 2025',
    time: '4:00 PM - 5:30 PM',
    location: 'Virtual (Zoom)',
    description: 'Learn about leadership opportunities within MCC and how to get involved in student government.',
    tag: 'Workshop',
    tagColor: 'green' as const,
  },
];

const councilMembers = [
  { name: 'Luke Pederson', role: 'President' },
  { name: 'Vincent Lopez', role: 'VP of Internal Affairs' },
  { name: 'Kaylie Hough', role: 'VP of External Affairs' },
  { name: 'Trung Nguyen', role: 'VP of Finance' },
  { name: 'Michael Pieniaszek', role: 'VP of Administrative Affairs' },
  { name: 'Saniya Harlalka', role: 'VP of Programming' },
  { name: 'Julian Gonzales', role: 'VP of Student Orgs' },
  { name: 'Alexander Testman', role: 'VP of Marketing' },
  { name: 'Rachel Alarcon & Katie E. Johnson', role: 'Muir College AS Senators' },
  { name: 'Jay Gima', role: 'Student Fee Advisory Committee (SFAC)' },
  { name: 'Noa Kliger', role: 'Recreation Facilities Advisory Board (RFAB)' },
  { name: 'Carter Imrie', role: 'University Centers Advisory Board (UCAB)' },
  { name: 'Sika Jain', role: 'AS Concerts & Events' },
  { name: 'Sam Propst', role: 'Library Student Advisory Council (LSAC)' },
  { name: 'Josiah Hernandez', role: 'Housing Dining Hospitality Committee (HDH)' },
  { name: 'Jefferson Umanzor', role: 'Webmaster' },
  { name: 'Ivy Nguyen', role: 'Historian' },
  { name: 'Jeffrey Nguyen', role: 'Celebrating Muir College Week (CMCW) Chair' },
  { name: 'Koi Cornejo', role: 'Muirstock Chair' },
  { name: 'Kelly Hernandez', role: 'Student at Large Representative' },
  { name: 'Arth Mittal', role: 'International Representative' },
  { name: 'Ella Rust', role: 'Out-of-State Representative' },
  { name: 'Luis Martinez', role: 'Commuter Student Representative' },
  { name: 'Yajush Jayakrishnan', role: 'First Year Representative' },
  { name: 'Faoa Gatoloai', role: 'First Year First Gen Representative' },
  { name: 'Matthew Merriss', role: 'First Gen Continuing Students Representative' },
  { name: 'Christopher Plaza', role: 'Resident Student Representative' },
  { name: 'Ami Ron', role: 'Overflow Representative' },
  { name: 'Kaitlin Rauh', role: 'Transfer Housing Representative' },
  { name: 'Daniela Cardenas', role: 'Transfer Student Representative' },
  { name: 'Keilani Solis', role: 'OSD Representative' },
  { name: 'Vivian Doan', role: 'Academic Advocate' },
  { name: 'Zainab Subhi', role: 'Basic Needs Advocate' },
  { name: 'Grace Mabee', role: 'Environmental Advocate' },
  { name: 'Sophia Soliman', role: 'Health and Wellness Advocate' },
  { name: 'Gaby Aldana', role: 'Spirit Advocate' },
  { name: 'Jimena Davalos', role: 'Diversity Advocate' },
];

const MEMBERS_PER_PAGE_DESKTOP = 9;
const MEMBERS_PER_PAGE_MOBILE = 6;

function usePerPage() {
  const [perPage, setPerPage] = useState(MEMBERS_PER_PAGE_DESKTOP);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth >= 1024 ? MEMBERS_PER_PAGE_DESKTOP : MEMBERS_PER_PAGE_MOBILE);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return perPage;
}

function MembersCarousel() {
  const [page, setPage] = useState(0);
  const perPage = usePerPage();
  const totalPages = Math.ceil(councilMembers.length / perPage);
  const clampedPage = Math.min(page, totalPages - 1);
  const start = clampedPage * perPage;
  const visible = councilMembers.slice(start, start + perPage);

  return (
    <div className="mb-12">
      <h3 className="text-center text-[#5D4A2F] mb-8">Council Members</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[420px]">
        {visible.map((member, index) => (
          <MemberCard key={start + index} {...member} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={clampedPage === 0}
            className="w-10 h-10 rounded-full border-2 border-[#7CB342] flex items-center justify-center text-[#7CB342] hover:bg-[#7CB342] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === clampedPage ? 'bg-[#7CB342]' : 'bg-gray-300 hover:bg-[#AED581]'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={clampedPage === totalPages - 1}
            className="w-10 h-10 rounded-full border-2 border-[#7CB342] flex items-center justify-center text-[#7CB342] hover:bg-[#7CB342] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Header />

      <Hero />

      {/* Quick Access Section */}
      <section className="py-16 bg-[#FAF7F2] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F5E1] rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5D4B8] rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
              <Sparkles className="text-[#7CB342]" size={24} strokeWidth={2} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
            </div>
            <h2 className="text-[#5D4A2F] mb-4">Quick Access</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with the most common resources and services provided by MCC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card, index) => (
              <ActionCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 bg-gradient-to-b from-white via-[#D4E3D5]/10 to-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#5A6F5C]">
            <path d="M50,10 Q20,30 20,60 Q20,90 50,90 Q50,60 50,10 Z" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 w-24 h-24 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#5A6F5C]">
            <path d="M50,10 Q80,30 80,60 Q80,90 50,90 Q50,60 50,10 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4E3D5] rounded-full mb-4">
              <Sparkles size={18} className="text-[#5A6F5C]" />
              <span className="text-sm font-medium text-[#3F4F41]">Join the Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Connect with fellow Muir students through engaging events, meetings, and workshops designed to enrich your college experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#5A6F5C] text-white hover:bg-[#3F4F41] text-lg px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/events">
                View All Events
                <ChevronRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meetings & Governance Section */}
      <section id="meetings" className="py-16 bg-gradient-to-br from-[#2C5530] to-[#3D6F42] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Leaf className="text-[#AED581]" size={40} />
              </div>
              <h2 className="mb-4">Meetings & Governance</h2>
              <p className="text-green-100">
                MCC holds open meetings every other Friday at 5:00 PM. All Muir students are welcome to attend, observe, and participate.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="agendas" className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-[#AED581] hover:no-underline">
                    Meeting Agendas
                  </AccordionTrigger>
                  <AccordionContent className="text-green-100">
                    <p className="mb-4">
                      View upcoming and past meeting agendas to see what topics will be discussed and decisions made.
                    </p>
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl">
                      View Agendas
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="minutes" className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-[#AED581] hover:no-underline">
                    Meeting Minutes
                  </AccordionTrigger>
                  <AccordionContent className="text-green-100">
                    <p className="mb-4">
                      Access official records of council meetings, including decisions, votes, and discussion summaries.
                    </p>
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl">
                      View Minutes
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="constitution" className="border-white/20 border-b-0">
                  <AccordionTrigger className="text-white hover:text-[#AED581] hover:no-underline">
                    Constitution & Bylaws
                  </AccordionTrigger>
                  <AccordionContent className="text-green-100">
                    <p className="mb-4">
                      Read the governing documents that outline MCC&#39;s structure, responsibilities, and procedures.
                    </p>
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-xl" asChild>
                      <a href="https://docs.google.com/document/d/1yW7dROyhdATU06eI6A5ebajDA1D8zssMhTnNUco4FDs/edit?tab=t.0#heading=h.qy6f6ljkjb7h" target="_blank" rel="noopener noreferrer">View Documents</a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-20 bg-[#F9F6F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-40 h-40">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#5A6F5C]">
              <path d="M50,10 Q20,30 20,60 Q20,90 50,90 Q50,60 50,10 Z" />
            </svg>
          </div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#5A6F5C]">
              <path d="M50,10 Q20,30 20,60 Q20,90 50,90 Q50,60 50,10 Z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F5E1] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5D4B8] rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
              <div className="w-14 h-14 bg-[#7CB342]/20 rounded-2xl flex items-center justify-center">
                <Trees className="text-[#5A6F5C]" size={28} strokeWidth={2} />
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
            </div>
            <h2 className="text-[#5D4A2F] mb-4">Who We Are</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              The Muir College Council is the official student government body representing all undergraduate students in Muir College at UC San Diego. We advocate for student interests, allocate funding to student organizations, plan community events, and serve as a bridge between students and college administration.
            </p>
          </div>

          <MembersCarousel />
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#E8F5E1] rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E5D4B8] rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
                <div className="w-14 h-14 bg-[#AED581]/20 rounded-2xl flex items-center justify-center">
                  <Sprout className="text-[#7CB342]" size={28} strokeWidth={2} />
                </div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#8B6F47] to-[#8B6F47]"></div>
              </div>
              <h2 className="text-[#5D4A2F] mb-4">Get Involved</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                There are many ways to get involved with MCC and make a difference in the Muir community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E8F5E1] to-[#D4E3D5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="text-[#2C5530]" size={36} strokeWidth={2} />
                </div>
                <h4 className="text-[#5D4A2F] mb-2">Run for Council</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Applications open in the Fall! Prepare to join MCC and represent your fellow Muir students.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#AED581]/30 to-[#7CB342]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Target className="text-[#2C5530]" size={36} strokeWidth={2} />
                </div>
                <h4 className="text-[#5D4A2F] mb-2">Join a Committee</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Help plan events, manage finances, or work on sustainability initiatives.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E8F5E1] to-[#D4E3D5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <MessageCircle className="text-[#2C5530]" size={36} strokeWidth={2} />
                </div>
                <h4 className="text-[#5D4A2F] mb-2">Share Your Ideas</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Attend meetings, fill out surveys, or reach out directly with your feedback.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-[#2C5530] text-white hover:bg-[#1A3A1F] rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-lg px-10 py-6">
                Roles Open Fall 2026
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
