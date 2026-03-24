import { SanityImage } from "../elements/sanity-image";

export function BrandStripBlock(props: any) {
  const { images = [] } = props;
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full py-12 border-y border-border overflow-hidden bg-background">
      <div className="flex w-full items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
        {images.map((img: any, i: number) => (
          <div key={i} className="w-32 h-16 relative shrink-0">
             <SanityImage image={img} width={200} height={100} className="object-contain w-full h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
