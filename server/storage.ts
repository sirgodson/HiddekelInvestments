import { 
  User, 
  InsertUser, 
  Stand, 
  InsertStand, 
  BlogPost, 
  InsertBlogPost, 
  GalleryImage, 
  InsertGalleryImage, 
  ContactMessage, 
  InsertContactMessage, 
  Download, 
  InsertDownload 
} from "@shared/schema";
import { users, stands, blogPosts, galleryImages, contactMessages, downloads } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllStands(): Promise<Stand[]> {
    return await db.select().from(stands);
  }

  async getStand(id: number): Promise<Stand | undefined> {
    const [stand] = await db.select().from(stands).where(eq(stands.id, id));
    return stand || undefined;
  }

  async createStand(insertStand: InsertStand): Promise<Stand> {
    const [stand] = await db
      .insert(stands)
      .values(insertStand)
      .returning();
    return stand;
  }

  async updateStand(id: number, updateData: Partial<InsertStand>): Promise<Stand | undefined> {
    const [stand] = await db
      .update(stands)
      .set(updateData)
      .where(eq(stands.id, id))
      .returning();
    return stand || undefined;
  }

  async deleteStand(id: number): Promise<boolean> {
    const result = await db.delete(stands).where(eq(stands.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages);
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).where(eq(galleryImages.category, category));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db
      .insert(galleryImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const [message] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return !!message;
  }

  async getAllDownloads(): Promise<Download[]> {
    return await db.select().from(downloads);
  }

  async getDownloadsByCategory(category: string): Promise<Download[]> {
    return await db.select().from(downloads).where(eq(downloads.category, category));
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const [download] = await db
      .insert(downloads)
      .values(insertDownload)
      .returning();
    return download;
  }

  async deleteDownload(id: number): Promise<boolean> {
    const result = await db.delete(downloads).where(eq(downloads.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();