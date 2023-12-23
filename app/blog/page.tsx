import Link from 'next/link';
import { Suspense } from 'react';
import { getBlogPosts } from 'app/db/blog';
import emojiMapping from 'app/const/emojiMapping';

export const metadata = {
  title: 'Blog',
  description: 'RSS',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
          <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{emojiMapping[post.metadata.category]}</div>
            <div className="w-full callout">
              <div className="mb-2 text-lg font-bold">
                {post.metadata.title.length > 40
                  ? post.metadata.title.slice(0, 40) + "..."
                  : post.metadata.title}
              </div>
              <div className="mb-2">
                {post.metadata.summary.length > 200
                  ? post.metadata.summary.slice(0, 200) + "..."
                  : post.metadata.summary}
              </div>
              <div className="mb-2 text-xs italic">{post.metadata.publishedAt} / {post.metadata.source}</div>
            </div>
          </div>
          </Link>
        ))}
    </section>
  );
}
