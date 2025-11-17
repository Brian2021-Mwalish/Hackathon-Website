import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/blogs/posts/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error('Failed to fetch blog post');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Blog post not found.</p>
            <Button onClick={() => navigate('/blog')} className="mt-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <article className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>

          <Card className="border-border">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  {post.read_time} min read
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User size={14} className="mr-2" />
                  {post.author_name}
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="prose prose-lg max-w-none">
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
