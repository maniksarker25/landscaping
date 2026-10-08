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
  Star,
  Check,
  AlertCircle,
  Loader2,
  X,
  Database,
  Quote,
  User,
} from "lucide-react";
import type { TestimonialItem } from "@/types/testimonial";

export function TestimonialsManager() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");

  // Notifications
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modals & Actions
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [seedingLoading, setSeedingLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    roleOrLocation: "",
    quote: "",
    rating: 5,
    image: "",
    cloudinaryPublicId: "",
    status: "published",
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

  // Fetch Testimonials
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.data || []);
      } else {
        showToast("error", data.message || "Failed to load testimonials");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Error connecting to testimonials API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Seed default testimonials
  const handleSeed = async () => {
    if (
      !confirm(
        "Do you want to import initial default customer testimonials into MongoDB?",
      )
    )
      return;

    setSeedingLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials/seed", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("success", data.message);
        fetchTestimonials();
      } else {
        showToast("error", data.message || "Seeding failed");
      }
    } catch {
      showToast("error", "Failed to run seed request");
    } finally {
      setSeedingLoading(false);
    }
  };

  // Handle image upload to Cloudinary
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

      showToast("success", "Avatar image uploaded successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      showToast("error", msg);
    } finally {
      setIsUploading(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData({
      name: "",
      roleOrLocation: "Villa Owner, Dubai",
      quote: "",
      rating: 5,
      image: "",
      cloudinaryPublicId: "",
      status: "published",
    });
    setUploadPreview(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      roleOrLocation: item.roleOrLocation || "Client, Dubai",
      quote: item.quote || "",
      rating: item.rating || 5,
      image: item.image || "",
      cloudinaryPublicId: "",
      status: item.status || "published",
    });
    setUploadPreview(item.image || null);
  };

  // Create Testimonial
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("error", "Customer name is required");
      return;
    }
    if (!formData.quote.trim()) {
      showToast("error", "Review quote text is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create testimonial");
      }

      showToast("success", "Testimonial added successfully!");
      setIsAddModalOpen(false);
      fetchTestimonials();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Testimonial
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update testimonial");
      }

      showToast("success", "Testimonial updated successfully!");
      setEditingItem(null);
      fetchTestimonials();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update";
      showToast("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Testimonial
  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to permanently delete this testimonial?")
    )
      return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete");
      }

      showToast("success", "Testimonial deleted successfully");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      showToast("error", msg);
    } finally {
      setDeletingId(null);
    }
  };

  // Computed filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.roleOrLocation &&
          item.roleOrLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.quote.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        selectedRating === "all" ||
        String(item.rating) === selectedRating;

      return matchesSearch && matchesRating;
    });
  }, [items, searchTerm, selectedRating]);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const fiveStars = items.filter((i) => i.rating === 5).length;
    const published = items.filter((i) => i.status !== "draft").length;
    const avg =
      total > 0
        ? (items.reduce((acc, i) => acc + (i.rating || 5), 0) / total).toFixed(1)
        : "5.0";
    return { total, fiveStars, published, avg };
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-primary text-primary-foreground"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground font-display">
            Customer Testimonials
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage reviews displayed on the Homepage, Projects, and Service pages.
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
              <span>Import Default Reviews</span>
            </button>
          )}

          <button
            onClick={fetchTestimonials}
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
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Total Reviews
          </span>
          <div className="text-2xl font-black text-foreground mt-1">
            {stats.total}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
            5-Star Reviews
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {stats.fiveStars}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            Average Rating
          </span>
          <div className="text-2xl font-black text-primary mt-1 flex items-center gap-1.5">
            <span>{stats.avg}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Published Active
          </span>
          <div className="text-2xl font-black text-emerald-800 mt-1">
            {stats.published}
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
            placeholder="Search by customer name, location, or quote..."
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

        {/* Rating Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Ratings" },
            { id: "5", label: "5 Stars ★" },
            { id: "4", label: "4 Stars ★" },
            { id: "3", label: "3 Stars ★" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedRating(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRating === cat.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Testimonials Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading testimonials...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl bg-white border border-dashed border-border shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <Quote className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-1">
            No testimonials found
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mb-5">
            {searchTerm || selectedRating !== "all"
              ? "Try adjusting your search query or rating filter."
              : "Your testimonials collection is currently empty. You can add a new review or import default reviews."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Testimonial</span>
            </button>
            <button
              onClick={handleSeed}
              disabled={seedingLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-foreground text-xs font-semibold transition-all border border-border shadow-xs"
            >
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Import Default Reviews</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-border rounded-2xl p-5 hover:border-primary/40 transition-all hover:shadow-md shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-border shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.roleOrLocation || "Client, Dubai"}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= (item.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-foreground/80 italic leading-relaxed line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer: Status & Actions */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "draft"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {item.status || "published"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Edit testimonial"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Delete testimonial"
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
          ))}
        </div>
      )}

      {/* Modal: Add New Testimonial */}
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
              Add Customer Testimonial
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Add a new client review to highlight on your website.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Customer Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Sarah Johnson"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Role / Location
                  </label>
                  <input
                    type="text"
                    value={formData.roleOrLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        roleOrLocation: e.target.value,
                      })
                    }
                    placeholder="e.g., Villa Owner, Dubai Hills"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
              </div>

              {/* Rating & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Review / Testimonial Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  placeholder="Paste or type the client's review here..."
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                />
              </div>

              {/* Avatar / Photo Upload (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Customer Avatar / Photo (Optional)
                </label>

                <div className="flex items-center gap-3">
                  {uploadPreview ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 border border-border shrink-0">
                      <Image
                        src={uploadPreview}
                        alt="Avatar preview"
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
                        className="absolute top-0 right-0 p-1 bg-black/70 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : null}

                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-foreground text-xs font-semibold cursor-pointer border border-border transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <UploadCloud className="w-4 h-4 text-primary" />
                    )}
                    <span>
                      {isUploading ? "Uploading..." : "Upload Photo to Cloudinary"}
                    </span>
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

                <div className="mt-2">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setUploadPreview(e.target.value);
                    }}
                    placeholder="Or paste direct image URL (Optional)"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Testimonial</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Testimonial */}
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
              Edit Testimonial
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Update client information, quote, or photo.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Customer Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Role / Location
                  </label>
                  <input
                    type="text"
                    value={formData.roleOrLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        roleOrLocation: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
              </div>

              {/* Rating & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Review / Testimonial Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                />
              </div>

              {/* Avatar / Photo Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Customer Avatar / Photo (Optional)
                </label>

                <div className="flex items-center gap-3">
                  {uploadPreview ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 border border-border shrink-0">
                      <Image
                        src={uploadPreview}
                        alt="Avatar preview"
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
                        className="absolute top-0 right-0 p-1 bg-black/70 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : null}

                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-foreground text-xs font-semibold cursor-pointer border border-border transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <UploadCloud className="w-4 h-4 text-primary" />
                    )}
                    <span>
                      {isUploading ? "Uploading..." : "Replace Photo with Cloudinary"}
                    </span>
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

                <div className="mt-2">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setUploadPreview(e.target.value);
                    }}
                    placeholder="Or paste direct image URL (Optional)"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
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
    </div>
  );
}
