import { Mail, Phone, MapPin, User, MessageCircle, Send, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Contact = () => {
  const leadership = [
    {
      name: "Alpha Chamba",
      role: "President",
      phone: "0708898899",
      email: "alpha.chamba@ueab.ac.ke",
      icon: User,
    },
    {
      name: "Gloria Jebet",
      role: "Vice President",
      phone: "0725486687",
      email: "gloria.jebet@ueab.ac.ke",
      icon: User,
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      contact: "bitsaclub@ueab.ac.ke",
      link: "mailto:bitsaclub@ueab.ac.ke",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      description: "Connect with us online",
      contact: "@bitsa_ueab",
      link: "#",
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Find us on campus",
      contact: "BITSA Lab, UEAB",
      link: "#",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Best time to reach us",
      contact: "Mon - Fri: 8AM - 5PM",
      link: "#",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-60 right-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm mb-6">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Let's <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ready to join our tech community? Reach out to us through any channel below. 
            We're here to help you start your journey with BITSA.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card 
                key={index}
                className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
                  <CardDescription className="text-gray-600">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={method.link}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {method.contact}
                    <Send className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leadership Team */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-blue-600">Team</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our dedicated leaders who are here to support your journey in technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => {
              const Icon = leader.icon;
              return (
                <Card 
                  key={index}
                  className="border-2 border-gray-200 hover:border-blue-400 transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm hover:shadow-2xl"
                >
                  <CardHeader>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900">{leader.name}</CardTitle>
                        <CardDescription className="text-lg text-blue-600 font-semibold">
                          {leader.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a
                          href={`tel:${leader.phone}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                        >
                          {leader.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a
                          href={`mailto:${leader.email}`}
                          className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300"
                        >
                          {leader.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join BITSA?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't wait to start your tech journey. Connect with us today and become part of our growing community of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
              </Link>
              <Link to="/register">
                <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Contact;