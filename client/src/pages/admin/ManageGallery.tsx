import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GalleryImage, InsertGalleryImage } from "@shared/schema";

export default function ManageGallery() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [formData, setFormData] = useState<InsertGalleryImage>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const { data: galleryImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/admin/gallery"],
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Developments", label: "Developments" },
    { value: "House Plans", label: "House Plans" },
    { value: "Infrastructure", label: "Infrastructure" },
  ];

  const filteredImages = galleryImages?.filter(
    image => activeCategory === "all" || image.category === activeCategory
  ) || [];

  const createImage = useMutation({
    mutationFn: async (data: InsertGalleryImage) => {
      await apiRequest("POST", "/api/admin/gallery", data);
    },
    onSuccess: () => {
      toast({
        title: "Image added successfully",
        description: "The new image has been added to the gallery.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error adding image",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const deleteImage = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/gallery/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Image deleted successfully",
        description: "The image has been removed from the gallery.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
    onError: () => {
      toast({
        title: "Error deleting image",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createImage.mutate(formData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteImage.mutate(id);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
          <p className="text-gray-600">Upload and manage gallery images</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-hiddekel-gold text-white hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Image title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Developments">Developments</SelectItem>
                    <SelectItem value="House Plans">House Plans</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Image description (optional)"
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
                  required
                />
              </div>
              {formData.imageUrl && (
                <div>
                  <Label>Preview</Label>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createImage.isPending}
                  className="bg-hiddekel-gold text-white hover:bg-yellow-600"
                >
                  {createImage.isPending ? "Adding..." : "Add Image"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={activeCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.value)}
            className={activeCategory === category.value ? "bg-hiddekel-gold text-white hover:bg-yellow-600" : ""}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2">{image.title}</h3>
                </div>
                <span className="inline-block px-2 py-1 bg-hiddekel-gold/10 text-hiddekel-gold text-xs rounded mb-2">
                  {image.category}
                </span>
                {image.description && (
                  <p className="text-gray-600 text-xs line-clamp-2">{image.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeCategory === "all" ? "No images found" : `No images in ${activeCategory} category`}
            </h3>
            <p className="text-gray-600 mb-4">Get started by uploading your first image.</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-hiddekel-gold text-white hover:bg-yellow-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
