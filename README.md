# MentorLagbe

## Purpose
MentorLagbe is a full-stack, role-based tuition and mentorship platform. It connects students with qualified tutors by subject, class level, mode (Online/Offline), and monthly budget, while admins moderate listings, users, and Pro subscription payments.

## Live URL: 
- Client: 
- Server:
  
## Admin Credentials
- Email: admin@example.com
- Password: your-admin-password

## Key Features
- Role-based authentication (Student, Tutor, Admin) with BetterAuth and Google login
- JWT stored in an HttpOnly cookie and verified by Express middleware (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`)
- Server-side search, filter (subject, class level, mode), and pagination on Browse Tuitions
- Tuition details page with role-restricted apply form (students only) and duplicate application prevention
- Tutor dashboard: post, edit, delete, and open/close tuitions; manage applicants (accept/reject)
- Free tutors can post up to 2 tuitions; Pro tutors can post unlimited
- Student dashboard: stats overview and my applications with a cancel option for pending requests
- Admin dashboard: platform stats, approve/reject tuitions, manage user roles, view Stripe transactions
- Stripe Checkout for Pro plan (Tutor $15, Student $10) with payment verification
- ImgBB image upload for tuition banners and profile pictures
- Dark/light theme toggle, responsive design, loading skeletons, custom 404 and error pages
- Toast notifications for all actions
- Seeded realistic connected data (tutors, tuitions, applications)

## Tech Stack
- Frontend: Next.js (App Router), JavaScript, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express.js, MongoDB
- Auth: BetterAuth with MongoDB adapter, JWT
- Payment and media: Stripe, ImgBB

## NPM Packages

### Client
- next
- react, react-dom
- better-auth
- tailwindcss
- shadcn, @base-ui/react, class-variance-authority, tw-animate-css
- sonner
- framer-motion
- next-themes
- react-icons
- lucide-react

### Server
- express
- cors
- mongodb
- better-auth
- @better-auth/mongo-adapter
- jose
- stripe
- dotenv


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
