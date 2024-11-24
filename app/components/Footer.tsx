export default function Footer() {
  return (
    <div className="text-center text-lg bg-gray-100 dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400">
      Built by the Groom 🤵🏻‍♂️ using{" "}
      <a
        href="https://www.cosmicjs.com"
        className="underline"
        target="_blank"
        rel="noreferrer"
      >
        Cosmic
      </a>{" "}
      and{" "}
      <a
        href="https://stripe.com"
        className="underline"
        target="_blank"
        rel="noreferrer"
      >
        Stripe
      </a>{" "}
      .
    </div>
  );
}
