import { getHomePage } from "@/lib/cosmic";
import { ImageResponse } from "next/og";

export default async function Image() {
  const homePage = await getHomePage();
  return new ImageResponse(
    (
      <img
        src={`${homePage.metadata.main_image.imgix_url}?w=1200&auto=compress`}
      />
    )
  );
}
