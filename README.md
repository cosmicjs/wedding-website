## Wedding Website

<a href="https://cosmic-wedding-website.vercel.app/">
  <img src="https://imgix.cosmicjs.com/bf1b7fa0-bb21-11ef-bee4-3bb1d3c55332-wedding-website.png?w=1200&auto=format">
</a>

[View the demo](https://cosmic-wedding-website.vercel.app/)

## Getting started

Install the Wedding Website template in Cosmic to install the required content model and demo content.

Download the code.
```bash
git clone https://github.com/cosmicjs/wedding-website
cd wedding-website
npm i
# or
yarn i
# or
bun i
# or
pnpm i
```

Add your environment variables.
```bash
mv .example.env .env
# .env
COSMIC_BUCKET_SLUG=
COSMIC_READ_KEY=
COSMIC_WRITE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

NEXT_PUBLIC_BITCOIN_ADDRESS=
```
1. Find your Cosmic API keys in [Cosmic > Project > API Keys](https://app.cosmicjs.com/login).
2. Add your [Stripe API keys](https://stripe.com/).
3. Add your [Recapcha keys](https://www.google.com/recaptcha/about/).
4. Add a Bitcoin address (optional)

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
