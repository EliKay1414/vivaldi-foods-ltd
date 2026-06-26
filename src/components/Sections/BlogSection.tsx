import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getMediumBlogs, type MediumPost } from '@/services/medium';

// Mapping titles to local assets
const imageMap: Record<string, string> = {
  "Ghana Standards Authority": "/src/assets/blogs/gsa.jpeg",
  "Strengthening Research Partnerships": "/src/assets/blogs/cocoa-board.jpeg",
  "Vivaldi Foods at the Summit": "/src/assets/blogs/year-end-summit.jpeg",
  "Strategic Partnerships": "/src/assets/blogs/reginal-minister.jpeg",
  "Vivaldi End of Year Summit": "/src/assets/blogs/year-end-summit.jpeg",
};

export default function BlogSection() {
  const [posts, setPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    getMediumBlogs().then(setPosts);
  }, []);

  return (
    <section className="py-20 bg-brand-cream">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h2 className="text-brand-brown text-4xl font-bold mb-4">Vivaldi Insights</h2>
            <p className="text-brand-brown/70 max-w-lg">
              Stay updated with our latest news and community stories.
            </p>
          </div>
          <Link to="/blog" className="bg-brand-brown text-white px-8 py-4 font-bold hover:bg-brand-green transition-colors flex items-center gap-2">
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-brand-brown/10 flex flex-col hover:shadow-xl transition-all"
            >
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  src={imageMap[post.title] || post.thumbnail || "/src/assets/blogs/year-end-summit.jpeg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-brand-brown mb-2">{post.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Read on Medium</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
