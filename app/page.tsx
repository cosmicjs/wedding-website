// app/page.tsx
import cosmic from "./cosmic";
import DonationForm from "./components/DonationForm";
import Gallery from "./components/Gallery";

async function getHomePage() {
  const { object } = await cosmic.objects
    .findOne({
      type: "home-page",
      slug: "home",
    })
    .props(
      `{
      metadata {
        gallery
        main_image {
          imgix_url
          alt_text
        }
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <div className="w-72 h-72 rounded-full overflow-hidden">
            <img
              src={homePage.metadata.main_image.imgix_url}
              alt={homePage.metadata.main_image.alt_text}
              width={homePage.metadata.main_image.width}
              height={homePage.metadata.main_image.height}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Save the Date
          </h1>
          <h2 className="text-2xl text-gray-700 dark:text-gray-200 mb-2">
            Sarah Davis & Tony Spiro
          </h2>
          <h3 className="text-xl text-gray-600 dark:text-gray-300">
            May 4, 2025
          </h3>
        </div>
        <div className="my-16">
          <DonationForm />
        </div>
        <Gallery media={homePage.metadata.gallery} />
      </div>
    </main>
  );
}
