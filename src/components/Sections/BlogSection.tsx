import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getMediumBlogs, type MediumPost } from '@/services/medium';

export default function BlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    getMediumBlogs().then(setPosts);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-amber-50/20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Centered Heading Intro Banner */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3 flex flex-col items-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Vivaldi Insights
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            The Company Blog
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto pb-2">
            Stay updated with our latest news, laboratory insights, and community stories.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm"
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>

        {/* Dynamic Card Container Array */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {posts.slice(0, 3).map((post, i) => (
            <a
              key={post.guid || i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
            >
              {/* LANDSCAPE DESIGN: Set back to wide aspect-video, snapping tightly to all borders */}
              <div className="relative overflow-hidden aspect-video bg-gray-50 border-b border-gray-100">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Interactive slider panel */}
                <div className="absolute inset-0 bg-green-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-full bg-white text-green-800 flex items-center justify-center shadow-md">
                    <BookOpen size={16} />
                  </div>
                </div>
              </div>

              {/* Data Text Field */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors tracking-tight leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
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

      </div>
    </section>
  );
}
