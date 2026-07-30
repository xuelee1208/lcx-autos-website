# Deployment

See `DEPLOYMENT_ZH.md` for the complete step-by-step deployment and custom-domain guide.

The site uses `output: "export"`. Run:

```bash
npm install
npm run typecheck
npm run build
```

Deploy the generated `out/` directory to a static host, or connect the repository to Vercel for automatic deployments.
