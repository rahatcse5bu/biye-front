import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/lib/navigation';
import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbSchema,
  createPageMetadata,
  toJsonLd,
} from '@/lib/seo';
import {
  blogExcerpt,
  blogTitle,
  canonicalizeLinks,
  decodeSlug,
  fetchBlogPost,
  fetchBlogPosts,
  formatBlogDate,
  isHtmlContent,
  parseBlogContent,
} from '@/lib/blog';

export const revalidate = 60;

const getPost = cache((slug) => fetchBlogPost(decodeSlug(slug)));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: 'লেখা পাওয়া যায়নি', robots: { index: false, follow: false } };
  }

  // TODO: admin SEO fields win; title and excerpt are the fallback.
  const title = blogTitle(post);
  const metadata = createPageMetadata({
    title: title.absolute ?? title,
    description: post.seo_description || blogExcerpt(post),
    keywords: post.tags,
    path: `/blog/${encodeURIComponent(post.slug)}`,
    ...(post.cover_image && { images: [{ url: post.cover_image, alt: post.title }] }),
  });
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updatedAt,
      ...(post.tags?.length && { tags: post.tags }),
    },
  };
}

const renderBlock = (block, index) => {
  if (block.type === 'h2') {
    return (
      <h2 key={index} className="mt-10 text-2xl font-bold text-gray-900">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul key={index} className="mt-5 list-disc space-y-2 pl-6">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={index} className="mt-5">
      {block.lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line}
        </span>
      ))}
    </p>
  );
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // TODO: every post links to a few others so no post is reachable from the sitemap alone.
  const { posts: latest } = await fetchBlogPosts(1, 4).catch(() => ({ posts: [] }));
  const morePosts = latest.filter(({ slug: other }) => other !== post.slug).slice(0, 3);

  const path = `/blog/${encodeURIComponent(post.slug)}`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'হোম', path: '/' },
    { name: 'ব্লগ', path: '/blog' },
    { name: post.title, path },
  ]);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo_description || blogExcerpt(post),
    ...(post.tags?.length && { keywords: post.tags.join(', ') }),
    datePublished: post.published_at,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(post.cover_image && { image: [post.cover_image] }),
    author: { '@type': post.author ? 'Person' : 'Organization', name: post.author || SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <article className="bg-white py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleSchema) }} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          to="/blog"
          className="text-sm font-bold text-brand-900 transition-colors hover:text-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
        >
          ← সকল লেখা
        </Link>

        <header className="mt-4">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-gray-500">
            {[post.author, formatBlogDate(post.published_at)].filter(Boolean).join(' · ')}
          </p>
          {post.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="ট্যাগ">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-brand-900/10 px-3 py-1 text-xs font-semibold text-brand-900">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        )}

        {isHtmlContent(post.content) ? (
          <div className="blog-content mt-6" dangerouslySetInnerHTML={{ __html: canonicalizeLinks(post.content) }} />
        ) : (
          <div className="mt-6 text-lg leading-8 text-gray-700">
            {parseBlogContent(post.content).map(renderBlock)}
          </div>
        )}

        {morePosts.length > 0 && (
          <nav className="mt-14 border-t border-gray-200 pt-8" aria-labelledby="more-posts-heading">
            <h2 id="more-posts-heading" className="text-xl font-bold text-gray-900">
              আরও পড়ুন
            </h2>
            <ul className="mt-4 space-y-3">
              {morePosts.map((other) => (
                <li key={other._id}>
                  <Link
                    to={`/blog/${encodeURIComponent(other.slug)}`}
                    className="font-semibold text-brand-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
