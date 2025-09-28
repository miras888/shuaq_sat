# Shuaq SAT Frontend

A modern web application built with React, TypeScript, and Vite that provides SAT Math preparation for students from rural areas and beyond.

## Features

- 🔐 Secure authentication with email/password and Google sign-in
- 🌓 Dark/light theme support
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🚀 Fast development with Vite
- 💪 Type safety with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shuaq_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project and get your configuration:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable Authentication and set up Email/Password and Google sign-in methods
   - Get your Firebase configuration object

4. Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication-related components
│   ├── layout/       # Layout components
│   └── ui/           # Generic UI components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
