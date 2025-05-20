# Ahmed Sabri Portfolio
This is a personal portfolio project built with Next.js, styled as an interactive terminal. Visitors can explore your background, skills, and projects using CLI-like commands, and download your resume directly from the site.

## Features
- Interactive terminal interface (type `help` to see available commands)
- Sections: About, Education, Projects, Skills (with categories)
- Downloadable resume (PDF)
- Responsive and deployable on Vercel

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```sh
npm run build
npm start
```

## Deployment (Vercel)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/), sign up, and import your repository.
3. Vercel will auto-detect Next.js and deploy your site for free.
4. Every push to your main branch triggers a new deployment.

## CI/CD with GitHub Actions
Add a workflow file at `.github/workflows/ci.yml`:
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## Project Structure
- `app/` - Next.js app directory
- `components/Terminal.tsx` - Terminal UI and logic
- `data/profile.ts` - Profile, skills, and project data
- `public/` - Static files (resume, icons)

## Resume Download
Place your resume PDF in the `public/` directory as `AHMEDSABRI-RESUME.pdf`. The download link will be available in the terminal header.

---

**Author:** Ahmed Sabri

For questions or improvements, open an issue or pull request.
