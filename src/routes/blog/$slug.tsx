import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getMediumBlogs } from '@/services/medium';

export const Route = createFileRoute('/blog/$slug')({ component: BlogPost });

// eslint-disable-next-line react-refresh/only-export-components
function BlogPost() {
  const { slug } = Route.useParams();
  const [fullUrl, setFullUrl] = useState<string | null>(null);

  useEffect(() => {
    // We fetch the list to find the full canonical link for this slug
    getMediumBlogs().then(posts => {
      const post = posts.find(p => p.slug === slug);
      if (post) setFullUrl(post.link);
    });
  }, [slug]);

  if (!fullUrl) return <div className="p-20 text-center">Loading article...</div>;

  return (
    <div className="bg-brand-cream min-h-screen py-20">
      <div className="container-custom max-w-4xl mx-auto bg-white p-8 shadow-sm">
        <iframe
          src={fullUrl}
          className="w-full h-[80vh] border-none"
          title="Medium Article"
        />
      </div>
    </div>
  );
}
