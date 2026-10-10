# Isaac Pandraju — Portfolio

A responsive Next.js and TypeScript portfolio for a senior data engineer. Includes light and dark themes, custom data architecture illustrations, three case studies, resume download, and direct contact links.

## Local development

Use Node.js 22 LTS or later, then run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. The site follows your system theme until you choose a theme with the header toggle.

## Production and checks

```sh
npm run typecheck
npm run build
npm start
```

Browser smoke tests cover navigation, project pages, 404s, the PDF download, clipboard access, theme persistence, keyboard navigation, and responsive layouts in both themes:

```sh
npx playwright install chromium
npm run test:e2e
```

The test runner starts its own local server if port 3000 is free. Screenshots and the HTML report are generated in ignored `test-results/` and `playwright-report/` directories.

## Updating content

- `src/content/portfolio.ts` contains the profile, projects, employment history, technical skills, certifications, education, and leadership highlights.
- `src/app/page.tsx` contains the homepage narrative and layout. Keep hero statistics consistent with the content module and resume.
- `src/app/globals.css` defines the light and dark visual tokens and responsive layout.
- `src/components/pipeline-graphic.tsx` contains the three conceptual architecture illustrations.
- `public/Isaac_Pandraju_Data_Engineer.pdf` is the original resume, including its original contact details. Replace this file when the resume changes.

Case studies are pre-rendered from the content module at build time. Unknown project slugs return 404. There is no database, contact form backend, analytics, or third-party data collection. Email links open the visitor's mail client; copying the address requires browser clipboard support on localhost or HTTPS.

Content is based on the supplied resume. Enterprise clients remain anonymous. Project outcomes keep their original scope; the diagrams are high-level illustrations, not literal deployment schematics. Certifications are listed as supplied, without claims about current expiry or validity.

## Deploying to Vercel

1. Push this project and its `package-lock.json` to your own Git repository.
2. Import the repository into Vercel and select the Next.js preset.
3. Use `npm run build` as the build command and leave the output directory at its Next.js default.
4. For a custom domain, set `NEXT_PUBLIC_SITE_URL` to its full HTTPS URL before building. Otherwise, Vercel's production URL is detected automatically for social metadata.
5. Deploy, then verify the resume download, project navigation, and social preview image at `/opengraph-image` on the final domain.

Only the local project is delivered; it has not been published or connected to a hosting account.
