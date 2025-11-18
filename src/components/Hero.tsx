import { useState, useEffect } from "react";
import { ArrowRight, Users, Calendar, BookOpen, Star, TrendingUp, Target, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "BITSA Community Event",
      title: "Thriving Tech Community",
      description: "Students collaborating on innovative projects"
    },
    {
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      alt: "Workshop Session",
      title: "Hands-On Learning",
      description: "Interactive workshops and coding sessions"
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Hackathon Event",
      title: "Innovation Challenges",
      description: "Students competing in exciting hackathons"
    },
    {
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Networking Event",
      title: "Professional Networking",
      description: "Connecting students with industry leaders"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Top Section - Main Heading and Stats */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm mb-8">
            <div className="flex gap-1">
              {[1, 2, 3].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              #1 IT Student Association
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              BITSA
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl text-gray-800 font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Where <span className="font-semibold text-blue-600">Future Tech Leaders</span>{" "}
            Connect, Learn, and <span className="font-semibold text-purple-600">Innovate Together</span>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600 font-semibold">Active Members</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-sm text-gray-600 font-semibold">Annual Events</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">100+</div>
              <div className="text-sm text-gray-600 font-semibold">Projects</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm text-gray-600 font-semibold">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Middle Section - Slideshow and Content Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Content - Slideshow */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90">{slide.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6 text-white rotate-180" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Your Gateway to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Excellence
                </span>
              </h2>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                At BITSA, we're committed to transforming IT education into real-world success. 
                Our platform bridges the gap between academic learning and industry demands, 
                providing you with the tools, connections, and opportunities to thrive in the 
                digital landscape.
              </p>
            </div>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Fast-Track Learning</div>
                  <div className="text-sm text-gray-600">Accelerated skill development</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-purple-300 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Industry Ready</div>
                  <div className="text-sm text-gray-600">Career-focused training</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Peer Network</div>
                  <div className="text-sm text-gray-600">Collaborative community</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-green-300 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Global Impact</div>
                  <div className="text-sm text-gray-600">Real-world projects</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/register" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg py-6"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3" size={20} />
                </Button>
              </Link>
              <Link to="/about" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-700 bg-white/80 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300 font-semibold text-lg py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Detailed Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaborative Learning Ecosystem</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Join a dynamic network of passionate IT students, industry experts, and alumni mentors. 
              Experience peer-to-peer learning, code reviews, and project collaborations that accelerate 
              your growth and expand your professional network.
            </p>
            <div className="flex items-center text-blue-600 font-semibold">
              <span>Explore Community</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm border border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Calendar className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation-Driven Events</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              From hackathons and coding competitions to industry workshops and tech talks, our events 
              are designed to challenge your skills, spark creativity, and connect you with cutting-edge 
              technologies and industry trends.
            </p>
            <Link to="/events" className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              <span>View Events</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm border border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Resource Hub</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Access our curated library of tutorials, project guides, interview prep materials, and 
              industry insights. Continuously updated content ensures you stay ahead in the rapidly 
              evolving world of information technology.
            </p>
            <Link to="/blog" className="flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              <span>Browse Resources</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
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

export default Hero;