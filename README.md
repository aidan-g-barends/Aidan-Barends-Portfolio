# Aidan Barends — Portfolio

My personal developer portfolio, built from scratch with Next.js, TypeScript, and Tailwind CSS.

**Live site:** [aidan-barends.vercel.app](https://aidan-barends.vercel.app)

## About

I'm a Software Engineering student at CPUT (Application Development), currently working as an IT Field Technician while building toward a career as a Full Stack and AI Engineer. This portfolio showcases my projects, skills, and experience, and was built as a full learning project — from initial planning through deployment.

## Features

- Fully responsive design with light and dark mode (persisted via `localStorage`)
- Dynamic project pages generated from a single shared data source
- Working contact form powered by Web3Forms
- Full SEO setup: per-page metadata, Open Graph previews, and an auto-generated sitemap
- Accessible by design: skip-to-content link, semantic HTML, keyboard-navigable
- 100/100 Lighthouse scores across Performance, Best Practices, and SEO

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide
- **Forms:** [Web3Forms](https://web3forms.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/aidan-g-barends/Aidan-Barends-Portfolio.git
cd Aidan-Barends-Portfolio
npm install
```

Create a `.env.local` file in the project root with your own Web3Forms access key:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Pages (Next.js App Router)
├── components/       # Reusable UI components
└── data/             # Project data (single source of truth)
```

## Author

**Aidan Barends**
[GitHub](https://github.com/aidan-g-barends) · [LinkedIn](https://www.linkedin.com/in/aidan-barends/) · [Email](mailto:aidanbarends95@gmail.com)