import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import { ArrowRight, Newspaper } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="container mx-auto py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">Welcome to My Blog</h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Exploring ideas, sharing insights, and documenting my journey through technology and development.
        </p>
        <Button asChild size="lg">
          <Link href="/blog">
            <Newspaper className="mr-2 h-5 w-5" />
            Read the Blog
          </Link>
        </Button>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}