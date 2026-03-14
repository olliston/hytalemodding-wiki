# Contributing to HytaleModding Wiki

Thank you for your interest in contributing to the HytaleModding Wiki project! This is a community-driven initiative, and we welcome contributions from modders, developers, designers, and documentation enthusiasts of all skill levels.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Submitting Changes](#submitting-changes)
- [Community](#community)

## Website Guides

Alongside this, you are requested to follow our guides related to contributing on our website:

- [PR Guidelines](https://hytalemodding.dev/en/docs/contributing/pr-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

We welcome suggestions for new features or improvements:

- Search existing issues first to avoid duplicates
- Clearly describe the enhancement and its benefits
- Explain why this would be useful to the Hytale modding community

## Getting Started

### Prerequisites

- PHP 8.2 or higher
- [Composer](https://getcomposer.org/) (PHP dependency manager)
- [Bun](https://bun.sh/) (install with `npm install -g bun`)

### PHP Extensions

Make sure the following PHP extensions are enabled in your `php.ini`:

- `fileinfo`
- `pdo_sqlite`
- `sqlite3`

### Local Development Setup

1. Fork the repository on GitHub

2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/hytalemodding-wiki.git
cd hytalemodding-wiki
```

3. Install dependencies:

```bash
composer install
bun install
```

4. Set up your environment:

```bash
cp .env.example .env
php artisan key:generate
```

5. Set up the database and seed it with test data:

```bash
php artisan migrate --seed
```

6. Start the development servers (run these in separate terminals):

```bash
# Terminal 1: Frontend dev server
bun run dev

# Terminal 2: Backend dev server
php artisan serve
```

7. Open [http://localhost:8000](http://localhost:8000) in your browser


### Demo Accounts

After seeding, you can log in with:

- `admin@example.com` (password: `password`)
- `user@example.com` (password: `password`)
- `collaborator@example.com` (password: `password`)

## Submitting Changes

### Branch Workflow

1. Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. Make your changes and commit:

```bash
git add .
git commit -m "feat: Add clear, descriptive commit message that follow conventional commits"
```

3. Push to your fork:

```bash
git push origin feature/your-feature-name
```

4. Open a Pull Request on GitHub

### Pull Request Guidelines

You must include a GitHub issue number while making a PR, attach your GitHub issue by prefixing your PR title with `GH-<issue number>`

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), and you are supposed to use those commits while contributing to us. **Your PR will not be accepted if you do not use conventional commits**

### Code Quality

Before submitting, ensure your code passes linting and type checks:

```bash
bun run lint        # ESLint
bun run format      # Prettier
bun run types       # TypeScript type checking
```

Or run all at once:

```bash
bun run quality
```

For PHP code, run:

```bash
./vendor/bin/pint   # Laravel Pint (code style)
```

## Community

### Getting Help

- **Discord**: [Join our Discord](https://discord.gg/hytalemodding) for help while writing guides, remember, we are here to help you if you want to contribute!
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features

### Recognition

Contributors are recognized in several ways:

- Listed in the repository's contributors
- Building a portfolio of documentation work
- If you wrote a guide, it'll show that you are the author at the end of the page.

## Questions?

If you have questions not covered in this guide:

- Ask in the [Discord server](https://discord.gg/hytalemodding)
- Reach out to us via email at `hello@hytalemodding.dev`
- [Open a discussion](https://github.com/orgs/HytaleModding/discussions) on GitHub

Thank you for contributing to HytaleModding Wiki! Your efforts help the entire community learn and grow together.
