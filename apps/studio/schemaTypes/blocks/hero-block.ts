import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "object",
  icon: ImageIcon,
  fields: [
    imageWithAltField({
      name: "image",
      title: "Hero Image",
    }),
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              initialValue: "#",
              description:
                "Use homepage anchors like #fireplaces, #lighting, #furniture, or #journal to scroll to sections on the page.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Hero Block",
        subtitle: "Full-width hero image with inline links",
        media,
      };
    },
  },
});
