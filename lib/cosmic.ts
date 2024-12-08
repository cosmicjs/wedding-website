// app/cosmic.ts
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  writeKey: process.env.COSMIC_WRITE_KEY!,
});

export async function getHomePage() {
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
        rsvp_title
        rsvp_message
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

export default cosmic;
