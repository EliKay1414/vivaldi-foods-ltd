export interface MediumPost {
  guid: string;
  link: string;
  thumbnail: string;
  title: string;
  pubDate: string;
  description: string;
  slug: string;
  categories: string[];
}

export async function getMediumBlogs(): Promise<MediumPost[]> {
  // Enforce the profile username handle vector
  const rssUrl = 'https://medium.com/feed/@vivaldifoodslimited';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    // Dynamic abort protection prevents slow feed rendering from stalling the application layout build
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 } // ISR support hook caches updates safely for one hour
    };

    const response = await fetch(apiUrl, fetchOptions);

    clearTimeout(timeoutId);
    const data = await response.json();

    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => {
      // Clean HTML structural entities to extract a clean string paragraph context
      const rawText = (item.content || item.description || '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Fallback description extractor bounds
      const optimizedDescription = rawText.length > 130
        ? `${rawText.slice(0, 130).trim()}...`
        : rawText || "Read the latest publication entry directly on our official Medium profile network.";

      // ADVANCED ASSET RECOVERY: Medium RSS outputs small standard avatars under 'item.thumbnail'.
      // This pattern parses the actual content string to grab your real post header image.
      const contentImgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      const fallbackImg = contentImgMatch ? contentImgMatch[1] : '';

      const absoluteCoverImage = item.enclosure?.link || fallbackImg || item.thumbnail || '/images/products.png';

      return {
        guid: item.guid || item.link,
        link: item.link,
        title: item.title?.trim() || "Untitled Publication",
        pubDate: item.pubDate,
        description: optimizedDescription,
        thumbnail: absoluteCoverImage,
        slug: item.link.split('/').pop()?.split('?')[0] || Math.random().toString(36).substring(7),
        categories: Array.isArray(item.categories) ? item.categories : ['Agribusiness']
      };
    });
  } catch (error) {
    console.error("Automated Medium RSS Synchronization Failure: ", error);
    return [];
  }
}
