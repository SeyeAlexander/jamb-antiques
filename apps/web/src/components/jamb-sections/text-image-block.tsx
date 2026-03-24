import type { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@workspace/sanity/client";
import Image from "next/image";
import { PortableText } from "next-sanity";

import { ScrollReveal } from "@/components/scroll-reveal";

type LocalTextImageBlockProps = {
  sectionTitle?: string;
  smallImgSize?: boolean;
  heading: string;
  body: string;
  buttons?: { label: string; href: string }[];
  imageSrc: string;
  direction?: "left" | "right";
  secondaryBg?: string;
};

type SanityTextImageBlockProps = {
  _type?: "textImageBlock";
  heading?: string | null;
  sectionTitle?: string | null;
  secondaryBg?: string | null;
  smallImgSize?: boolean;
  body?: unknown[];
  imagePosition?: "left" | "right" | null;
  image?: {
    asset?: { _ref?: string | null } | null;
    alt?: string | null;
  } | null;
  buttons?: Array<{
    label?: string | null;
    href?: string | null;
  }> | null;
};

type TextImageBlockProps = LocalTextImageBlockProps | SanityTextImageBlockProps;

function isSanityBlock(props: TextImageBlockProps): props is SanityTextImageBlockProps {
  return "_type" in props;
}

export function TextImageBlock(props: TextImageBlockProps) {
  const isSanity = isSanityBlock(props);
  const heading = props.heading ?? "";
  const direction = isSanity ? (props.imagePosition ?? "right") : (props.direction ?? "right");
  const buttons = isSanity
    ? (props.buttons ?? []).map((button) => ({
        label: button.label ?? "",
        href: button.href ?? "#",
      }))
    : (props.buttons ?? []);
  const secondaryBg = isSanity ? props.secondaryBg : props.secondaryBg;
  const sectionTitle = isSanity ? props.sectionTitle : props.sectionTitle;
  const imageSrc =
    isSanity && props.image?.asset?._ref
      ? urlFor(props.image as unknown as SanityImageSource)
          .width(1400)
          .fit("max")
          .url()
      : !isSanity
        ? props.imageSrc
        : null;
  const imageAlt = isSanity ? (props.image?.alt ?? heading) : heading;
  const smallImgSize = isSanity ? props.smallImgSize : props.smallImgSize;

  return (
    <section
      className='w-full py-20'
      style={secondaryBg ? { backgroundColor: secondaryBg } : undefined}
    >
      <div className='jamb-shell'>
        <div
          className={`flex flex-col items-center gap-8 md:gap-0 ${direction === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <ScrollReveal
            className='flex w-full flex-col items-center px-4 text-base md:w-1/2 md:px-12'
            direction={direction === "left" ? "right" : "left"}
          >
            {props.sectionTitle ? (
              <p className='jamb-kicker mb-4 capitalize'>{props.sectionTitle}</p>
            ) : null}

            <h2 className='jamb-heading mb-6 max-w-80 text-center'>{heading}</h2>

            {isSanity ? (
              <PortableText
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className='jamb-copy mb-8 max-w-100'>{children}</p>
                    ),
                  },
                }}
                value={(props.body ?? []) as any}
              />
            ) : (
              <p className='jamb-copy mb-8 max-w-100 '>{props.body}</p>
            )}

            {buttons.length > 0 ? (
              <div className='flex flex-col items-center gap-2'>
                {buttons.map((button, index) => (
                  <a
                    key={index}
                    className='jamb-outline-button w-fit tracking-wider hover:border-black hover:text-black'
                    href={button.href}
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            ) : null}
          </ScrollReveal>

          <ScrollReveal
            className='flex w-full justify-center md:w-1/2'
            delay={120}
            direction={direction === "left" ? "left" : "right"}
          >
            <div
              className={`relative w-full overflow-hidden bg-jamb-light ${smallImgSize ? "max-h-140 max-w-100" : "max-h-182 max-w-145"}`}
              style={{ aspectRatio: "4 / 5" }}
            >
              {imageSrc ? (
                <Image
                  alt={imageAlt}
                  className='object-cover transition-transform duration-700 ease-out hover:scale-[1.015]'
                  fill
                  sizes='(min-width: 1024px) 42vw, 100vw'
                  src={imageSrc}
                />
              ) : (
                <div className='flex h-full items-center justify-center text-sm text-jamb-ink-soft'>
                  Image pending
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
