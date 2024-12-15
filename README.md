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

Create an `.env` file
```bash
mv .example.env .env
```
Add your environment variables.
```bash
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

[Cosmic Documentation](https://www.cosmicjs.com/docs) - learn about Cosmic features and API.
