import { createFileRoute } from '@tanstack/react-router';
import TeamSection from '@/components/Sections/TeamSection'; // Adjust path as needed
import { PageBanner } from '@/components/ui/PageBanner';

export const Route = createFileRoute('/team')({
  component: TeamPage,
});

// eslint-disable-next-line react-refresh/only-export-components
function TeamPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <PageBanner
        title="Our Team"
        subtitle="Meet the dedicated professionals leading Vivaldi Foods Ltd."
      />
      <TeamSection />
    </div>
  );
}
