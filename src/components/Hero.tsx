import { ArrowRight, Users, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              Bachelor of Information Technology Students Association
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BITSA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Empowering IT students through innovation, collaboration, and excellence. Join our community of future tech leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/about">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary hover:opacity-90 transition-opacity"
              >
                Learn More
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/events">
              <Button
                size="lg"
                variant="outline"
              >
                View Events
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8">
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Active Community</h3>
              <p className="text-muted-foreground text-sm">
                Connect with fellow BIT students and grow together
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Calendar className="text-accent" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Events & Workshops</h3>
              <p className="text-muted-foreground text-sm">
                Regular hackathons, workshops, and tech meetups
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Learning Resources</h3>
              <p className="text-muted-foreground text-sm">
                Access tutorials, articles, and study materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
