// app/page.tsx
import cosmic from "./cosmic";
import DonationForm from "./components/DonationForm";
import Gallery from "./components/Gallery";
import ScrollArrow from "./components/ScrollArrow";

async function getHomePage() {
  const { object } = await cosmic.objects
    .findOne({
      type: "home-page",
      slug: "home",
    })
    .props(
      `{
      metadata {
        h1
        h2
        h3
        gallery
        main_image {
          imgix_url
          alt_text
        }
        contribute_message
      }
    }`
    )
    .options({
      media: {
        props: "alt_text,width,height",
      },
    });
  return object;
}

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {homePage.metadata.h1}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-2">
            {homePage.metadata.h2}
          </h2>
          <h3 className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {homePage.metadata.h3}
          </h3>
        </div>
        <div className="flex  max-w-5xl mx-auto flex-col md:flex-row md:space-x-12 mb-16">
          <div className="lg:h-[400px] md:w-1/2 flex justify-center mb-12 md:mb-0">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img
                src={`${homePage.metadata.main_image.imgix_url}?w=1000&focus=faces&fit=crop&auto=format`}
                alt={homePage.metadata.main_image.alt_text}
                width={homePage.metadata.main_image.width}
                height={homePage.metadata.main_image.height}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:h-[400px] md:w-1/2 text-center md:text-left">
            <DonationForm
              contributionMessage={homePage.metadata.contribute_message}
            />
          </div>
        </div>
        <ScrollArrow />
        <Gallery media={homePage.metadata.gallery} />
      </div>
    </main>
  );
}
