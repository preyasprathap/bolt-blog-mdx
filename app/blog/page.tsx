import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import { SearchInput } from '@/components/SearchInput';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { POSTS_PER_PAGE } from '@/lib/utils';

export default function BlogPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string; category?: string; tag?: string };
}) {
  const search = searchParams.search?.toLowerCase() || '';
  const category = searchParams.category;
  const tag = searchParams.tag;
  const currentPage = Number(searchParams.page) || 1;
  
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = search
      ? post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
      : true;
    
    const matchesCategory = category
      ? post.category === category
      : true;
    
    const matchesTag = tag
      ? post.tags.includes(tag)
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="mt-4">
          <SearchInput />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length > POSTS_PER_PAGE && (
            <div className="mt-8">
              <Pagination totalPages={totalPages} />
            </div>
          )}

          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground">
              No posts found. Try different search terms or filters.
            </p>
          )}
        </div>

        <div className="mt-8 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}