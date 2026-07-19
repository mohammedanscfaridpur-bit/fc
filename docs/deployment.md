# Deployment — Hostinger (Node.js hosting, no VPS)

This guide deploys the site on Hostinger's **Business or Cloud hosting plan
with Node.js support** (available in hPanel), using a **MySQL** database — not
a VPS.

## 1. Prerequisites on Hostinger

1. In **hPanel → Websites**, make sure the plan supports **Node.js
   applications** (Business/Cloud tier). Basic/PHP-only shared hosting does
   not support this.
2. In **hPanel → Databases → MySQL Databases**, create:
   - A database, e.g. `u123456_msc`
   - A database user with a strong password, added to that database with
     **all privileges**
   - Note the host (usually `localhost`), database name, username, password
3. In **hPanel → Domains**, point `mohammedan-sc-faridpur.com` to this
   hosting account (if the domain was bought elsewhere, update its
   nameservers to Hostinger's, or just the A record to the hosting IP).

## 2. Prepare the codebase locally

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL="mysql://u123456_msc:PASSWORD@localhost:3306/u123456_msc"
NEXTAUTH_URL="https://mohammedan-sc-faridpur.com"
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
NEXT_PUBLIC_SITE_URL="https://mohammedan-sc-faridpur.com"
```

Push the schema and seed the database (you can do this locally against the
Hostinger DB if remote MySQL access is enabled, or via SSH once uploaded):

```bash
npm run db:push
npm run db:seed
```

**Important:** log in once with the seeded admin account
(`admin@mohammedan-sc-faridpur.com` / `ChangeMe@123`) and change the password
immediately — this is documented again in Step 6 of the README.

## 3. Build

```bash
npm run build
```

This produces a production build in `.next/`.

## 4. Upload to Hostinger

Two options — pick whichever hPanel offers on your plan:

**Option A — Git deploy (preferred if available):**
In hPanel's Node.js app section, connect the project's Git repository and set:
- Application root: the project folder
- Application startup file: `node_modules/next/dist/bin/next` (or use the
  npm start script Hostinger's Node app runner expects — hPanel's Node.js
  setup screen shows the exact field)
- Run command: `npm run start`
- Node version: 18.18 or newer

**Option B — Manual upload:**
Zip the project (excluding `node_modules` and `.next` — Hostinger will run
`npm install` and `npm run build` itself), upload via File Manager or FTP,
then in hPanel's Node.js app screen set the startup file to `server.js` /
`npm start` as prompted, and click **Run NPM Install** then **Restart**.

## 5. Configure the Node.js app in hPanel

- **Startup command:** `npm run start`
- **Port:** Hostinger assigns one automatically and proxies it — do not
  hardcode a port in the app.
- **Environment variables:** enter the same values from your `.env` file in
  hPanel's environment variable UI (do not upload `.env` itself for
  security — use hPanel's env var fields instead).

## 6. SSL

hPanel → SSL → issue a free Let's Encrypt certificate for
`mohammedan-sc-faridpur.com` (and `www.`). Force HTTPS redirect in the domain
settings.

## 7. Uploaded images (gallery, committee photos)

The admin dashboard saves uploaded images to `public/uploads/`. Make sure
this folder is writable by the Node.js app user, and back it up regularly —
plain file storage on shared/cloud hosting does not survive a redeploy that
wipes the app folder, so treat `/public/uploads` as persistent data and
exclude it from any "clean deploy" step.

## 8. Post-deploy checklist

- [ ] Visit `https://mohammedan-sc-faridpur.com/bn` and `/en` — both load
- [ ] Visit `/admin/login`, sign in, and change the seeded admin password
- [ ] Submit a test entry via the Contact form and Membership form
- [ ] Add one real President/Secretary photo + bio from the admin dashboard
- [ ] Add a few gallery images, a news post, and an event to confirm CRUD
      end-to-end
- [ ] Confirm SSL padlock shows on the domain
