import { getHomePage } from "@/lib/cosmic";
import { ImageResponse } from "next/og";

export default async function Image() {
  const homePage = await getHomePage();
  console.log(homePage.metadata.main_image.imgix_url);
  return new ImageResponse(
    (
      <img
        src={`${homePage.metadata.main_image.imgix_url}?w=1000&h=600&fit=crop`}
      />
    )
  );
}
