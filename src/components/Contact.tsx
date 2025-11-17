import { Mail, Phone, MapPin, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const leadership = [
    {
      name: "Alpha Chamba",
      role: "President",
      phone: "0708898899",
      icon: User,
    },
    {
      name: "Gloria Jebet",
      role: "Vice President",
      phone: "0725486687",
      icon: User,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to join BITSA? Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                Official Email
              </CardTitle>
              <CardDescription>Send us an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:bitsaclub@ueab.ac.ke"
                className="text-lg font-semibold text-primary hover:underline"
              >
                bitsaclub@ueab.ac.ke
              </a>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="text-accent" size={20} />
                </div>
                Location
              </CardTitle>
              <CardDescription>Find us on campus</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">BITSA Lab</p>
              <p className="text-muted-foreground">University of Eastern Africa, Baraton</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((leader, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="text-white" size={28} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{leader.name}</CardTitle>
                      <CardDescription className="text-base">{leader.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={18} className="text-primary" />
                    <a
                      href={`tel:${leader.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {leader.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
