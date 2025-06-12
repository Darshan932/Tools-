# AI Tools Website

A scalable, SEO-optimized website featuring 400+ useful AI tools across various categories including writing, design, productivity, file conversion, education, finance, resume building, image editing, voice tools, PDF tools, and more.

## Features

- **Fast & Responsive**: Optimized for both mobile and desktop
- **Clear UI/UX**: Intuitive input/output interfaces with examples
- **Modular Architecture**: Easy to add or remove tools
- **SEO Optimized**: Dynamic routing and metadata
- **AdSense Integration**: Automatic ad placement
- **Dark Mode Support**: Modern, minimal UI with Tailwind CSS
- **Admin Panel**: Tool management and analytics

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB (for tool configurations and analytics)
- **Deployment**: Vercel

## Project Structure

```
/
├── components/         # Reusable UI components
├── layouts/            # Page layouts
├── lib/                # Utility functions
├── models/             # Database models
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── admin/          # Admin panel
│   ├── tools/          # Tool pages
│   └── categories/     # Category pages
├── public/             # Static assets
├── styles/             # Global styles
├── tools/              # Tool configurations
└── utils/              # Helper functions
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding New Tools

Tools are configured as JSON modules in the `tools` directory. To add a new tool:

1. Create a new JSON file in the appropriate category folder
2. Define the tool's metadata, UI components, and functionality
3. The tool will automatically be added to the website

## License

MIT