import { Link } from '@/lib/navigation';
import { createPageMetadata } from '@/lib/seo';
import { BLOG_PAGE_SIZE, blogExcerpt, fetchBlogPosts, formatBlogDate } from '@/lib/blog';

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: 'ব্লগ',
  description:
    'বিয়ে, পরিবার ও জীবনসঙ্গী খোঁজা নিয়ে বিয়ে বাংলাদেশি ম্যাট্রিমনির পরামর্শ, গাইড ও লেখা পড়ুন।',
  path: '/blog',
});

const pageLinkClass =
  'inline-flex min-h-11 items-center rounded-xl border border-brand-900 px-5 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2';

export default async function BlogListPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const { posts, total } = await fetchBlogPosts(page).catch((error) => {
    console.error('Blog list fetch failed', error);
    return { posts: [], total: 0 };
  });
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">ব্লগ</h1>
          <p className="mt-3 text-base leading-7 text-gray-600">
            বিয়ে, পরিবার ও জীবনসঙ্গী খোঁজা নিয়ে আমাদের পরামর্শ ও লেখা
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">এখনো কোনো লেখা প্রকাশিত হয়নি।</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/blog/${encodeURIComponent(post.slug)}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 motion-reduce:transform-none"
                >
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand-900 to-[#3DBEC2]" aria-hidden="true" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    {post.published_at && (
                      <time dateTime={post.published_at} className="text-xs font-medium text-gray-500">
                        {formatBlogDate(post.published_at)}
                      </time>
                    )}
                    <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-brand-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{blogExcerpt(post)}</p>
                    <span className="mt-auto pt-4 text-sm font-bold text-brand-900">পড়ুন →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-4" aria-label="ব্লগ পেজ">
            {page > 1 && (
              <Link to={page === 2 ? '/blog' : `/blog?page=${page - 1}`} className={pageLinkClass}>
                ← আগের পেজ
              </Link>
            )}
            <span className="text-sm text-gray-600">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link to={`/blog?page=${page + 1}`} className={pageLinkClass}>
                পরের পেজ →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
