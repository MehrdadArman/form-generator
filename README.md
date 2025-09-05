# Form Generator

A dynamic form generator built with React, TypeScript, and Material-UI.

## Features

- Create dynamic forms with text, checkbox fields
- Form builder with drag-and-drop interface
- Real-time validation using React Hook Form + Yup
- Conditional logic for show/hide fields
- Persistent storage with Zustand
- Responsive Material-UI design

## Tech Stack

- React 18 + TypeScript
- Vite
- Material-UI (MUI) v5
- Zustand
- React Hook Form + Yup
- React Router DOM
- Vitest + React Testing Library

## Installation

```bash
# Clone and install
git clone <repository-url>
cd communere-form
npm install

# Start development server
npm run dev
```

## Usage

1. **Create Form**: Click "Create Form" → Add elements → Save
2. **View Form**: Click "View" on any form card → Fill and submit
3. **Edit Form**: Click "Edit" to modify existing forms

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run test     # Run tests
npm run preview  # Preview build
```

## Project Structure

```
src/
├── components/    # UI components (atoms/molecules/organisms)
├── pages/         # Application pages
├── hooks/         # Custom React hooks
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── constants/     # Application constants
├── routes/        # Routing configuration
└── providers/     # Context providers
```
