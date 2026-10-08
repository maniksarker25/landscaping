import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  location: string;
  image: string;
  imageAlt: string;
  category: string;
  slug?: string;
  cloudinaryPublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    location: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
      default: "/images/about-intro-pool.jpg",
    },
    imageAlt: {
      type: String,
      required: [true, "Image alt text / description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
      default: "pools",
    },
    slug: {
      type: String,
      trim: true,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent re-compilation of model in Next.js hot-reloading
export const GalleryModel: Model<IGalleryItem> =
  mongoose.models.Gallery ||
  mongoose.model<IGalleryItem>("Gallery", GallerySchema);
