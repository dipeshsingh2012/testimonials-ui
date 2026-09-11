# Testimonials Micro-Frontend (`testimonials-ui`)

> **Interactive Customer Reviews, Tasting Notes, & Cupping Log for Hiljhil Roasters**

`testimonials-ui` is an independent Micro-Frontend (MFE) running on **Port 5181** built with React 18, Vite, TypeScript, and Tailwind CSS. It exposes customer review cards, verified cupper badges, category filter pills, and review submission modals via Vite Module Federation for consumption by [`mycommerce`](https://github.com/dipeshsingh2012/mycommerce) and other storefront remotes.

---

## 🏗️ Architecture & Exposed Modules

Remote Entry: [`http://localhost:5181/assets/remoteEntry.js`](http://localhost:5181/assets/remoteEntry.js)  
Production GCS Entry: [`https://storage.googleapis.com/mycommerce/mfes/testimonials-ui/assets/remoteEntry.js`](https://storage.googleapis.com/mycommerce/mfes/testimonials-ui/assets/remoteEntry.js)

| Module | Component | Description |
| :--- | :--- | :--- |
| `./TestimonialsFragment` | `src/components/TestimonialsFragment.tsx` | Full responsive section with header, rating aggregates, category filters, review cards, and review modal. |
| `./TestimonialCard` | `src/components/TestimonialCard.tsx` | Granular review card with star ratings, verified buyer badges, coffee estate tags, and flavor notes. |
| `./ReviewSubmissionModal` | `src/components/ReviewSubmissionModal.tsx` | Interactive modal allowing coffee lovers to submit ratings, brew methods, and tasting impressions. |

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start standalone dev server on port 5181
npm run dev

# Build production bundle with Module Federation
npm run build

# Preview production build on port 5181
npm run preview
```

---

## ☁️ CI/CD: Automated Google Cloud Storage Upload via GitHub Actions

This repository includes a production GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that:
1. Triggers on every push to `main` (or manual dispatch via the Actions tab).
2. Builds the Vite production bundle.
3. Authenticates with Google Cloud.
4. Syncs `dist/` to `gs://mycommerce/mfes/testimonials-ui/`.
5. Enforces `no-cache` headers on `remoteEntry.js` and `index.html` while preserving 1-year immutable caching on content-hashed chunks.

### Required GitHub Repository Secrets

Under **Settings > Secrets and variables > Actions**, configure:

| Secret Name | Description | Example / Note |
| :--- | :--- | :--- |
| `GCP_SA_KEY` | Service Account JSON key with `roles/storage.objectAdmin` permission on the target GCS bucket. | `{"type": "service_account", ...}` |
| `GCS_BUCKET_NAME` | *(Optional)* Target GCS bucket name. Defaults to `mycommerce`. | `mycommerce` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | *(Optional)* If using Workload Identity Federation instead of a service account key. | `projects/.../providers/...` |
| `GCP_SERVICE_ACCOUNT` | *(Optional)* Service account email for Workload Identity. | `sa-deployer@project.iam.gserviceaccount.com` |

---

## 🛠️ Tech Stack

* **Framework:** React 18 / TypeScript
* **Bundler & MFE:** Vite 5 / `@originjs/vite-plugin-federation`
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
