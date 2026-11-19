# Deployment Guide | دليل النشر

This guide provides instructions for deploying **Al-Kayan Health (صحة الكيان)** across various cloud platforms and container runtimes. The project is designed to be **100% platform-independent** and **Vercel-native**.

---

## ⚡ 1. Vercel Deployment (Recommended)

### Option A: One-Click Deploy
Click the button below to deploy your own instance to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVivekkumar161122%2Fai-kayan-health)

### Option B: Vercel Dashboard (Git Integration)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `ai-kayan-health` repository.
4. Vercel will automatically detect the **Vite** framework preset from `vercel.json`:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or `npm ci`)
5. Click **"Deploy"**. The site will be live on a `*.vercel.app` domain with instant HTTPS, edge caching, and security headers.

### Option C: Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Log in and deploy preview
vercel

# Deploy to production
vercel --prod
```

### Why this project is Vercel-friendly:
- `vercel.json` pre-configured with SPA route rewrites (`/* -> /index.html`).
- Automated immutable caching for hashed production assets (`/assets/*`).
- Security headers pre-configured (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Chunk splitting for faster cold loads and reduced CDN egress.

---

## 🐳 2. Docker & Container Platforms (Platform Independent)

The repository includes a multi-stage `Dockerfile` and `nginx.conf` that packages the app into a secure, minimal (~25MB) Alpine Linux image.

### Run with Docker Compose:
```bash
# Build and start container on port 3000
docker compose up -d

# View logs
docker compose logs -f

# Stop container
docker compose down
```
Access the application at `http://localhost:3000/`.

### Manual Docker Build & Run:
```bash
# Build Docker image
docker build -t ai-kayan-health:latest .

# Run container
docker run -d -p 3000:80 --name ai-kayan-health ai-kayan-health:latest
```

### Cloud Container Targets:
- **Google Cloud Run**:
  ```bash
  gcloud run deploy ai-kayan-health --source . --platform managed --region me-central1 --allow-unauthenticated
  ```
- **AWS App Runner / ECS**: Push image to Amazon ECR and deploy service pointing to port 80.
- **Azure Container Apps**: Deploy container image with ingress enabled on target port 80.

---

## 🌐 3. Netlify & Cloudflare Pages

### Netlify:
- The project includes `netlify.toml` and `public/_redirects`.
- Push your repository to Git and connect via [netlify.com](https://www.netlify.com).
- Build command: `npm run build`
- Publish directory: `dist`
- SPA rewrites and caching headers are automatically configured.

### Cloudflare Pages:
- Create a new project pointing to your Git repository.
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- `_redirects` and `_headers` in `public/` ensure seamless routing and security headers.

---

## 🐙 4. GitHub Pages / Subpath Hosting

If deploying to a repository subpath (e.g. `https://<username>.github.io/<repo>/`):

1. Set the `VITE_BASE_PATH` environment variable:
   ```bash
   VITE_BASE_PATH=/<repo>/ npm run build
   ```
2. Deploy the generated `dist/` directory to the `gh-pages` branch.

---

## 💻 5. Local Cross-Platform Development

The project is tested and verified across **macOS**, **Linux** (Ubuntu, Debian, Fedora), and **Windows** (PowerShell, Command Prompt, WSL):

```bash
# Clone repository
git clone https://github.com/Vivekkumar161122/ai-kayan-health.git
cd ai-kayan-health

# Install dependencies
npm install

# Start development server (binds to 0.0.0.0:3000 for LAN & VM support)
npm run dev

# Run TypeScript type verification
npm run type-check

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Clean build directory (cross-platform node script)
npm run clean
```

---

## 🛡️ UAE Data Sovereignty & Compliance Note

When hosting this platform in production for Abu Dhabi healthcare workflows:
- Ensure deployment on UAE-domiciled cloud infrastructure (e.g., Azure UAE Central / UAE North, AWS Middle East UAE, or in-country sovereign clouds) adhering to **UAE Federal Decree-Law No. 45/2021** on Personal Data Protection and **Abu Dhabi DoH (ADHICS)** standards.
- In-country data persistence rules apply to identified health records.
