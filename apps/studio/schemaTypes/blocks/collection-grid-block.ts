import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const collectionGridBlock = defineType({
  name: "collectionGridBlock",
  title: "Collection Grid Block",
  type: "object",
  icon: LayoutGrid as any,
  fields: [
    defineField({
      name: "sectionId",
      title: "Section Anchor ID",
      type: "string",
      description:
        "Optional anchor for in-page navigation, for example fireplaces-grid, lighting-grid, furniture-grid, or journal.",
    }),
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "collectionItem",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "sizeAspect",
              title: "Size Aspect",
              type: "string",
              options: {
                list: [
                  { title: "Standard (1x1)", value: "standard" },
                  { title: "Wide (2x1)", value: "wide" },
                  { title: "Tall (1x2)", value: "tall" },
                  { title: "Large (2x2)", value: "large" },
                ],
              },
              initialValue: "standard",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Collection Grid",
        subtitle: "Collection grid with adaptive image sizing",
      };
    },
  },
});
