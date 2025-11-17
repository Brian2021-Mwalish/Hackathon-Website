import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      title: "BITSA Website Hackathon",
      date: "5th - 18th November 2025",
      time: "17:00 - 17:00",
      location: "BITSA Lab",
      description: "Build the official BITSA website and compete for KES 7,000 in prizes. Registration deadline: 5th November 2025.",
      status: "Upcoming",
      category: "Hackathon",
    },
    {
      title: "Web Development Workshop",
      date: "20th November 2025",
      time: "14:00 - 17:00",
      location: "Computer Lab 2",
      description: "Learn modern web development techniques with React, Node.js, and deployment strategies.",
      status: "Upcoming",
      category: "Workshop",
    },
    {
      title: "Tech Talk: AI in Industry",
      date: "25th November 2025",
      time: "16:00 - 18:00",
      location: "Main Hall",
      description: "Industry experts discuss the impact of AI and machine learning in modern software development.",
      status: "Upcoming",
      category: "Talk",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-accent">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for exciting workshops, hackathons, and networking opportunities designed to enhance your skills and connect with fellow tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {event.category}
                  </Badge>
                  <Badge variant="outline">{event.status}</Badge>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={16} className="mr-2 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-2 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={16} className="mr-2 text-primary" />
                  {event.location}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
