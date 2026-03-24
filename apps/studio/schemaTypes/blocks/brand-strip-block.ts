import { GalleryHorizontalEnd } from "lucide-react";
import { defineField, defineType } from "sanity";

export const brandStripBlock = defineType({
  name: "brandStripBlock",
  title: "Brand Strip Block",
  type: "object",
  icon: GalleryHorizontalEnd as any,
  fields: [
    defineField({
      name: "images",
      title: "Strip Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare({ images }) {
      return {
        title: "Brand/Product Strip",
        subtitle: `${images?.length || 0} images`,
      };
    },
  },
});
