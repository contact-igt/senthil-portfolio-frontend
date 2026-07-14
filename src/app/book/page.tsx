import type { Metadata } from 'next';
import UTMTracker from '@/components/ui/UTMTracker';
import { PsychologyMedicalPracticeLanding } from '@/components/sections/PsychologyMedicalPractice';

export const metadata: Metadata = {
  title: 'Psychology of Medical Practice - Dr. Senthil Tamilarasan',
  description:
    'Pre-book Psychology of Medical Practice by Dr. Senthil Tamilarasan, a practical book for doctors, clinic owners, and healthcare leaders.',
};

export default function PsychologyOfMedicalPracticePage() {
  return (
    <main>
      <UTMTracker />
      <PsychologyMedicalPracticeLanding />
    </main>
  );
}
