import { useQuery } from "@tanstack/react-query";
import { Building, FileText, Image, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Stand, BlogPost, GalleryImage, ContactMessage } from "@shared/schema";

export default function Dashboard() {
  const { data: stands } = useQuery<Stand[]>({
    queryKey: ["/api/admin/stands"],
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
  });

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: messages } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/messages"],
  });

  const stats = [
    {
      title: "Total Stands",
      value: stands?.length || 0,
      icon: Building,
      color: "text-blue-600"
    },
    {
      title: "Blog Posts",
      value: blogPosts?.length || 0,
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Gallery Images",
      value: galleryImages?.length || 0,
      icon: Image,
      color: "text-purple-600"
    },
    {
      title: "New Messages",
      value: messages?.filter(m => !m.read).length || 0,
      icon: MessageSquare,
      color: "text-orange-600"
    }
  ];

  const availableStands = stands?.filter(s => s.status === "available").length || 0;
  const reservedStands = stands?.filter(s => s.status === "reserved").length || 0;
  const soldStands = stands?.filter(s => s.status === "sold").length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stands Status */}
        <Card>
          <CardHeader>
            <CardTitle>Stands by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available</span>
                <span className="text-lg font-bold text-green-600">{availableStands}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reserved</span>
                <span className="text-lg font-bold text-orange-600">{reservedStands}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sold</span>
                <span className="text-lg font-bold text-red-600">{soldStands}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages?.slice(0, 3).map((message) => (
                <div key={message.id} className="border-b pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{message.firstName} {message.lastName}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      message.read ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {message.read ? "Read" : "New"}
                    </span>
                  </div>
                </div>
              ))}
              {messages?.length === 0 && (
                <p className="text-gray-500">No messages yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
