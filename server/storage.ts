import { 
  users, stands, blogPosts, galleryImages, contactMessages, downloads,
  type User, type InsertUser, type Stand, type InsertStand,
  type BlogPost, type InsertBlogPost, type GalleryImage, type InsertGalleryImage,
  type ContactMessage, type InsertContactMessage, type Download, type InsertDownload
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Stand methods
  getAllStands(): Promise<Stand[]>;
  getStand(id: number): Promise<Stand | undefined>;
  createStand(stand: InsertStand): Promise<Stand>;
  updateStand(id: number, stand: Partial<InsertStand>): Promise<Stand | undefined>;
  deleteStand(id: number): Promise<boolean>;

  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Gallery methods
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<boolean>;

  // Contact methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<boolean>;

  // Download methods
  getAllDownloads(): Promise<Download[]>;
  getDownloadsByCategory(category: string): Promise<Download[]>;
  createDownload(download: InsertDownload): Promise<Download>;
  deleteDownload(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stands: Map<number, Stand>;
  private blogPosts: Map<number, BlogPost>;
  private galleryImages: Map<number, GalleryImage>;
  private contactMessages: Map<number, ContactMessage>;
  private downloads: Map<number, Download>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.stands = new Map();
    this.blogPosts = new Map();
    this.galleryImages = new Map();
    this.contactMessages = new Map();
    this.downloads = new Map();
    this.currentId = 1;

    // Initialize with default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In production, this should be hashed
      role: "admin"
    });

    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample stands
    const sampleStands = [
      {
        title: "Plot RS-001",
        description: "300 sqm premium residential stand with excellent location",
        price: "8500.00",
        size: "300 sqm",
        location: "Rosewood Park, Nyabira Area",
        status: "available" as const,
        features: ["Tarred roads", "Ready to build", "Electricity available", "Premium location"],
        imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Plot RS-002",
        description: "Corner stand with premium location and scenic views",
        price: "9200.00",
        size: "300 sqm",
        location: "Rosewood Park, Nyabira Area",
        status: "available" as const,
        features: ["Corner plot", "Tarred roads", "Ready to build", "Premium views"],
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Plot RS-003",
        description: "Elevated stand with scenic views of the surrounding area",
        price: "8800.00",
        size: "300 sqm",
        location: "Rosewood Park, Nyabira Area",
        status: "reserved" as const,
        features: ["Elevated position", "Scenic views", "Ready to build", "Water & sewer in progress"],
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      }
    ];

    for (const stand of sampleStands) {
      await this.createStand(stand);
    }

    // Sample blog posts
    const samplePosts = [
      {
        title: "Rosewood Park Phase 2 Announcement",
        content: "We're excited to announce the launch of Phase 2 of our Rosewood Park development. This new phase will feature additional premium stands with enhanced infrastructure and modern amenities.",
        excerpt: "We're excited to announce the launch of Phase 2 with additional premium stands...",
        category: "Development Update",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true
      },
      {
        title: "Zimbabwe's Growing Real Estate Market",
        content: "An in-depth analysis of the current trends and opportunities in Zimbabwe's property sector, highlighting the growing demand for quality residential developments.",
        excerpt: "An analysis of the current trends and opportunities in Zimbabwe's property sector...",
        category: "Industry Insights",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true
      },
      {
        title: "5 Things to Consider When Buying Land",
        content: "Essential factors to evaluate before making your land purchase decision, including location, infrastructure, legal considerations, and future development potential.",
        excerpt: "Essential factors to evaluate before making your land purchase decision...",
        category: "Tips & Advice",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true
      }
    ];

    for (const post of samplePosts) {
      await this.createBlogPost(post);
    }

    // Sample gallery images
    const sampleGallery = [
      {
        title: "Luxury Development",
        description: "Premium residential project showcase",
        category: "Developments",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "House Plans",
        description: "5 pre-approved designs available",
        category: "House Plans",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Modern Architecture",
        description: "Contemporary design solutions",
        category: "Developments",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Premium Finishes",
        description: "Quality construction standards",
        category: "Infrastructure",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Planning Process",
        description: "Detailed development planning",
        category: "Infrastructure",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        title: "Completed Projects",
        description: "Delivered excellence",
        category: "Developments",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      }
    ];

    for (const image of sampleGallery) {
      await this.createGalleryImage(image);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Stand methods
  async getAllStands(): Promise<Stand[]> {
    return Array.from(this.stands.values());
  }

  async getStand(id: number): Promise<Stand | undefined> {
    return this.stands.get(id);
  }

  async createStand(insertStand: InsertStand): Promise<Stand> {
    const id = this.currentId++;
    const stand: Stand = { 
      ...insertStand, 
      id, 
      createdAt: new Date() 
    };
    this.stands.set(id, stand);
    return stand;
  }

  async updateStand(id: number, updateData: Partial<InsertStand>): Promise<Stand | undefined> {
    const existing = this.stands.get(id);
    if (!existing) return undefined;
    
    const updated: Stand = { ...existing, ...updateData };
    this.stands.set(id, updated);
    return updated;
  }

  async deleteStand(id: number): Promise<boolean> {
    return this.stands.delete(id);
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.published);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      createdAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = { ...existing, ...updateData };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Gallery methods
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).filter(image => image.category === category);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentId++;
    const image: GalleryImage = { 
      ...insertImage, 
      id, 
      createdAt: new Date() 
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Contact methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      read: false,
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;
    
    const updated = { ...message, read: true };
    this.contactMessages.set(id, updated);
    return true;
  }

  // Download methods
  async getAllDownloads(): Promise<Download[]> {
    return Array.from(this.downloads.values());
  }

  async getDownloadsByCategory(category: string): Promise<Download[]> {
    return Array.from(this.downloads.values()).filter(download => download.category === category);
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const id = this.currentId++;
    const download: Download = { 
      ...insertDownload, 
      id, 
      createdAt: new Date() 
    };
    this.downloads.set(id, download);
    return download;
  }

  async deleteDownload(id: number): Promise<boolean> {
    return this.downloads.delete(id);
  }
}

export const storage = new MemStorage();
