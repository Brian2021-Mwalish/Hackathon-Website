import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  const posts = [
    {
      title: "Hackathon Success Tips: From Planning to Winning",
      excerpt: "Learn the strategies that winning teams use to excel in hackathons, from ideation to final presentation.",
      author: "Alpha Chamba",
      date: "October 28, 2025",
      category: "Tips & Tricks",
      readTime: "5 min read",
    },
    {
      title: "Getting Started with React and TypeScript",
      excerpt: "A comprehensive guide for beginners looking to build modern web applications with React and TypeScript.",
      author: "Gloria Jebet",
      date: "October 25, 2025",
      category: "Tutorial",
      readTime: "8 min read",
    },
    {
      title: "Building Responsive Websites with Tailwind CSS",
      excerpt: "Discover how to create beautiful, responsive designs quickly using Tailwind CSS utility classes.",
      author: "BITSA Team",
      date: "October 20, 2025",
      category: "Web Design",
      readTime: "6 min read",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-xl transition-all border-border group">
              <CardHeader>
                <div className="text-sm text-accent font-semibold mb-2">
                  {post.category}
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
                  {post.author}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
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
