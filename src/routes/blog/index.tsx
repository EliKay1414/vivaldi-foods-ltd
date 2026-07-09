/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Calendar, Loader2, BookOpen, ArrowRight } from 'lucide-react';
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
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Blog Insights"
        subtitle="Read our latest updates, laboratory standards, and stories directly from Medium."
      />

      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-75 space-y-3">
            <Loader2 className="animate-spin text-green-700" size={32} />
            <p className="font-bold text-gray-900 text-sm">Synchronizing with Medium channels...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center items-stretch">
            {posts.map((post, i) => (
              <a
                key={post.guid || i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
              >
                {/* LANDSCAPE DESIGN: aspect-video layout ensures clean proportions for horizontal photography */}
                <div className="relative overflow-hidden aspect-video bg-gray-50 border-b border-gray-100">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                      <BookOpen size={24} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-green-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-full bg-white text-green-800 flex items-center justify-center shadow-md">
                      <BookOpen size={16} />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                      <Calendar size={12} className="shrink-0" />
                      <span>{new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 group-hover:text-green-700 transition-colors tracking-tight leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-50 text-[11px] font-bold uppercase tracking-wider text-green-700">
                    <span>Read on Medium</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
