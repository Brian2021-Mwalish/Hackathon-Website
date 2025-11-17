import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Calendar, Image, BarChart3, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !user?.is_staff) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      title: "Total Users",
      value: "156",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Blog Posts",
      value: "24",
      icon: FileText,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Events",
      value: "8",
      icon: Calendar,
      change: "2 upcoming",
      changeType: "neutral" as const,
    },
    {
      title: "Gallery Images",
      value: "67",
      icon: Image,
      change: "+5",
      changeType: "positive" as const,
    },
  ];

  const recentPosts = [
    { title: "React Best Practices 2025", author: "Admin", status: "published", date: "2025-01-15" },
    { title: "Hackathon Preparation Guide", author: "Gloria Jebet", status: "draft", date: "2025-01-14" },
    { title: "AI in Web Development", author: "Admin", status: "published", date: "2025-01-13" },
  ];

  const upcomingEvents = [
    { title: "Web Development Workshop", date: "2025-01-20", attendees: 45 },
    { title: "BITSA Hackathon", date: "2025-01-25", attendees: 78 },
    { title: "Tech Talk: Cloud Computing", date: "2025-02-01", attendees: 32 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage BITSA content and users</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={`text-xs ${
                        stat.changeType === 'positive' ? 'text-green-600' :
                        stat.changeType === 'negative' ? 'text-red-600' :
                        'text-muted-foreground'
                      }`}>
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest content updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">by {post.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.attendees} attendees</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management features coming soon...</p>
                <Button className="mt-4">Add New User</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage blog posts, pages, and media</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Content management features coming soon...</p>
                <div className="flex gap-4 mt-4">
                  <Button>New Blog Post</Button>
                  <Button variant="outline">Upload Media</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Create and manage BITSA events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Event management features coming soon...</p>
                <Button className="mt-4">Create New Event</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system preferences and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
