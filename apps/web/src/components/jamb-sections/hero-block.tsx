import type { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@workspace/sanity/client";
import Image from "next/image";

type LocalHeroBlockProps = {
  imageSrc: string;
  links: string[];
};

type SanityHeroBlockProps = {
  _type?: "heroBlock";
  image?: {
    asset?: { _ref?: string | null } | null;
    alt?: string | null;
  } | null;
  links?: Array<{
    label?: string | null;
    href?: string | null;
    _key?: string;
  }> | null;
};

type HeroBlockProps = LocalHeroBlockProps | SanityHeroBlockProps;

function isSanityHeroBlock(props: HeroBlockProps): props is SanityHeroBlockProps {
  return "_type" in props;
}

export function HeroBlock(props: HeroBlockProps) {
  const isSanity = isSanityHeroBlock(props);
  const imageSrc =
    isSanity && props.image?.asset?._ref
      ? urlFor(props.image as unknown as SanityImageSource)
          .width(1800)
          .fit("max")
          .url()
      : !isSanity
        ? props.imageSrc
        : null;
  const links = isSanity
    ? (props.links ?? []).map((link) => ({
        label: link.label ?? "",
        href: link.href ?? "#",
        key: link._key ?? `${link.label}-${link.href}`,
      }))
    : props.links.map((link, index) => ({
        label: link,
        href: "#",
        key: `${link}-${index}`,
      }));
  const imageAlt = isSanity ? (props.image?.alt ?? "Hero") : "Hero";

  return (
    <section className='w-full pb-10'>
      <div className='jamb-shell'>
        <div className='mb-4 w-full overflow-hidden bg-jamb-light'>
          {imageSrc ? (
            <Image
              alt={imageAlt}
              className='h-auto w-full object-cover'
              height={1040}
              priority
              sizes='100vw'
              src={imageSrc}
              width={1800}
            />
          ) : null}
        </div>

        <div className='flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-jamb-gray'>
          {links.map((link, index) => (
            <span key={link.key} className='flex items-center gap-3'>
              <a
                className='text-base font-[550] transition-colors capitalize hover:text-black'
                href={link.href}
              >
                {link.label}
              </a>
              {index < links.length - 1 ? <span className='font-light'>|</span> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
