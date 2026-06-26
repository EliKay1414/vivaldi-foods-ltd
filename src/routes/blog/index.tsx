/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Calendar, Loader2 } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { getMediumBlogs, type MediumPost } from '@/services/medium';

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMediumBlogs().then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-brand-cream min-h-screen">
      <PageBanner
        title="Blog"
        subtitle="Read our latest company updates and stories from Medium."
      />

      <section className="py-16">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-75">
              <Loader2 className="animate-spin text-brand-green mb-4" size={36} />
              <p className="font-bold text-brand-brown">Read more on Vivaldi's latest insights...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a
                  key={post.guid}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-brand-brown/10 flex flex-col hover:shadow-xl transition-all"
                >
                  <div className="h-56 overflow-hidden bg-gray-100">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">

                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-green mb-3">
                      <Calendar size={14} />
                      {new Date(post.pubDate).toLocaleDateString()}
                    </div>
                    <h3 className="font-bold text-xl text-brand-brown mb-3 group-hover:text-brand-green transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">{post.description}</p>
                    <span className="mt-auto text-xs font-bold uppercase tracking-widest text-brand-green">
                      Read on Medium
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
