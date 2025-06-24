import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Mail, MailOpen, Phone, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactMessage } from "@shared/schema";

export default function ViewMessages() {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");

  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/messages"],
  });

  const markAsRead = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("PUT", `/api/admin/messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
    },
    onError: () => {
      toast({
        title: "Error marking message as read",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const filteredMessages = messages?.filter((message) => {
    if (statusFilter === "read") return message.read;
    if (statusFilter === "unread") return !message.read;
    return true;
  }).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()) || [];

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead.mutate(message.id);
    }
  };

  const unreadCount = messages?.filter(m => !m.read).length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-hiddekel-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">
            View and manage contact form submissions
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "All Messages" },
          { value: "unread", label: "Unread" },
          { value: "read", label: "Read" },
        ].map((filter) => (
          <Button
            key={filter.value}
            variant={statusFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(filter.value as any)}
            className={statusFilter === filter.value ? "bg-hiddekel-gold text-white hover:bg-yellow-600" : ""}
          >
            {filter.label}
            {filter.value === "unread" && unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={`hover:shadow-lg transition-shadow cursor-pointer ${
            !message.read ? "border-l-4 border-l-hiddekel-gold bg-orange-50/50" : ""
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {message.read ? (
                        <MailOpen className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Mail className="h-4 w-4 text-hiddekel-gold" />
                      )}
                      <h3 className="font-semibold text-gray-900">
                        {message.firstName} {message.lastName}
                      </h3>
                    </div>
                    <Badge variant={message.read ? "secondary" : "default"} className={
                      message.read ? "" : "bg-hiddekel-gold text-white"
                    }>
                      {message.read ? "Read" : "New"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {message.email}
                    </span>
                    {message.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {message.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(message.createdAt!).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 line-clamp-2 mb-3">{message.message}</p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        View Full Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          Message from {message.firstName} {message.lastName}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Name</Label>
                            <p className="text-gray-900">{message.firstName} {message.lastName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Email</Label>
                            <p className="text-gray-900">{message.email}</p>
                          </div>
                          {message.phone && (
                            <div>
                              <Label className="text-sm font-medium text-gray-600">Phone</Label>
                              <p className="text-gray-900">{message.phone}</p>
                            </div>
                          )}
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Date</Label>
                            <p className="text-gray-900">
                              {new Date(message.createdAt!).toLocaleDateString()} at{" "}
                              {new Date(message.createdAt!).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Message</Label>
                          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="bg-hiddekel-gold text-white hover:bg-yellow-600"
                            onClick={() => window.open(`mailto:${message.email}`, '_blank')}
                          >
                            Reply via Email
                          </Button>
                          {message.phone && (
                            <Button 
                              variant="outline"
                              onClick={() => window.open(`tel:${message.phone}`, '_blank')}
                            >
                              Call
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {statusFilter === "all" 
                ? "No messages found"
                : statusFilter === "unread"
                ? "No unread messages"
                : "No read messages"
              }
            </h3>
            <p className="text-gray-600">
              {statusFilter === "all" 
                ? "Contact form submissions will appear here."
                : statusFilter === "unread"
                ? "All messages have been read."
                : "No messages have been read yet."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
