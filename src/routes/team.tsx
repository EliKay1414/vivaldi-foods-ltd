/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import TeamSection from '@/components/Sections/TeamSection'; // Kept your original import path intact
import { PageBanner } from '@/components/ui/PageBanner';

export const Route = createFileRoute('/team')({
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Our Team"
        subtitle="Meet the dedicated professionals leading Vivaldi Foods Ltd."
      />
      <TeamSection />
    </div>
  );
}
