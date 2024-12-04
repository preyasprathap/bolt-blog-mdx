import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '@/lib/mdx';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { generateStaticParams } from './generateStaticParams';

export { generateStaticParams };

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { theme: 'github-dark' }],
    ],
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl py-12">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>
      {/* <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={post.content} options={options} />
      </div> */}
    </article>
  );
}