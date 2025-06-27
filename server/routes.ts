import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertStandSchema, insertBlogPostSchema, insertGalleryImageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Public routes
  
  // Get all stands
  app.get("/api/stands", async (req, res) => {
    try {
      const stands = await storage.getAllStands();
      res.json(stands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stands" });
    }
  });

  // Get single stand
  app.get("/api/stands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const stand = await storage.getStand(id);
      if (!stand) {
        return res.status(404).json({ error: "Stand not found" });
      }
      res.json(stand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stand" });
    }
  });

  // Get published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post
  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post || !post.published) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Get gallery images
  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string;
      const images = category 
        ? await storage.getGalleryImagesByCategory(category)
        : await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Get downloads
  app.get("/api/downloads", async (req, res) => {
    try {
      const category = req.query.category as string;
      const downloads = category 
        ? await storage.getDownloadsByCategory(category)
        : await storage.getAllDownloads();
      res.json(downloads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch downloads" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // In production, use proper session management
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Admin routes (in production, add authentication middleware)
  
  // Get all stands (admin)
  app.get("/api/admin/stands", async (req, res) => {
    try {
      const stands = await storage.getAllStands();
      res.json(stands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stands" });
    }
  });

  // Create stand
  app.post("/api/admin/stands", async (req, res) => {
    try {
      const validatedData = insertStandSchema.parse(req.body);
      const stand = await storage.createStand(validatedData);
      res.status(201).json(stand);
    } catch (error) {
      res.status(400).json({ error: "Invalid stand data" });
    }
  });

  // Update stand
  app.put("/api/admin/stands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertStandSchema.partial().parse(req.body);
      const stand = await storage.updateStand(id, validatedData);
      if (!stand) {
        return res.status(404).json({ error: "Stand not found" });
      }
      res.json(stand);
    } catch (error) {
      res.status(400).json({ error: "Invalid stand data" });
    }
  });

  // Delete stand
  app.delete("/api/admin/stands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteStand(id);
      if (!deleted) {
        return res.status(404).json({ error: "Stand not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete stand" });
    }
  });

  // Get all blog posts (admin)
  app.get("/api/admin/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Create blog post
  app.post("/api/admin/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Update blog post
  app.put("/api/admin/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Delete blog post
  app.delete("/api/admin/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Get contact messages (admin)
  app.get("/api/admin/messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Mark message as read
  app.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markMessageAsRead(id);
      if (!success) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  // Get all gallery images (admin)
  app.get("/api/admin/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Add gallery image
  app.post("/api/admin/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid gallery image data" });
    }
  });

  // Delete gallery image
  app.delete("/api/admin/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGalleryImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
