export interface MediumPost {
  guid: string;
  link: string;
  thumbnail: string;
  title: string;
  pubDate: string;
  description: string;
  slug: string;
}

export async function getMediumBlogs(): Promise<MediumPost[]> {
  const rssUrl = 'https://medium.com/feed/@vivaldifoodslimited';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 'ok') return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => ({
      guid: item.guid,
      link: item.link,
      title: item.title,
      pubDate: item.pubDate,
      description: item.description.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
      // Priority: Medium's provided thumbnail, then enclosure, then regex match from content
      thumbnail: item.thumbnail ||
                 item.enclosure?.link ||
                 item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
                 '',
      slug: item.link.split('/').pop()?.split('?')[0] || '',
    }));
  } catch {
    return [];
  }
}
