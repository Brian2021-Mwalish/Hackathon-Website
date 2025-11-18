import { Code, Lightbulb, Users2, Trophy, Target, Heart, Sparkles, Rocket, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Master cutting-edge technologies through hands-on projects and continuous learning in a supportive environment.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Foster creative thinking and groundbreaking solutions that push the boundaries of technology.",
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Users2,
      title: "Collaborative Spirit",
      description: "Build lasting connections through teamwork, mentorship, and shared learning experiences.",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200"
    },
    {
      icon: Trophy,
      title: "Drive to Achieve",
      description: "Excel in competitions, hackathons, and real-world projects that showcase your talents.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200"
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members", icon: Users2 },
    { number: "50+", label: "Events Yearly", icon: Calendar },
    { number: "100+", label: "Projects", icon: Code },
    { number: "4.9/5", label: "Member Rating", icon: Star }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Our Community
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Shaping the Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Tech Talent
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            BITSA is where passionate IT students transform into industry-ready professionals through 
            <span className="font-semibold text-blue-600"> collaborative innovation</span>, 
            <span className="font-semibold text-purple-600"> hands-on learning</span>, and 
            <span className="font-semibold text-indigo-600"> meaningful connections</span>.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-3xl ${value.bgColor} border-2 ${value.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-1 scale-105"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                <Target className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-4xl font-bold mb-6">Our Mission & Vision</h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-6 h-6 text-cyan-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">Our Mission</h4>
                      <p className="text-blue-100 leading-relaxed">
                        To create an inclusive platform where BIT students develop practical skills, 
                        foster innovation, and build career-defining connections in the tech industry.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">Our Vision</h4>
                      <p className="text-blue-100 leading-relaxed">
                        To be the leading student association that transforms IT education into 
                        real-world success stories and shapes the next generation of tech leaders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-blue-200">Career Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-sm text-blue-200">Industry Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-sm text-blue-200">Student Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our community of innovators?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Join BITSA Today
              </button>
            </Link>
            <Link to="/events">
              <button className="px-8 py-4 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold transition-all duration-300">
                Learn More
              </button>
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

export default About;