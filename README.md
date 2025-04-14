<img src="images/Svelte-Supabase-SSO-authentication.png"/>

This is an example project implementing Google and Kakao social login functionality using Supabase and SvelteKit.

## Features

- Supabase authentication system integrated with SvelteKit
- Google OAuth login implementation
- Kakao OAuth login implementation
- Responsive login interface with custom styled buttons
- Authentication state management using Svelte stores
- Callback page to handle OAuth redirections
- Error handling and loading state management
- Environment configuration for Supabase connection

## Tech Stack

- **SvelteKit**: Frontend framework
- **Supabase**: BaaS (Backend-as-a-Service) for authentication and user management
- **TailwindCSS**: Utility-first CSS framework for styling
- **Flowbite**: Svelte UI component library
- **OAuth 2.0**: Authentication protocol used by Google and Kakao

## Getting Started

1. Clone the project:
```bash
git clone https://github.com/yourusername/supabase-sveltekit-sso-authentication.git
cd supabase-sveltekit-sso-authentication
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
- Copy the `.env.example` file to `.env`.
- Get the URL and Anon Key from your Supabase project and set them in the `.env` file.

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Check in your browser:
```
http://localhost:5173
```

## Setting Up Supabase

1. Create a [Supabase](https://supabase.io/) account and create a new project.
2. Go to Authentication settings and enable the Google and Kakao authentication providers.
3. Set up the OAuth client ID and secret for each provider.
4. Set the redirect URL to `http://localhost:5173/callback`.

## Deployment

Build a production version:
```bash
npm run build
# or
pnpm build
```

Preview the build:
```bash
npm run preview
# or
pnpm preview
```

> Note: You may need to install an [adapter](https://svelte.dev/docs/kit/adapters) appropriate for your actual deployment environment.
