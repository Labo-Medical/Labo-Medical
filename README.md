# Labo-Medical - Medical Laboratory Management System

A modern, multi-language web application for medical laboratory management built with React, TypeScript, and Vite.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Multi-Language Support](#multi-language-support)
- [Translation System](#translation-system)
- [RTL Support](#rtl-support)
- [Contributing](#contributing)

## Overview

Labo-Medical is a comprehensive web application designed for medical laboratory management. It provides an intuitive interface for patients, healthcare professionals, and laboratory staff to manage appointments, view results, access resources, and handle administrative tasks.

The application supports multiple languages and includes full internationalization features, making it accessible to a diverse user base.

## Features

### Core Functionality
- Multi-Laboratory Support: Manage multiple laboratory locations (Kawassim, Souani, Charf)
- Patient Portal: Appointment booking, result viewing, and FAQ section
- Professional Area: Catalogs, recommendations, central purchasing, and document resources
- Specialties Management: Biological specialties organization and information
- Contact & Feedback: Integrated contact forms and suggestion system

### Technical Features
- Responsive Design: Mobile-first approach with modern UI/UX
- Multi-Language Support: Spanish, French, English, and Arabic
- RTL Support: Right-to-left layout for Arabic language
- SEO Optimized: Meta tags and structured content
- Performance Optimized: Code splitting and lazy loading

## Technology Stack

### Frontend
- React 18.3.1: Modern React with hooks and concurrent features
- TypeScript: Type-safe development with full type definitions
- Vite 6.3.5: Lightning-fast build tool and development server
- React Router DOM 7.6.0: Client-side routing and navigation

### Internationalization
- react-i18next: Complete i18n solution for React applications
- i18next: Powerful internationalization framework

### Styling & UI
- CSS Modules: Component-scoped styling
- Framer Motion: Smooth animations and transitions
- React Helmet Async: Dynamic head management for SEO

### Development Tools
- ESLint: Code linting and style enforcement
- TypeScript Compiler: Type checking and compilation

## Project Structure

```
Labo-Medical/
├── public/                          # Static assets
│   ├── favicon.png
│   ├── logo.jpg
│   ├── annonces/                   # Announcement images
│   ├── automates/                  # Equipment images
│   ├── blog/                       # Blog images
│   ├── docs/                       # PDF documents
│   ├── fond/                       # Background images
│   ├── icons/                      # Icon assets
│   ├── partenaires/               # Partner logos
│   ├── pattern/                   # Pattern images
│   ├── plateau/                   # Laboratory images
│   └── politics/                  # Policy documents
│
├── src/                            # Source code
│   ├── components/                 # Reusable UI components
│   │   ├── Header.tsx             # Main navigation header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── LanguageSwitcher.tsx   # Language selection component
│   │   ├── FloatingLanguageSwitcher.tsx # Floating language selector
│   │   ├── Valeur.tsx             # Values/principles component
│   │   └── ...                    # Other components
│   │
│   ├── pages/                      # Page-level components
│   │   ├── Home.tsx               # Homepage
│   │   ├── About.tsx              # About page
│   │   ├── Patient.tsx            # Patient portal
│   │   ├── Pro.tsx                # Professional area
│   │   └── ...                    # Other pages
│   │
│   ├── i18n/                      # Internationalization
│   │   ├── index.ts               # i18n configuration and translations
│   │   ├── fr.json                # French translations
│   │   ├── en.json                # English translations
│   │   ├── es.json                # Spanish translations
│   │   ├── ar.json                # Arabic translations
│   │   └── blogs.ts               # Blog-specific translations
│   │
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Utility functions
│   ├── services/                  # API services
│   ├── App.tsx                    # Main application component
│   ├── App.css                    # Global styles with RTL support
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Base styles
│
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/Labo-Medical/Labo-Medical.git
   cd Labo-Medical
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Open in browser
   - The application will be available at http://localhost:5173
   - The development server will automatically reload when you make changes

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build production-ready application
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality checks
```

### Build & Deployment
```bash
npm run build        # Creates optimized production build in 'dist' folder
npm run preview      # Serves the production build for testing
```

## Multi-Language Support

### Supported Languages

The application supports four languages with complete translations:

| Language | Code | Notes |
|----------|------|-------|
| Spanish | es | Default language |
| French | fr | Original language |
| English | en | International support |
| Arabic | ar | RTL support included |

### Translation Coverage

All major sections are fully translated:
- Navigation Menu: All header navigation items
- Values Section: Company values and principles
- Professional Area: Catalogs, recommendations, resources
- Patient Area: Appointment booking, results, FAQ
- Document Resources: PDF guides and documentation
- Contact Information: Contact forms and details

### Language Switching

Users can switch languages using:
- Header Language Switcher: Compact buttons in the main navigation
- Floating Language Switcher: Fixed position switcher on the right side
- Automatic Language Detection: Browser language preference detection

## Translation System

### Implementation Details

The translation system is built with react-i18next and includes:

#### Configuration (src/i18n/index.ts)
```typescript
// Translation resources are organized by language and section
const resources = {
  es: { translation: { header: {...}, values: {...} } },
  fr: { translation: { header: {...}, values: {...} } },
  en: { translation: { header: {...}, values: {...} } },
  ar: { translation: { header: {...}, values: {...} } }
};
```

#### Usage in Components
```typescript
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  return <h1>{t('header.nav_labs')}</h1>;
};
```

### Translation Structure

Translations are organized hierarchically:
```
translation
├── header/          # Navigation menu items
├── values/          # Company values section
├── documents/       # Document resources
└── pro_menu/        # Professional area menu
```

### Adding New Translations

To add new translations:
1. Add the key-value pair to all language objects in the JSON files
2. Use the translation key in components with t('section.key')
3. Test in all supported languages

### Blog Translations

For dynamic blog content, translations are handled in src/i18n/blogs.ts. This file contains translations for fallback blog articles and can be extended for dynamic content from a CMS.

## RTL Support

### Arabic Language Features

The application includes comprehensive RTL (Right-to-Left) support for Arabic:

#### Automatic Direction Switching
- Document direction changes to 'rtl' when Arabic is selected
- CSS automatically adjusts layout for right-to-left reading
- Text alignment switches to right-aligned

#### RTL-Specific Styling
```css
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .navigation ul {
  flex-direction: row-reverse;
}

[dir="rtl"] .language-switcher {
  flex-direction: row-reverse;
}
```

#### Implementation Details
- Direction change is handled in App.tsx using useEffect
- Language change listener automatically updates document direction
- Smooth transitions when switching between LTR and RTL layouts

## Contributing

### Development Guidelines

1. Code Style: Follow the established TypeScript and React patterns
2. Translation Updates: Always update all languages when adding new text
3. Component Structure: Maintain the established component architecture
4. Testing: Test all language variants and RTL functionality

### For Developers

This project includes a complete internationalization system that should work correctly. If translations are not appearing:

1. Check the browser's developer console for any JavaScript errors
2. Verify the development server is running without errors
3. Test the production build as development and production may behave differently
4. Check component imports ensure all components are properly importing useTranslation

The system is designed to be robust and maintainable. All the infrastructure is in place for a fully functional multi-language application.

---

Built with React, TypeScript, and modern web technologies
