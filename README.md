# BookNook

BookNook is a book discovery and borrowing app. Explore the catalog, learn about a title, and manage your book selections with a personal account.

## Live site

**URL:** `https://YOUR-BOOKNOOK-LIVE-URL`

Replace the placeholder above with the deployed client URL.

## Features

- Browse the public book collection without signing in.
- View book details, including author, category, cover, description, and available copies.
- Create an account and sign in with email and password.
- Add books to the collection and update or remove book listings.
- Book a title and review your bookings on the My Book Bookings page.
- Save books to My Books and remove them from your saved list.
- Use a responsive interface designed for desktop and mobile screens.
- Protect account and book management requests with JWT authentication.

## Tech stack

- Next.js App Router and React
- TypeScript and Tailwind CSS
- Better Auth with its JWT plugin
- Express API and MongoDB

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the required configuration:

   ```env
   BETTER_AUTH_SECRET=your-long-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your-mongodb-connection-string
   NEXT_PUBLIC_API_URL=http://localhost:5000
   BOOKS_API_URL=http://localhost:5000/all-books
   ```

3. Start the client:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

The Express API must also be running on port `5000`. Configure `AUTH_JWKS_URL` in the server environment if the Better Auth JWKS endpoint is not at `http://localhost:3000/api/auth/jwks`.
