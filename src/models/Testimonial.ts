import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  roleOrLocation: string;
  quote: string;
  rating: number;
  image?: string;
  cloudinaryPublicId?: string;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    roleOrLocation: {
      type: String,
      default: "Client, Dubai",
      trim: true,
    },
    quote: {
      type: String,
      required: [true, "Customer review / quote is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "published",
      enum: ["published", "draft"],
    },
  },
  {
    timestamps: true,
  },
);

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
