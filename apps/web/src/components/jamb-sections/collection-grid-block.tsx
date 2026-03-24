import type { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@workspace/sanity/client";
import Image from "next/image";

type SizeAspect = "standard" | "wide" | "tall" | "large";

type LocalCollectionItem = {
  imageSrc: string;
  title: string;
  subtitle: string;
  width?: number;
  height?: number;
  sizeAspect?: SizeAspect;
};

type CollectionGridItem = {
  title?: string | null;
  subtitle?: string | null;
  sizeAspect?: SizeAspect | null;
  image?: {
    id?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
    asset?: { _ref?: string | null } | null;
  } | null;
  imageSrc?: string;
  width?: number;
  height?: number;
};

type CollectionGridBlockProps =
  | {
      heading: string;
      items: LocalCollectionItem[];
    }
  | {
      _type?: "collectionGridBlock";
      heading?: string | null;
      items?: CollectionGridItem[] | null;
    };

function getAspectRatio(item: CollectionGridItem): string {
  switch (item.sizeAspect) {
    case "wide":
      return "4 / 3";
    case "tall":
      return "4 / 5";
    case "large":
      return "5 / 4";
    case "standard":
      return "1 / 1";
    default: {
      const width = item.image?.width ?? item.width;
      const height = item.image?.height ?? item.height;
      return width && height ? `${width} / ${height}` : "1 / 1";
    }
  }
}

function buildImageSource(item: CollectionGridItem) {
  if (item.imageSrc) {
    return item.imageSrc;
  }

  if (!item.image?.asset?._ref) {
    return null;
  }

  return urlFor(item.image as unknown as SanityImageSource)
    .width(1200)
    .fit("max")
    .url();
}

function normalizeItems(props: CollectionGridBlockProps): {
  heading: string;
  items: CollectionGridItem[];
} {
  return {
    heading: props.heading ?? "",
    items: props.items ?? [],
  };
}

export function CollectionGridBlock(props: CollectionGridBlockProps) {
  const { heading, items } = normalizeItems(props);

  if (!items.length) {
    return null;
  }

  return (
    <section className='w-full bg-jamb-grid py-10'>
      <div className='jamb-shell'>
        <div className='w-full'>
          <h2 className='mb-8 text-center text-[21px] font-medium text-black'>{heading}</h2>

          <div className='flex flex-wrap justify-center gap-x-(--jamb-grid-gap) gap-y-12'>
            {items.map((item, index) => {
              const src = buildImageSource(item);
              const imageAlt = item.image?.alt ?? item.title ?? `${heading} item ${index + 1}`;

              return (
                <article
                  key={index}
                  className='flex w-full max-w-md flex-col items-center text-base sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-6rem)/5)]'
                >
                  <div
                    className='relative mb-4 w-full overflow-hidden bg-jamb-dark'
                    style={{ aspectRatio: getAspectRatio(item) }}
                  >
                    {src ? (
                      <Image
                        alt={imageAlt}
                        className='object-contain'
                        fill
                        sizes='(min-width: 1280px) 18vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw'
                        src={src}
                      />
                    ) : null}
                  </div>

                  <h3 className='font-bold text-jamb-ink-muted'>{item.title}</h3>
                  <p className='font-medium text-jamb-ink-soft'>{item.subtitle}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
