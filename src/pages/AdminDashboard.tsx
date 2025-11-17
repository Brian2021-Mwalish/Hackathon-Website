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
import { Users, FileText, Calendar, Image, BarChart3, Settings, UserPlus, Ban, CheckCircle, Trash2, Edit } from "lucide-react";
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

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !user?.is_staff) {
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

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'content') {
      fetchGalleryPhotos();
      fetchBlogPosts();
    } else if (activeTab === 'overview') {
      fetchBlogPosts();
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
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
