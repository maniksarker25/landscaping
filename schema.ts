const mongoose = require("mongoose");

const { Schema } = mongoose;

// Hero Section

const HeroContentSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    subheadline: String,
    bgImage: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      default: "Get Free Quote",
    },
    ctaLink: {
      type: String,
      default: "/contact-us",
    },
  },
  { _id: false },
);

// Feature Item

const FeatureItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    iconUrl: String,
  },
  { _id: false },
);

// Gallery Item

const GalleryItemSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    caption: String,
    altText: String,
  },
  { _id: false },
);

// FAQ Item

const AccordionItemSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// CTA Banner

const CtaContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    buttonText: {
      type: String,
      default: "Contact Us",
    },
    buttonLink: {
      type: String,
      default: "/contact-us",
    },
    phoneNumber: String,
  },
  { _id: false },
);

// Block Content

const BlockContentSchema = new Schema(
  {
    hero: HeroContentSchema,
    richTextHtml: String,
    features: [FeatureItemSchema],
    gallery: [GalleryItemSchema],
    accordionItems: [AccordionItemSchema],
    cta: CtaContentSchema,
  },
  { _id: false },
);

// Page Block

const BlockSchema = new Schema(
  {
    blockType: {
      type: String,
      required: true,
      enum: [
        "hero_section",
        "rich_text_jodit",
        "features_grid",
        "gallery_grid",
        "faq_accordion",
        "cta_banner",
        "technical_specs",
        "contact_form",
      ],
    },

    order: {
      type: Number,
      default: 0,
    },

    layoutStyle: {
      type: String,
      enum: [
        "grid_2_col",
        "grid_3_col",
        "grid_4_col",
        "grid_6_col",
        "default",
        "full_width",
        "container_centered",
        "two_column_split",
        "card_grid",
        "accent_bg",
      ],
      default: "grid_3_col",
    },

    content: {
      type: BlockContentSchema,
      required: true,
    },
  },
  {
    _id: true,
  },
);

// Service Schema

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Pools", "Landscaping"],
      default: "Pools",
    },

    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },

    featuredImage: {
      type: String,
      required: true,
    },

    sections: [BlockSchema],

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
      ogImage: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
