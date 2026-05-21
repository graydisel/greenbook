# GREENBOOK

Modern frontend bookstore application built with React, TypeScript, Vite, Redux Toolkit, and Material UI.  
The app integrates with the Google Books API, lets users browse by genre, view book details, manage a shopping cart, and place a validated checkout order.

## Why this project

`GREENBOOK` demonstrates a production-style SPA architecture with:

- strong state management using Redux Toolkit
- reusable UI components with Material UI
- form validation via `react-hook-form` + `zod`
- persistent cart state via `localStorage`
- async data fetching and error handling with `createAsyncThunk`

## Core features

- Browse books catalog from Google Books API
- Genre filtering (`Fiction`, `Science`, `History`, `Bestsellers`)
- Featured books section on Home page
- Book details route with category chips and description
- Cart with quantity controls, item removal, and total price
- Checkout flow with schema-based form validation
- In-app toast notifications for key user actions
- Dynamic document title updates by route

## Tech stack

- `React 19`
- `TypeScript`
- `Vite`
- `Redux Toolkit` + `react-redux`
- `React Router`
- `Material UI` + `Emotion`
- `Axios`
- `react-hook-form` + `zod`
- `Vitest` (utility tests)

## Application routes

- `/` - Home (hero, genres, featured books)
- `/books` - Books catalog
- `/book/:id` - Book details
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `*` - Not found fallback

## Project structure

```text
src/
  components/
    common/           # Reusable UI (cards, notifications, contacts, etc.)
    layout/           # Header, footer, route definitions
  pages/              # Route-level views
  redux/
    books/            # Books fetching and selected book state
    bookCart/         # Cart state and persistence
    notification/     # Toast/snackbar queue
  schemas/            # Zod validation schemas
  utils/              # Pricing and featured-books helpers (+ tests)
```

## Environment variables

Create a `.env` file in the project root:

```env
VITE_BOOK_API_KEY=your_google_books_api_key
VITE_LOCAL_STORAGE_KEY=greenbook_cart
```

Notes:

- `VITE_BOOK_API_KEY` is optional, but recommended for stable Google Books API usage.
- `VITE_LOCAL_STORAGE_KEY` controls where cart data is stored in browser `localStorage`.

## Getting started

### 1) Prerequisites

- Node.js `18+` (Node `20+` recommended)
- npm `9+`

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Add `.env` as shown above.

### 4) Start development server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

## Available scripts

- `npm run dev` - start development server
- `npm run build` - type-check and create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

To run unit tests:

```bash
npx vitest
```

## State management overview

The Redux store is split into three slices:

- `books`: stores fetched book lists, loading/error state, and selected book details
- `cart`: stores selected books with quantities, plus local storage hydration/persistence
- `notification`: stores snackbar queue for UX feedback

Cart persistence is automatic through store subscription and rehydration on startup.

## Data flow summary

1. UI dispatches `fetchBooks` or `fetchBookById`.
2. Async thunks call Google Books API via Axios.
3. Redux state updates loading/data/error.
4. Components render based on selectors.
5. Cart actions update state and are persisted in `localStorage`.

## Validation and UX details

- Checkout form uses `zod` schema to validate:
  - full name
  - email
  - address
  - payment method
- Notifications are shown via Material UI `Snackbar` + `Alert`.
- Fallback price generation ensures books without explicit list price can still be purchased.

## Quality and testing

- ESLint configured for TypeScript + React hooks + fast refresh.
- Utility tests are present for featured-book selection behavior (`Vitest`).
- Recommended local checks before opening a PR:

```bash
npm run lint
npm run build
npx vitest
```

## Build and deployment

Create a production build:

```bash
npm run build
```

Output is generated in `dist/`, ready to deploy to any static hosting provider (for example Netlify, Vercel, GitHub Pages, or Nginx).

## Roadmap ideas

- Add pagination / infinite loading for catalog
- Add search input and sorting options
- Add authentication and user orders history
- Expand test coverage to pages and Redux slices
- Introduce CI pipeline for lint/test/build checks

## License

No license file is currently configured in this repository.  
Add a `LICENSE` file if you plan to distribute or open-source this project.
