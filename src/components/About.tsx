import { Code, Lightbulb, Users2, Trophy } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description: "We strive for mastery in coding and technology, pushing boundaries and embracing innovation.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Encouraging creative problem-solving and out-of-the-box thinking in every project.",
    },
    {
      icon: Users2,
      title: "Collaboration",
      description: "Building a supportive community where students learn and grow together.",
    },
    {
      icon: Trophy,
      title: "Achievement",
      description: "Celebrating success through competitions, hackathons, and recognition programs.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">BITSA</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Bachelor of Information Technology Students Association (BITSA) is a dynamic community 
            dedicated to empowering IT students through hands-on experience, collaborative projects, 
            and professional development opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-lg opacity-95">
              To provide a platform for BIT students to develop practical skills, foster innovation, 
              and build meaningful connections that prepare them for successful careers in technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
