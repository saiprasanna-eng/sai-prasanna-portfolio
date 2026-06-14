# Sai Prasanna Chintakayala — Cloud & DevOps Engineer Portfolio

A modern, responsive personal portfolio website that presents Sai Prasanna Chintakayala as a
**Cloud & DevOps Engineer** — highlighting secure Azure infrastructure, DevOps automation,
data engineering platforms, and Azure AI solutions.

Built with plain **HTML, CSS, and JavaScript** (no frameworks, no build step). Just open it in a
browser or publish it to GitHub Pages.

---

## Overview

This is a single-page portfolio with smooth scrolling, scroll-triggered reveals, hover
micro-interactions, and an animated cloud-infrastructure topology in the hero. The design uses a
dark "control plane at night" theme — deep navy surfaces, an azure-to-cyan accent, and a
monospace/display/body type system that reflects an infrastructure-as-code background.

**Sections**

1. **Hero** — name, title, subtitle, and quick-action buttons (View Projects, Download Resume, Connect on LinkedIn, GitHub)
2. **About** — professional summary and focus areas
3. **Skills** — grouped into Cloud & Infrastructure, DevOps & IaC, Data & AI, and Monitoring & Security
4. **Certifications** — Databricks and Microsoft Fabric credential cards
5. **Projects** — four project cards with descriptions and skill tags
6. **Experience** — timeline-style roles
7. **Education** — Master's and Bachelor's cards
8. **Contact** — email, LinkedIn, and GitHub cards

---

## Features

- Fully responsive layout for desktop, tablet, and mobile
- Animated hero topology (HTML5 canvas) representing connected cloud resources
- Sticky navigation with a mobile hamburger menu and active-section highlighting
- Scroll-reveal animations via `IntersectionObserver`
- Accessible: skip link, keyboard focus styles, semantic landmarks, and `prefers-reduced-motion` support
- No frameworks, no dependencies, no build tooling — pure static files

---

## Technologies Used

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, responsive media queries
- **JavaScript (ES5/vanilla)** — navigation, scroll reveal, scrollspy, and the canvas animation
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (labels/code)

---

## Project Structure

```
portfolio/
├── index.html        # Page markup and all content sections
├── styles.css        # Design system, layout, responsive rules
├── script.js         # Interactions and hero topology animation
├── assets/
│   ├── images/       # Favicon + any photos/screenshots (favicon.svg included)
│   └── resume/       # Drop your resume PDF here
└── README.md
```

---

## Run Locally

No build step is required.

**Option 1 — open directly**

Open `index.html` in any modern browser.

**Option 2 — local server (recommended)**

A local server avoids any path/caching quirks.

```bash
# Python 3
python -m http.server 8000

# or Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Deploy with GitHub Pages

1. Create a GitHub repository named **`sai-prasanna-portfolio`**.
2. Upload all files (keep the folder structure above) and commit to the **`main`** branch.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then select the **`main`** branch and the **`/ (root)`** folder.
5. Click **Save** to publish. After a minute or two, GitHub provides your live URL, typically:
   `https://<your-username>.github.io/sai-prasanna-portfolio/`
6. Add the live portfolio link to your **LinkedIn** profile (Contact info / Featured section).

---

## Before You Publish — Quick Checklist

- [ ] Add your resume PDF to `assets/resume/` (default expected name: `Sai_Prasanna_Chintakayala_Resume.pdf`, or update the link in `index.html`).
- [ ] Replace the email placeholder (`add my email later`) with your real email and set the link to `mailto:you@example.com`.
- [ ] Replace the GitHub placeholder (`add my GitHub link later`) and the GitHub button `#` link with your profile URL.
- [ ] Replace the certification `#` links with your real credential verification URLs.
- [ ] Replace the project `Code` / `Demo` `#` links once those repos or demos exist.

> All external/demo links currently use `#` placeholders on purpose — no fake links are included.

---

## Future Improvements

- Add a project detail page or modal for architecture diagrams and screenshots
- Light/dark theme toggle
- Blog or notes section for cloud/DevOps write-ups
- Contact form wired to a serverless function (e.g., Azure Functions)
- Lighthouse/performance tuning and automated checks via GitHub Actions

---

## License

Personal portfolio — content © Sai Prasanna Chintakayala. Code is free to reference and adapt.
