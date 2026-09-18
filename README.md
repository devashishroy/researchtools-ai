# ResearchTools AI
Research and data-analysis dashboard by Devashish Roy.

## Deploy to Cloudflare Pages
Connect this GitHub repository to Cloudflare Pages. Use:
- Production branch: `main`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`
Then add custom domain `researchtools.devashishroy.com`.

The initial version is browser-based and requires no API key. For real AI generation, add server-side Cloudflare Functions later; never expose provider keys in frontend JavaScript.

Keep the existing root-domain Email Routing MX records unchanged.

## Tools
Sample Size Calculator; Questionnaire Generator; Survey QC Checker; SPSS Syntax Generator; Research Report Generator.
