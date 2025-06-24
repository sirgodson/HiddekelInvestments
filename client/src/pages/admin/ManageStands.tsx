import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Stand, InsertStand } from "@shared/schema";

export default function ManageStands() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStand, setEditingStand] = useState<Stand | null>(null);
  const [formData, setFormData] = useState<InsertStand>({
    title: "",
    description: "",
    price: "",
    size: "",
    location: "",
    status: "available",
    features: [],
    imageUrl: "",
  });

  const { data: stands, isLoading } = useQuery<Stand[]>({
    queryKey: ["/api/admin/stands"],
  });

  const createStand = useMutation({
    mutationFn: async (data: InsertStand) => {
      await apiRequest("POST", "/api/admin/stands", data);
    },
    onSuccess: () => {
      toast({
        title: "Stand created successfully",
        description: "The new stand has been added to the database.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stands"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stands"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error creating stand",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateStand = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertStand> }) => {
      await apiRequest("PUT", `/api/admin/stands/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Stand updated successfully",
        description: "The stand has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stands"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stands"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error updating stand",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const deleteStand = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/stands/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Stand deleted successfully",
        description: "The stand has been removed from the database.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stands"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stands"] });
    },
    onError: () => {
      toast({
        title: "Error deleting stand",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      size: "",
      location: "",
      status: "available",
      features: [],
      imageUrl: "",
    });
    setEditingStand(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStand) {
      updateStand.mutate({ id: editingStand.id, data: formData });
    } else {
      createStand.mutate(formData);
    }
  };

  const handleEdit = (stand: Stand) => {
    setEditingStand(stand);
    setFormData({
      title: stand.title,
      description: stand.description,
      price: stand.price,
      size: stand.size,
      location: stand.location,
      status: stand.status,
      features: stand.features,
      imageUrl: stand.imageUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this stand?")) {
      deleteStand.mutate(id);
    }
  };

  const handleFeaturesChange = (value: string) => {
    const features = value.split(",").map(f => f.trim()).filter(f => f.length > 0);
    setFormData(prev => ({ ...prev, features }));
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Manage Stands</h1>
          <p className="text-gray-600">Create, edit, and manage property stands</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-hiddekel-gold text-white hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Stand
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStand ? "Edit Stand" : "Add New Stand"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Plot RS-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., 8500"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    placeholder="e.g., 300 sqm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Rosewood Park, Nyabira Area"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the stand..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={formData.features.join(", ")}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  placeholder="e.g., Tarred roads, Ready to build, Electricity available"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createStand.isPending || updateStand.isPending}
                  className="bg-hiddekel-gold text-white hover:bg-yellow-600"
                >
                  {createStand.isPending || updateStand.isPending 
                    ? "Saving..." 
                    : editingStand ? "Update Stand" : "Create Stand"
                  }
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stands Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stands?.map((stand) => (
          <Card key={stand.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{stand.title}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {stand.location}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stand.status === "available" 
                    ? "bg-green-100 text-green-800" 
                    : stand.status === "reserved"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {stand.status.charAt(0).toUpperCase() + stand.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {stand.imageUrl && (
                <img 
                  src={stand.imageUrl} 
                  alt={stand.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{stand.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-hiddekel-gold">${stand.price}</span>
                <span className="text-sm text-gray-500">{stand.size}</span>
              </div>
              {stand.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {stand.features.slice(0, 2).map((feature) => (
                    <span 
                      key={feature}
                      className="px-2 py-1 bg-hiddekel-gold/10 text-hiddekel-gold text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {stand.features.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{stand.features.length - 2}
                    </span>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(stand)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(stand.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stands?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stands found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first stand listing.</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-hiddekel-gold text-white hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Stand
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
