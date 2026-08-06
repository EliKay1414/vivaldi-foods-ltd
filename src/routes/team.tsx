/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import TeamSection from '@/components/Sections/TeamSection';
import { PageBanner } from '@/components/ui/PageBanner';

import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/team')({
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      {/* TYPE-SAFE CLIENT INJECTION: Hydrates dynamic page meta configuration safely without route config properties */}
      <Seo
        title="Our Leadership Team & Management | Vivaldi Foods Ltd"
        description="Meet the dedicated management team, agribusiness specialists, and food safety experts leading Vivaldi Foods Ltd in delivering pure, natural honey products across Ghana."
      />

      <PageBanner
        title="Our Team"
        subtitle="Meet the dedicated professionals leading Vivaldi Foods Ltd."
      />
      <TeamSection />
    </div>
  );
}
