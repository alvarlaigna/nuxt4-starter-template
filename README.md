# Nuxt 4 Starter Template

![nuxt4-starter-template-preview](https://taunohanni.ee/github-nuxt4-preview.jpg)

A modern Nuxt starter template packed with essential features and best practices. While Nuxt 3 is currently stable, this template is forward-compatible with the upcoming Nuxt 4, incorporating its latest enhancements and development patterns.

This template serves as a future-proof foundation for your projects, allowing you to:

- Leverage upcoming Nuxt 4 features
- Use the latest Tailwind CSS v4 capabilities
- Follow best practices and modern development patterns
- Typescript enabled by default with strict type checking
- Component-driven development with proper documentation
- Built-in performance optimizations

> [!NOTE]
> This template is maintained to stay current with Nuxt 4's development progress.

## Features

### 🚀 Core Technologies

- [x] [Nuxt](https://nuxt.com) - The Intuitive Vue Framework
- [x] [Vue](https://vuejs.org) - The Progressive JavaScript Framework
- [x] [VueUse](https://nuxt.com/modules/vueuse) - Collection of Vue Composition Utilities
- [x] [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

### 💅 Styling & UI

- [x] [Tailwind 4](https://tailwindcss.com) - Utility-first CSS framework
- [x] [Tailwind Variants](https://www.tailwind-variants.org) - Advanced variant support
- [x] [Radix Vue](https://www.radix-vue.com/) - Unstyled, accessible components
- [x] [Nuxt Icons](https://nuxt.com/modules/icon) - Icon system
- [x] [Nuxt Image](https://image.nuxt.com/) - Optimized image handling
- [x] [Nuxt Fonts](https://fonts.nuxt.com/) - Web font optimization

### 🛡️ Security & Quality

- [x] [Nuxt Security](https://nuxt-security.vercel.app/) - Security headers and best practices
- [x] ESLint with Vue/Nuxt recommended configs
- [x] Stylelint for CSS/SCSS linting
- [x] Prettier for consistent code formatting
- [x] Git hooks with Husky
- [x] Automated testing setup with Vitest and Cypress
- [x] TypeScript strict mode enabled

## Project Structure

```text
├── app/
│   ├── components/     # Vue components
│   ├── composables/    # Shared composition logic
│   ├── layouts/        # Page layouts
│   ├── middleware/     # Route middleware
│   ├── pages/         # Application pages
│   ├── plugins/       # Vue plugins
│   ├── stores/        # State management
│   └── utils/         # Utility functions
├── public/            # Static assets
├── server/            # Server routes/middleware
└── tests/            # Test files
```

## Getting Started

### Prerequisites

- Node.js (>=18.19.0)
- Yarn (>=1.22.0) [recommended] or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/nuxt4-starter-template.git
cd nuxt4-starter-template
```

1. Install dependencies

Using yarn (recommended):

```bash
yarn install
```

Or using npm:

```bash
npm install
```

1. Start development server

Using yarn (recommended):

```bash
yarn dev
```

Or using npm:

```bash
npm run dev
```

### Development Commands

The following commands work with yarn (recommended) or npm:

```bash
# Install dependencies
yarn install        # or: npm install

# Start development server
yarn dev           # or: npm run dev

# Build for production
yarn build         # or: npm run build

# Preview production build
yarn preview       # or: npm run preview

# Run tests
yarn test          # or: npm run test

# Run end-to-end tests
yarn test:e2e      # or: npm run test:e2e

# Lint code
yarn lint          # or: npm run lint

# Fix linting issues
yarn lint:fix      # or: npm run lint:fix

# Format code
yarn format        # or: npm run format

# Type check
yarn typecheck     # or: npm run typecheck

# Clean project
yarn clean         # or: npm run clean
```

> [!TIP]
> While this template supports both yarn and npm, we recommend using yarn for better performance and consistent dependency management.

### Package Manager Lock Files

This project includes both `yarn.lock` and `package-lock.json` files to support both package managers. When using yarn:

- `yarn.lock` will be updated automatically
- `package-lock.json` should be ignored

If you switch to npm:

- Delete `yarn.lock`
- `package-lock.json` will be generated automatically

## Best Practices

This template follows these Vue.js/Nuxt best practices:

- 📦 Component-driven development
- 🔒 Type-safe development with TypeScript
- 🧪 Test-driven development ready
- 🎨 Consistent code style with ESLint/Prettier
- 📱 Mobile-first responsive design
- ♿ Accessibility built-in
- 🚀 Performance optimized

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
