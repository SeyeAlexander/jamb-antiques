import { sanityFetch } from "@workspace/sanity/live";
import { queryHomePageData } from "@workspace/sanity/query";

import { CollectionGridBlock } from "@/components/jamb-sections/collection-grid-block";
import { HeroBlock } from "@/components/jamb-sections/hero-block";
import { TextImageBlock } from "@/components/jamb-sections/text-image-block";
import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

async function fetchHomePageData() {
  return await sanityFetch({
    query: queryHomePageData,
  });
}

const grid1Items = Array.from({ length: 4 }, () => ({
  imageSrc: "/gridImg1.png",
  title: "Lorem Ipsum",
  subtitle: "Subtitle",
  width: 333,
  height: 244,
}));

const grid2Items = Array.from({ length: 5 }, () => ({
  imageSrc: "/gridImg2.png",
  title: "Lorem Ipsum",
  subtitle: "Subtitle",
  width: 186,
  height: 253,
}));

const grid3Items = [
  { imageSrc: "/gridImg3.png", title: "Lorem Ipsum", subtitle: "Subtitle", width: 189, height: 253 },
  { imageSrc: "/gridImg4.png", title: "Lorem Ipsum", subtitle: "Subtitle", width: 233, height: 187 },
  { imageSrc: "/gridImg5.png", title: "Lorem Ipsum", subtitle: "Subtitle", width: 233, height: 186 },
  { imageSrc: "/gridImg6.png", title: "Lorem Ipsum", subtitle: "Subtitle", width: 232, height: 232 },
  { imageSrc: "/gridImg7.png", title: "Lorem Ipsum", subtitle: "Subtitle", width: 232, height: 152 },
];

const grid4Items = Array.from({ length: 4 }, () => ({
  imageSrc: "/gridImg8.png",
  title: "Lorem Ipsum",
  subtitle: "Subtitle",
  width: 196,
  height: 253,
}));

export async function generateMetadata() {
  const { data: homePageData } = await fetchHomePageData();
  return getSEOMetadata({
    title: homePageData?.title ?? homePageData?.seoTitle,
    description: homePageData?.description ?? homePageData?.seoDescription,
    slug: "/",
    contentId: homePageData?._id,
    contentType: homePageData?._type,
  });
}

function HomePageFallback() {
  return (
    <main className='jamb-stack w-full pt-24'>
      <HeroBlock
        imageSrc='/header.png'
        links={["Fireplaces", "Lighting", "Furniture", "Journal"]}
      />

      <TextImageBlock
        body='Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magn ad minim veniam.'
        buttons={[
          { label: "Explore our Fireplaces", href: "#" },
          { label: "Sell an Antique Chimneypiece", href: "#" },
        ]}
        direction='right'
        heading='Fireplaces'
        imageSrc='/textImg1.png'
      />

      <TextImageBlock
        body='Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magna ad minim veniam.'
        buttons={[{ label: "Explore our Lighting", href: "#" }]}
        direction='right'
        heading='Lighting'
        imageSrc='/textImg2.png'
      />

      <CollectionGridBlock heading='Our latest Chimneypieces' items={grid1Items} />
      <CollectionGridBlock heading='Our latest Lighting' items={grid2Items} />

      <TextImageBlock
        body='Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magna ad minim veniam.'
        buttons={[{ label: "Explore our Furniture", href: "#" }]}
        direction='right'
        heading='Furniture'
        imageSrc='/textImg3.png'
      />

      <CollectionGridBlock heading='Our latest Furniture' items={grid3Items} />

      <TextImageBlock
        body='Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magna ad minim veniam.'
        buttons={[{ label: "Discover more", href: "#" }]}
        direction='right'
        heading='The Grand Collection'
        imageSrc='/textImg4.png'
        secondaryBg='var(--color-jamb-surface)'
        sectionTitle='Journal'
      />

      <CollectionGridBlock heading='See more of our latest stories' items={grid4Items} />

      <TextImageBlock
        body='Lorem ipsum dolor sit amet, incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim labore et dolore magna ad minim veniam.'
        buttons={[{ label: "Discover more", href: "#" }]}
        direction='right'
        heading='Subscribe to the JAMB Journal'
        imageSrc='/textImg5.png'
        smallImgSize
      />
    </main>
  );
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData?.pageBuilder?.length) {
    return <HomePageFallback />;
  }

  return (
    <PageBuilder
      id={homePageData._id}
      pageBuilder={homePageData.pageBuilder}
      type={homePageData._type}
    />
  );
}
