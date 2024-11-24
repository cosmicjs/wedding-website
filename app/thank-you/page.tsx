import Link from "next/link";
import cosmic from "@/lib/cosmic";

async function getThankYouPage() {
  const { object } = await cosmic.objects
    .findOne({
      type: "thank-you-page",
      slug: "thank-you",
    })
    .props(
      `{
      metadata {
        image {
          imgix_url
          alt_text
        }
        message
      }
    }`
    )
    .options({
      media: {
        props: "alt_text",
      },
    });
  return object;
}

export default async function ThankYou() {
  const thankYouPage = await getThankYouPage();
  return (
    <div className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="flex justify-center">
        <div className="w-72 h-72 rounded-full overflow-hidden">
          <img
            src={thankYouPage.metadata.image.imgix_url}
            alt={thankYouPage.metadata.image.alt_text}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-4xl mb-10 font-bold text-gray-900 dark:text-white">
            Thank You!
          </h1>
          <div
            className="text-lg max-w-xl text-gray-600 dark:text-gray-300 mb-8 text-left"
            dangerouslySetInnerHTML={{ __html: thankYouPage.metadata.message }}
          />
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
