# Factory Ledger — Desktop App

A local desktop app for daily purchases, sales, client/supplier balances, and monthly reports.
Data is stored in a real **SQLite database file** on your own computer — no internet, no account,
and no separate database server needed to use it.

## Requirements
- Install Node.js (LTS) from https://nodejs.org — this is a one-time setup step.
- **Don't want to install Node.js?** Skip to "Build in the cloud instead" below — it needs nothing installed on your computer.

## First-time setup
Open a terminal in this folder and run:

```
npm install
```

## Try it out (development mode)
```
npm run electron:dev
```
This opens the app in a window. Close the window to quit.

## Build the installer — one file to give your client
```
npm run dist
```
This creates a single file in the `release/` folder, e.g. `Factory Ledger Setup 1.0.0.exe`.

**That one file is everything your client needs.** Send it to them (USB drive, WhatsApp, email, Google Drive — anything).
They just double-click it: no options screen, no questions — it installs the app, adds a "Factory Ledger" icon to
the Desktop and Start Menu, and launches it automatically. Nothing else to run or configure.

Notes:
- Build the installer on the same type of machine you're targeting: build on Windows for a Windows `.exe`, on Mac for a `.dmg` (Mac installers work by drag-to-Applications rather than one-click, since that's the standard Mac pattern).
- Each computer's data is separate and stored locally (not synced between machines).

## Build in the cloud instead (no Node.js, nothing installed on your computer)

This folder includes a ready-made cloud build recipe (`.github/workflows/build.yml`). GitHub will
install everything and build the `.exe` on their servers — you only use a browser.

1. Go to https://github.com and create a free account if you don't have one.
2. Click **New repository** (top right → your avatar → "Your repositories" → "New"). Name it
   anything, e.g. `factory-ledger`. Public or private both work. Click **Create repository**.
3. On the new repo's page, click **uploading an existing file** (or "Add file" → "Upload files").
4. Open this unzipped folder on your computer, select everything inside it (including the hidden
   `.github` folder — on Windows, enable "show hidden items" in File Explorer's View menu first),
   and drag it all into the browser upload area. Click **Commit changes**.
5. Go to the **Actions** tab of the repository. If asked, click "I understand my workflows, go ahead
   and enable them".
6. Click **Build Installer** in the left list, then the **Run workflow** button, then **Run workflow**
   again to confirm.
7. Wait 3–5 minutes for it to finish (green checkmark).
8. Click into the finished run, scroll down to **Artifacts**, and download `factory-ledger-installer`.
   Unzip it — inside is your one file, `Factory Ledger Setup 1.0.0.exe`. That's what you send to your
   client.

You only repeat this if you change the app later. Each run is free under GitHub's free-tier minutes.

## The database file — backup, restore, and direct editing

All data lives in one file called `factory-ledger.sqlite`, found here:

- Windows: `%APPDATA%\factory-ledger\factory-ledger.sqlite`
- Mac: `~/Library/Application Support/factory-ledger/factory-ledger.sqlite`
- Linux: `~/.config/factory-ledger/factory-ledger.sqlite`

**Backup:** close the app, copy that file somewhere safe (USB drive, cloud folder). That's the entire backup.

**Restore / move to another computer:** close the app, replace the file at that same path with your
backup copy, then reopen the app.

**View or edit the raw records directly:** download the free, official
[DB Browser for SQLite](https://sqlitebrowser.org/) (no account needed), open `factory-ledger.sqlite`
with it, and you can browse, filter, and hand-edit the `parties` and `transactions` tables directly —
useful for bulk corrections or double-checking the numbers outside the app. Close the app first so the
file isn't in use, and make a backup copy before editing directly.

## Login and giving this to multiple people

The app now opens to a login screen. The **same installer file** works for everyone — there's nothing
to configure per person before you build it. Each person's computer gets its own separate database
(their own `factory-ledger.sqlite`), so their data never mixes with anyone else's.

**Steps to set someone up, start to finish:**

1. Build the installer once (`npm run dist`, or the GitHub Actions cloud build above) — you only do
   this step yourself, one time, no matter how many people you're giving it to.
2. Send that one installer file to each person (USB, email, WhatsApp, cloud drive — whatever's easiest).
3. They double-click it. It installs, adds a desktop icon, and opens the app automatically — no
   questions asked during install.
4. The first time the app opens on their computer, it shows **"Set up the admin account"** instead of
   a normal login. They pick a username and password there and then — this becomes their own admin
   login, separate from anyone else's, since it's saved in their own local database file.
5. From then on, opening the app (from the desktop icon) always asks for that username and password
   first. There's a **Log out** button in the sidebar if they want to lock it without closing the app.

If someone forgets their password, there's currently no in-app "reset password" flow — the fix is to
close the app and delete their `factory-ledger.sqlite` file (see path above), which wipes that
person's data and lets them go through "Set up the admin account" again from scratch. Let me know if
you'd rather have a proper password-reset flow instead of that — I can add one.
