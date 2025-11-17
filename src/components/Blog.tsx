import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: number;
  author_name: string;
  author_email: string;
  category: string;
  tags: string;
  read_time: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blogs/posts/');
        if (response.ok) {
          const data = await response.json();
          // Filter only published posts
          const publishedPosts = data.filter((post: BlogPost) => post.is_published);
          setPosts(publishedPosts);
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest from <span className="text-primary">Our Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with tutorials, tech insights, and stories from the BITSA community.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all border-border group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.read_time} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User size={14} className="mr-2" />
                    {post.author_name}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-2" />
                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group/btn">
                    Read Article
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
