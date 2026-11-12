# Library Management System

## Run the application

The React frontend lives in `library-management-system/frontend`; the Express API and SQLite database live in `library-management-system/backend`.

1. In `library-management-system/frontend`, run `npm install` once, then `npm run dev`.
2. In `library-management-system/backend`, run `npm start`.
3. Open the Vite URL shown in the frontend terminal (normally `http://localhost:5173`). The Vite development server proxies `/students` requests to the API on port `5000`.

For a production-style build, run `npm run build` in the frontend directory, then start the backend. Express serves the generated `frontend/dist` application and its assets.

The frontend uses the existing `/students` API. Student registration dates are not part of the current database/API fields, so the details dialog marks that information as unavailable.