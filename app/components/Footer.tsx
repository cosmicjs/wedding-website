import cosmic from "@/lib/cosmic";

async function getFooter() {
  const { object } = await cosmic.objects
    .findOne({
      type: "site-settings",
      slug: "site-settings",
    })
    .props("metadata.footer");
  return object;
}

export default async function Footer() {
  const footer = await getFooter();
  return (
    <div
      className="text-center text-lg bg-gray-100 dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400"
      dangerouslySetInnerHTML={{ __html: footer.metadata.footer }}
    />
  );
}
