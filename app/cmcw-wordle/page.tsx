import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CMCWWordleClient } from './CMCWWordleClient';

export const metadata: Metadata = {
  title: 'CMCW Wordle | Muir College Council',
  description: 'A Celebrating Muir College Week Wordle: one word per day from March 2–6, 2026.',
};

export default function CmcwWordlePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="min-h-[70vh]">
        <CMCWWordleClient />
      </main>
      <Footer />
    </div>
  );
}

