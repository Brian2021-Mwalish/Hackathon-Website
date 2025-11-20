import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Zap, Users, TrendingUp, CheckCircle2, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your data is protected with 256-bit encryption and multi-factor authentication"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process transactions in milliseconds with our optimized infrastructure"
  },
  {
    icon: Users,
    title: "Trusted by 10K+",
    description: "Join thousands of satisfied users managing their digital assets securely"
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track your portfolio performance with comprehensive insights and reports"
  }
];

const benefits = [
  "Secure two-factor authentication",
  "24/7 customer support",
  "Real-time transaction monitoring",
  "Multi-currency support",
  "Advanced fraud protection",
  "Instant notifications"
];

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual authentication logic with Lovable Cloud
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in production, validate against real backend
      if (data.email && data.password.length >= 6) {
        navigate("/");
      } else {
        setError("Invalid email or password. Please check your credentials and try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-accent p-12 text-primary-foreground flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <span className="text-2xl font-bold text-white">BITSA</span>
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Welcome to the Future of Digital Finance
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Secure, fast, and reliable platform for all your digital asset needs
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <feature.icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm text-primary-foreground/80">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$500M+</div>
              <div className="text-sm text-primary-foreground/80">Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-primary-foreground/80">Uptime</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-sm text-primary-foreground/70">
            © 2024 BITSA. All rights reserved. | Enterprise-grade security for your peace of mind.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BITSA
            </span>
          </div>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 h-11 ${errors.email ? "border-destructive" : ""}`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`pl-10 h-11 ${errors.password ? "border-destructive" : ""}`}
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Sign In
                </Button>
              </form>

              {/* Benefits List */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                  Why Choose BITSA?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Create one now
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-xs text-muted-foreground mb-2">Trusted by industry leaders</p>
                <div className="flex items-center justify-center space-x-4 text-muted-foreground/50">
                  <Shield className="w-5 h-5" />
                  <div className="text-xs font-semibold">SSL Secured</div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="text-xs font-semibold">GDPR Compliant</div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="text-xs font-semibold">SOC 2 Certified</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
