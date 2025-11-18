import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileText, Calendar, Image, BarChart3, Settings, UserPlus, Ban, CheckCircle, Trash2, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  uploaded_by: number;
  uploaded_by_name: string;
  uploaded_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: number;
  author_name: string;
  author_email: string;
  category: string;
  tags: string;
  read_time: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    image: null as File | null
  });
  const [editPhoto, setEditPhoto] = useState({
    title: '',
    description: '',
    image: null as File | null
  });
  const [addBlogDialogOpen, setAddBlogDialogOpen] = useState(false);
  const [editBlogDialogOpen, setEditBlogDialogOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'General',
    tags: '',
    read_time: 5,
    image: null as File | null
  });
  const [editBlogPost, setEditBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'General',
    tags: '',
    read_time: 5,
    image: null as File | null
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
  const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'hackathon'
  });
  const [editEvent, setEditEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'hackathon'
  });


  // Redirect if not authenticated or not admin/superuser
  if (!isAuthenticated || (!user?.is_staff && !user?.is_superuser)) {
    return <Navigate to="/login" replace />;
  }

  const API_BASE_URL = 'http://localhost:8000/api';
  const accessToken = localStorage.getItem('access_token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!newUser.first_name || !newUser.email || !newUser.password || !newUser.password_confirm) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (newUser.password !== newUser.password_confirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        toast.success('User added successfully');
        setAddUserDialogOpen(false);
        setNewUser({ first_name: '', last_name: '', email: '', password: '', password_confirm: '' });
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to add user');
      }
    } catch (error) {
      toast.error('Error adding user');
    }
  };

  const toggleUserBlock = async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/toggle-block/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('User status updated');
        fetchUsers();
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      toast.error('Error updating user status');
    }
  };

  const fetchGalleryPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/photos/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGalleryPhotos(data);
      } else {
        toast.error('Failed to fetch gallery photos');
      }
    } catch (error) {
      toast.error('Error fetching gallery photos');
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async () => {
    if (!newPhoto.title || !newPhoto.image) {
      toast.error('Please provide a title and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', newPhoto.title);
    formData.append('description', newPhoto.description);
    formData.append('image', newPhoto.image);

    try {
      const response = await fetch(`${API_BASE_URL}/gallery/photos/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Photo uploaded successfully');
        setUploadDialogOpen(false);
        setNewPhoto({ title: '', description: '', image: null });
        fetchGalleryPhotos();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload photo');
      }
    } catch (error) {
      toast.error('Error uploading photo');
    }
  };

  const deletePhoto = async (photoId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/photos/${photoId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Photo deleted successfully');
        fetchGalleryPhotos();
      } else {
        toast.error('Failed to delete photo');
      }
    } catch (error) {
      toast.error('Error deleting photo');
    }
  };

  const openEditDialog = (photo: Photo) => {
    setSelectedPhoto(photo);
    setEditPhoto({
      title: photo.title,
      description: photo.description,
      image: null
    });
    setEditDialogOpen(true);
  };

  const editPhotoSubmit = async () => {
    if (!selectedPhoto || !editPhoto.title) {
      toast.error('Please provide a title');
      return;
    }

    const formData = new FormData();
    formData.append('title', editPhoto.title);
    formData.append('description', editPhoto.description);
    if (editPhoto.image) {
      formData.append('image', editPhoto.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/gallery/photos/${selectedPhoto.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Photo updated successfully');
        setEditDialogOpen(false);
        setSelectedPhoto(null);
        setEditPhoto({ title: '', description: '', image: null });
        fetchGalleryPhotos();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update photo');
      }
    } catch (error) {
      toast.error('Error updating photo');
    }
  };

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        toast.error('Failed to fetch blog posts');
      }
    } catch (error) {
      toast.error('Error fetching blog posts');
    } finally {
      setLoading(false);
    }
  };

  const publishBlogPost = async (postId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/${postId}/publish/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Blog post published');
        fetchBlogPosts();
      } else {
        toast.error('Failed to publish blog post');
      }
    } catch (error) {
      toast.error('Error publishing blog post');
    }
  };

  const unpublishBlogPost = async (postId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/${postId}/unpublish/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Blog post unpublished');
        fetchBlogPosts();
      } else {
        toast.error('Failed to unpublish blog post');
      }
    } catch (error) {
      toast.error('Error unpublishing blog post');
    }
  };

  const deleteBlogPost = async (postId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/${postId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Blog post deleted');
        fetchBlogPosts();
      } else {
        toast.error('Failed to delete blog post');
      }
    } catch (error) {
      toast.error('Error deleting blog post');
    }
  };

  const addBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      toast.error('Please provide a title and content');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlogPost.title);
    formData.append('content', newBlogPost.content);
    formData.append('excerpt', newBlogPost.excerpt);
    formData.append('category', newBlogPost.category);
    formData.append('tags', newBlogPost.tags);
    formData.append('read_time', newBlogPost.read_time.toString());
    if (newBlogPost.image) {
      formData.append('image', newBlogPost.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Blog post created successfully');
        setAddBlogDialogOpen(false);
        setNewBlogPost({
          title: '',
          content: '',
          excerpt: '',
          category: 'General',
          tags: '',
          read_time: 5,
          image: null
        });
        fetchBlogPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create blog post');
      }
    } catch (error) {
      toast.error('Error creating blog post');
    }
  };

  const openEditBlogDialog = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setEditBlogPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags,
      read_time: post.read_time,
      image: null
    });
    setEditBlogDialogOpen(true);
  };

  const editBlogPostSubmit = async () => {
    if (!selectedBlogPost || !editBlogPost.title || !editBlogPost.content) {
      toast.error('Please provide a title and content');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/posts/${selectedBlogPost.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editBlogPost),
      });

      if (response.ok) {
        toast.success('Blog post updated successfully');
        setEditBlogDialogOpen(false);
        setSelectedBlogPost(null);
        setEditBlogPost({
          title: '',
          content: '',
          excerpt: '',
          category: 'General',
          tags: '',
          read_time: 5,
          image: null
        });
        fetchBlogPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update blog post');
      }
    } catch (error) {
      toast.error('Error updating blog post');
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/events/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        toast.error('Failed to fetch events');
      }
    } catch (error) {
      toast.error('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        toast.success('Event created successfully');
        setAddEventDialogOpen(false);
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          category: 'hackathon'
        });
        fetchEvents();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create event');
      }
    } catch (error) {
      toast.error('Error creating event');
    }
  };

  const openEditEventDialog = (event: Event) => {
    setSelectedEvent(event);
    setEditEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category
    });
    setEditEventDialogOpen(true);
  };

  const editEventSubmit = async () => {
    if (!selectedEvent || !editEvent.title || !editEvent.description || !editEvent.date || !editEvent.time || !editEvent.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/${selectedEvent.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editEvent),
      });

      if (response.ok) {
        toast.success('Event updated successfully');
        setEditEventDialogOpen(false);
        setSelectedEvent(null);
        setEditEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          category: 'hackathon'
        });
        fetchEvents();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update event');
      }
    } catch (error) {
      toast.error('Error updating event');
    }
  };

  const deleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Event deleted successfully');
        fetchEvents();
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('Error deleting event');
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'content') {
      fetchGalleryPhotos();
      fetchBlogPosts();
    } else if (activeTab === 'overview') {
      fetchBlogPosts();
    } else if (activeTab === 'events') {
      fetchEvents();
    }
  }, [activeTab]);

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
                        stat.changeType === 'neutral' ? 'text-muted-foreground' :
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
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">by {post.author_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.is_published ? 'default' : 'secondary'}>
                          {post.is_published ? 'published' : 'draft'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {blogPosts.length === 0 && (
                    <p className="text-muted-foreground text-center">No blog posts yet.</p>
                  )}
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
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">All Users</h3>
                    <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                  </div>
                  <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account for the system.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first_name">First Name *</Label>
                            <Input
                              id="first_name"
                              value={newUser.first_name}
                              onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                              id="last_name"
                              value={newUser.last_name}
                              onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                              placeholder="Enter last name"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="Enter password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password_confirm">Confirm Password *</Label>
                          <Input
                            id="password_confirm"
                            type="password"
                            value={newUser.password_confirm}
                            onChange={(e) => setNewUser({ ...newUser, password_confirm: e.target.value })}
                            placeholder="Confirm password"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addUser}>
                            Add User
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {loading ? (
                  <p>Loading users...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.is_staff ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.is_active ? "default" : "destructive"}>
                              {user.is_active ? "Active" : "Blocked"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.date_joined).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserBlock(user.id)}
                              className={user.is_active ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                            >
                              {user.is_active ? (
                                <>
                                  <Ban className="h-4 w-4 mr-1" />
                                  Block
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Unblock
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Upload and manage gallery photos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Button onClick={() => setUploadDialogOpen(true)}>
                    <Image className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryPhotos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(photo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePhoto(photo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground">{photo.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          By {photo.uploaded_by_name} on {new Date(photo.uploaded_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {galleryPhotos.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No photos uploaded yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>Manage blog posts and publications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">All Blog Posts</h3>
                    <p className="text-sm text-muted-foreground">Manage blog content and publication status</p>
                  </div>
                  <Dialog open={addBlogDialogOpen} onOpenChange={setAddBlogDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Blog Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Blog Post</DialogTitle>
                        <DialogDescription>
                          Create a new blog post for the website.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="blog_title">Title *</Label>
                          <Input
                            id="blog_title"
                            value={newBlogPost.title}
                            onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                            placeholder="Enter blog post title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog_excerpt">Excerpt</Label>
                          <Textarea
                            id="blog_excerpt"
                            value={newBlogPost.excerpt}
                            onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                            placeholder="Enter a brief excerpt"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog_content">Content *</Label>
                          <Textarea
                            id="blog_content"
                            value={newBlogPost.content}
                            onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                            placeholder="Enter the full blog post content"
                            rows={10}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="blog_category">Category</Label>
                            <Select value={newBlogPost.category} onValueChange={(value) => setNewBlogPost({ ...newBlogPost, category: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Events">Events</SelectItem>
                                <SelectItem value="Tutorials">Tutorials</SelectItem>
                                <SelectItem value="News">News</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="blog_read_time">Read Time (minutes)</Label>
                            <Input
                              id="blog_read_time"
                              type="number"
                              value={newBlogPost.read_time}
                              onChange={(e) => setNewBlogPost({ ...newBlogPost, read_time: parseInt(e.target.value) || 5 })}
                              placeholder="5"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="blog_tags">Tags</Label>
                          <Input
                            id="blog_tags"
                            value={newBlogPost.tags}
                            onChange={(e) => setNewBlogPost({ ...newBlogPost, tags: e.target.value })}
                            placeholder="Enter tags separated by commas"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog_image">Image (optional)</Label>
                          <Input
                            id="blog_image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewBlogPost({ ...newBlogPost, image: e.target.files?.[0] || null })}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setAddBlogDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addBlogPost}>
                            Create Blog Post
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {loading ? (
                  <p>Loading blog posts...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author_name}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <Badge variant={post.is_published ? "default" : "secondary"}>
                              {post.is_published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditBlogDialog(post)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {post.is_published ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => unpublishBlogPost(post.id)}
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Unpublish
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => publishBlogPost(post.id)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  Publish
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteBlogPost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {blogPosts.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No blog posts found.</p>
                )}
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
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">All Events</h3>
                    <p className="text-sm text-muted-foreground">Manage events and their details</p>
                  </div>
                  <Dialog open={addEventDialogOpen} onOpenChange={setAddEventDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>
                          Create a new event for the BITSA website.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="event_title">Title *</Label>
                          <Input
                            id="event_title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            placeholder="Enter event title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="event_description">Description *</Label>
                          <Textarea
                            id="event_description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            placeholder="Enter event description"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="event_date">Date *</Label>
                            <Input
                              id="event_date"
                              type="date"
                              value={newEvent.date}
                              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="event_time">Time *</Label>
                            <Input
                              id="event_time"
                              type="time"
                              value={newEvent.time}
                              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="event_location">Location *</Label>
                            <Input
                              id="event_location"
                              value={newEvent.location}
                              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                              placeholder="Enter event location"
                            />
                          </div>
                          <div>
                            <Label htmlFor="event_category">Category</Label>
                            <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hackathon">Hackathon</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="talk">Talk</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="competition">Competition</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setAddEventDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addEvent}>
                            Create Event
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {loading ? (
                  <p>Loading events...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={event.status === 'upcoming' ? 'default' : event.status === 'ongoing' ? 'secondary' : 'outline'}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditEventDialog(event)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {events.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No events found.</p>
                )}
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

        {/* Upload Photo Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Photo</DialogTitle>
              <DialogDescription>
                Add a new photo to the gallery.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="photo_title">Title *</Label>
                <Input
                  id="photo_title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Enter photo title"
                />
              </div>
              <div>
                <Label htmlFor="photo_description">Description</Label>
                <Input
                  id="photo_description"
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  placeholder="Enter photo description"
                />
              </div>
              <div>
                <Label htmlFor="photo_image">Image *</Label>
                <Input
                  id="photo_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={uploadPhoto}>
                  Upload Photo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Photo Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Photo</DialogTitle>
              <DialogDescription>
                Update the photo details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_photo_title">Title *</Label>
                <Input
                  id="edit_photo_title"
                  value={editPhoto.title}
                  onChange={(e) => setEditPhoto({ ...editPhoto, title: e.target.value })}
                  placeholder="Enter photo title"
                />
              </div>
              <div>
                <Label htmlFor="edit_photo_description">Description</Label>
                <Input
                  id="edit_photo_description"
                  value={editPhoto.description}
                  onChange={(e) => setEditPhoto({ ...editPhoto, description: e.target.value })}
                  placeholder="Enter photo description"
                />
              </div>
              <div>
                <Label htmlFor="edit_photo_image">New Image (optional)</Label>
                <Input
                  id="edit_photo_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditPhoto({ ...editPhoto, image: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editPhotoSubmit}>
                  Update Photo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Blog Post Dialog */}
        <Dialog open={editBlogDialogOpen} onOpenChange={setEditBlogDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>
                Update the blog post details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_blog_title">Title *</Label>
                <Input
                  id="edit_blog_title"
                  value={editBlogPost.title}
                  onChange={(e) => setEditBlogPost({ ...editBlogPost, title: e.target.value })}
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="edit_blog_excerpt">Excerpt</Label>
                <Textarea
                  id="edit_blog_excerpt"
                  value={editBlogPost.excerpt}
                  onChange={(e) => setEditBlogPost({ ...editBlogPost, excerpt: e.target.value })}
                  placeholder="Enter a brief excerpt"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit_blog_content">Content *</Label>
                <Textarea
                  id="edit_blog_content"
                  value={editBlogPost.content}
                  onChange={(e) => setEditBlogPost({ ...editBlogPost, content: e.target.value })}
                  placeholder="Enter the full blog post content"
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_blog_category">Category</Label>
                  <Select value={editBlogPost.category} onValueChange={(value) => setEditBlogPost({ ...editBlogPost, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Tutorials">Tutorials</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_blog_read_time">Read Time (minutes)</Label>
                  <Input
                    id="edit_blog_read_time"
                    type="number"
                    value={editBlogPost.read_time}
                    onChange={(e) => setEditBlogPost({ ...editBlogPost, read_time: parseInt(e.target.value) || 5 })}
                    placeholder="5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit_blog_tags">Tags</Label>
                <Input
                  id="edit_blog_tags"
                  value={editBlogPost.tags}
                  onChange={(e) => setEditBlogPost({ ...editBlogPost, tags: e.target.value })}
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div>
                <Label htmlFor="edit_blog_image">Image (optional)</Label>
                <Input
                  id="edit_blog_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditBlogPost({ ...editBlogPost, image: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditBlogDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editBlogPostSubmit}>
                  Update Blog Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
