# My Portfolio - Next.js Project

Portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

> 🚀 **Getting Started?** Follow the setup instructions below!

## 🚀 Project Structure

This Next.js project uses the App Router with the following structure:

```text
/
├── public/           # Static assets (images, icons, etc.)
├── app/              # App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # Reusable React components
│   └── ui/          # UI components (shadcn/ui)
├── lib/             # Utility functions
└── hooks/           # Custom React hooks
```

This project uses:
- **Next.js 15** with App Router
- **React 19** for the latest React features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation & Running

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Install dependencies                             |
| `pnpm dev`                | Start development server at `localhost:3000`    |
| `pnpm build`              | Build production version to `./.next/`          |
| `pnpm start`              | Start production server                          |
| `pnpm lint`               | Run ESLint for code quality checks              |

## 🎨 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Package Manager:** pnpm

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd myportofolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
