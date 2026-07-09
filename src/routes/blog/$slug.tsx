/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getMediumBlogs } from '@/services/medium';
import { Loader2, ExternalLink } from 'lucide-react';

export const Route = createFileRoute('/blog/$slug')({ component: BlogPost });

function BlogPost() {
  const { slug } = Route.useParams();
  const [fullUrl, setFullUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMediumBlogs().then(posts => {
      const post = posts.find(p => p.slug === slug);
      if (post) {
        setFullUrl(post.link);
        window.location.replace(post.link);
      } else {
        setError(true);
      }
    }).catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50/20 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-4">The dynamic article path might have changed or expired on Medium.</p>
        <a href="/blog" className="text-xs font-bold text-green-700 bg-green-50 px-4 py-2 rounded-xl">Return to Directory</a>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/20 min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <Loader2 className="animate-spin text-green-700 mx-auto" size={32} />
        <p className="font-bold text-gray-900 text-sm">Redirecting to our official Medium channel...</p>
        {fullUrl && (
          <a
            href={fullUrl}
            className="inline-flex items-center gap-1.5 text-xs text-green-700 underline font-medium pt-2"
          >
            Click here if not redirected automatically <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}
