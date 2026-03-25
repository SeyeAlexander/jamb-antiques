import { SplitSquareHorizontal } from "lucide-react";
import { defineField, defineType } from "sanity";

export const textImageBlock = defineType({
  name: "textImageBlock",
  title: "Text & Image Block",
  type: "object",
  icon: SplitSquareHorizontal as any,
  fields: [
    defineField({
      name: "sectionId",
      title: "Section Anchor ID",
      type: "string",
      description:
        "Optional anchor for in-page navigation, for example fireplaces, lighting, furniture, or journal.",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description: "Optional small title shown above the main heading.",
    }),
    defineField({
      name: "smallImgSize",
      title: "Small Image Size",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "secondaryBg",
      title: "Secondary Background",
      type: "string",
      description:
        "Optional CSS color value for the block background, for example #DFDAD7 or var(--color-jamb-surface).",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          name: "button",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Link URL" }),
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
        title: title || "Text & Image",
        subtitle: "Text & Image Block",
      };
    },
  },
});
