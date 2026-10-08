"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  UploadCloud,
  Edit,
  Trash2,
  RefreshCw,
  MapPin,
  Check,
  AlertCircle,
  Loader2,
  X,
  Database,
  ImageIcon,
  MessageSquareQuote,
} from "lucide-react";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

interface GalleryItemData {
  _id: string;
  location: string;
  image: string;
  imageAlt: string;
  category: string;
  slug?: string;
  cloudinaryPublicId?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminDashboardPage() {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"gallery" | "testimonials">("gallery");

  // Notifications
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [seedingLoading, setSeedingLoading] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    location: "",
    image: "",
    imageAlt: "",
    category: "pools",
    slug: "",
    cloudinaryPublicId: "",
  });
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Fetch gallery items from Admin API
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.data || []);
      } else {
        showToast("error", data.message || "Failed to fetch gallery items");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Error connecting to gallery API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Handle Seeding if database is fresh
  const handleSeed = async () => {
    if (
      !confirm(
        "Do you want to seed initial default project photos into MongoDB? This won't overwrite existing items.",
      )
    )
      return;

    setSeedingLoading(true);
    try {
      const res = await fetch("/api/admin/gallery/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("success", data.message);
        fetchItems();
      } else {
        showToast("error", data.message || "Seeding failed");
      }
    } catch {
      showToast("error", "Failed to run seed request");
    } finally {
      setSeedingLoading(false);
    }
  };

  // Handle image upload to Cloudinary via backend endpoint
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setFormData((prev) => ({
        ...prev,
        image: data.url,
        cloudinaryPublicId: data.publicId,
      }));

      showToast("success", "Image uploaded to Cloudinary successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      showToast("error", msg);
    } finally {
      setIsUploading(false);
    }
  };

  // Open modal for Create
  const handleOpenAdd = () => {
    setFormData({
      location: "",
      image: "",
      imageAlt: "",
      category: "pools",
      slug: "",
      cloudinaryPublicId: "",
    });
    setUploadPreview(null);
    setIsAddModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (item: GalleryItemData) => {
    setEditingItem(item);
    setFormData({
      location: item.location || "",
      image: item.image || "",
      imageAlt: item.imageAlt || "",
      category: item.category || "pools",
      slug: item.slug || "",
      cloudinaryPublicId: item.cloudinaryPublicId || "",
    });
    setUploadPreview(item.image);
  };

  // Save new item
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        image: formData.image?.trim() || "/images/about-intro-pool.jpg",
      };
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create project");
      }

      showToast("success", "New project image added to gallery!");
      setIsAddModalOpen(false);
      fetchItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing item
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        image: formData.image?.trim() || "/images/about-intro-pool.jpg",
      };
      const res = await fetch(`/api/admin/gallery/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update project");
      }

      showToast("success", "Gallery project updated successfully!");
      setEditingItem(null);
      fetchItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this project image from gallery and Cloudinary?",
      )
    )
      return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete project");
      }

      showToast("success", "Project deleted successfully");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      showToast("error", msg);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Items computed
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        (item.location && item.location.toLowerCase().includes(search)) ||
        (item.imageAlt && item.imageAlt.toLowerCase().includes(search)) ||
        (item.category && item.category.toLowerCase().includes(search));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchTerm]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: items.length,
      pools: items.filter((i) => i.category.toLowerCase().includes("pool"))
        .length,
      landscaping: items.filter((i) =>
        i.category.toLowerCase().includes("landscape"),
      ).length,
      outdoor: items.filter((i) =>
        i.category.toLowerCase().includes("outdoor") ||
        i.category.toLowerCase().includes("living"),
      ).length,
    };
  }, [items]);

  return (
    <div className="space-y-6 animate-fade-in text-foreground">
      {/* Toast Banner */}
      {toast && (
        <div
          className={`fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 border transition-all animate-in slide-in-from-top-3 max-w-md ${
            toast.type === "success"
              ? "bg-white border-emerald-500/30 text-emerald-900 shadow-emerald-500/10"
              : "bg-white border-red-500/30 text-red-900 shadow-red-500/10"
          }`}
        >
          {toast.type === "success" ? (
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Module Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab("gallery")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "gallery"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "bg-white text-muted-foreground hover:text-foreground hover:bg-slate-100 border border-border"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Project Gallery</span>
          <span
            className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-semibold ${
              activeTab === "gallery"
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-muted-foreground"
            }`}
          >
            {counts.all}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "testimonials"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "bg-white text-muted-foreground hover:text-foreground hover:bg-slate-100 border border-border"
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Customer Testimonials</span>
        </button>
      </div>

      {activeTab === "testimonials" ? (
        <TestimonialsManager />
      ) : (
        <>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display">
            Project Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Upload images to Cloudinary and synchronize showcase projects in real-time
            with the live website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {items.length === 0 && !loading && (
            <button
              onClick={handleSeed}
              disabled={seedingLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-foreground border border-border transition-all shadow-xs disabled:opacity-50"
            >
              {seedingLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              ) : (
                <Database className="w-3.5 h-3.5 text-primary" />
              )}
              <span>Import Default Portfolio</span>
            </button>
          )}

          <button
            onClick={fetchItems}
            className="p-2.5 rounded-xl bg-white border border-border text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-all shadow-xs"
            title="Refresh list"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin text-primary" : ""}`}
            />
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Image</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Total Projects
          </span>
          <div className="text-2xl font-black text-foreground mt-1">
            {counts.all}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            Swimming Pools
          </span>
          <div className="text-2xl font-black text-primary mt-1">
            {counts.pools}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Landscaping
          </span>
          <div className="text-2xl font-black text-emerald-800 mt-1">
            {counts.landscaping}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
            Outdoor Living
          </span>
          <div className="text-2xl font-black text-amber-800 mt-1">
            {counts.outdoor}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-border shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location, title or category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Categories", count: counts.all },
            { id: "pools", label: "Pools", count: counts.pools },
            { id: "landscaping", label: "Landscaping", count: counts.landscaping },
            { id: "outdoor-living", label: "Outdoor Living", count: counts.outdoor },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Gallery List View */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading project gallery...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl bg-white border border-dashed border-border shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-1">
            No gallery projects found
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mb-5">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search query or category filter."
              : "Your project gallery is currently empty in MongoDB. You can add a new photo or import the default portfolio."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Image</span>
            </button>
            <button
              onClick={handleSeed}
              disabled={seedingLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-foreground text-xs font-semibold transition-all border border-border shadow-xs"
            >
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Import Default Portfolio</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg shadow-xs flex flex-col"
            >
              {/* Thumbnail Image Container */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={item.image || "/images/about-intro-pool.jpg"}
                  alt={item.imageAlt || item.location}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />

                {/* Category Badge overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-primary border border-primary/20 shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Cloudinary indicator */}
                {item.cloudinaryPublicId && (
                  <div
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-semibold bg-sky-50 text-sky-700 border border-sky-200 shadow-xs"
                    title="Stored on Cloudinary CDN"
                  >
                    Cloudinary
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.imageAlt || "Dream Floor Project"}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Delete project"
                    >
                      {deletingId === item._id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add New Project Image */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-border w-full max-w-lg rounded-2xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 text-foreground">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-foreground font-display mb-1">
              Add New Project to Gallery
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Upload high-resolution photography to Cloudinary and set project
              details.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* File Upload Zone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Project Image (Optional)
                </label>

                <div className="border-2 border-dashed border-slate-300 hover:border-primary/60 rounded-xl p-4 text-center bg-slate-50/70 transition-all relative">
                  {uploadPreview ? (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-100">
                      <Image
                        src={uploadPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUploadPreview(null);
                          setFormData((p) => ({
                            ...p,
                            image: "",
                            cloudinaryPublicId: "",
                          }));
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-4">
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          <span className="text-xs text-foreground font-medium">
                            Uploading to Cloudinary CDN...
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-foreground">
                            Click to browse or drop image here
                          </span>
                          <span className="text-[11px] text-muted-foreground mt-1">
                            JPG, PNG, WebP up to 10MB
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadPreview(URL.createObjectURL(file));
                            handleFileUpload(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Direct Image URL input */}
                <div className="mt-2">
                  <span className="text-[10px] text-muted-foreground block mb-1">
                    Or paste direct image URL (Optional):
                  </span>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setUploadPreview(e.target.value);
                    }}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Title / Alt Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Project Title / Alt Text *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, imageAlt: e.target.value })
                  }
                  placeholder="e.g., Luxury Overflow Swimming Pool with Sun Deck"
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Emirates Hills, Dubai"
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {/* Category & Slug in two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  >
                    <option value="pools">Swimming Pools</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="outdoor-living">Outdoor Living</option>
                    <option value="lighting">Garden Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Service Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g., swimming-pool-construction"
                    className="w-full px-3 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Project...</span>
                    </>
                  ) : (
                    <span>Save to Gallery</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Project */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-border w-full max-w-lg rounded-2xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 text-foreground">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-foreground font-display mb-1">
              Edit Project Details
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Update text, category, or replace the photo for this gallery
              item.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Preview and Change Photo */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Image (Optional)
                </label>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-border mb-2">
                  <Image
                    src={uploadPreview || formData.image || "/images/about-intro-pool.jpg"}
                    alt={formData.imageAlt || "Preview"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="text-xs text-foreground font-medium">
                        Uploading new image...
                      </span>
                    </div>
                  )}
                </div>

                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-foreground text-xs font-semibold cursor-pointer transition-colors border border-border">
                  <UploadCloud className="w-3.5 h-3.5 text-primary" />
                  <span>Replace Photo with Cloudinary</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadPreview(URL.createObjectURL(file));
                        handleFileUpload(file);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Title / Alt Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Project Title / Alt Text *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, imageAlt: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {/* Category & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  >
                    <option value="pools">Swimming Pools</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="outdoor-living">Outdoor Living</option>
                    <option value="lighting">Garden Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Service Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
