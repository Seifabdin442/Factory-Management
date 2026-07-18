const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const initSqlJs = require("sql.js");

let db = null;

function dbFilePath() {
  return path.join(app.getPath("userData"), "factory-ledger.sqlite");
}

function persist() {
  const data = db.export();
  fs.writeFileSync(dbFilePath(), Buffer.from(data));
}

async function initDb() {
  const wasmPath = app.isPackaged
    ? path.join(process.resourcesPath, "app.asar.unpacked", "node_modules", "sql.js", "dist", "sql-wasm.wasm")
    : path.join(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm");

  const SQL = await initSqlJs({
    locateFile: () => (fs.existsSync(wasmPath) ? wasmPath : require.resolve("sql.js/dist/sql-wasm.wasm")),
  });

  const file = dbFilePath();
  if (fs.existsSync(file)) {
    db = new SQL.Database(fs.readFileSync(file));
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS parties (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      phone TEXT
    );
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      date TEXT NOT NULL,
      partyId TEXT,
      description TEXT,
      quantity REAL,
      unitPrice REAL,
      total REAL,
      paid REAL,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      salt TEXT NOT NULL,
      hash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
  persist();
}

function rowsFromQuery(sql, params) {
  const stmt = db.prepare(sql);
  if (params) stmt.bind(params);
  const out = [];
  while (stmt.step()) out.push(stmt.getAsObject());
  stmt.free();
  return out;
}

/* ---- auth ---- */
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

ipcMain.handle("auth-has-admin", () => {
  const rows = rowsFromQuery("SELECT COUNT(*) as c FROM users");
  return rows[0] && rows[0].c > 0;
});

ipcMain.handle("auth-create-admin", (e, { username, password }) => {
  const existing = rowsFromQuery("SELECT COUNT(*) as c FROM users");
  if (existing[0] && existing[0].c > 0) return { ok: false, reason: "exists" };
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  db.run("INSERT INTO users (id,username,salt,hash,createdAt) VALUES (?,?,?,?,?)", [
    crypto.randomUUID(), username, salt, hash, new Date().toISOString(),
  ]);
  persist();
  return { ok: true };
});

ipcMain.handle("auth-login", (e, { username, password }) => {
  const rows = rowsFromQuery("SELECT * FROM users WHERE username = ?", [username]);
  if (!rows.length) return { ok: false };
  const user = rows[0];
  const hash = hashPassword(password, user.salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(user.hash, "hex");
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { ok };
});

/* ---- parties ---- */
ipcMain.handle("db-get-parties", () => rowsFromQuery("SELECT * FROM parties ORDER BY name"));

ipcMain.handle("db-upsert-party", (e, party) => {
  db.run(
    `INSERT INTO parties (id,name,type,phone) VALUES (?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET name=excluded.name, type=excluded.type, phone=excluded.phone`,
    [party.id, party.name, party.type, party.phone || ""]
  );
  persist();
  return party;
});

ipcMain.handle("db-delete-party", (e, id) => {
  db.run("DELETE FROM transactions WHERE partyId = ?", [id]);
  db.run("DELETE FROM parties WHERE id = ?", [id]);
  persist();
  return { id };
});

/* ---- transactions ---- */
ipcMain.handle("db-get-transactions", () => rowsFromQuery("SELECT * FROM transactions ORDER BY date DESC"));

ipcMain.handle("db-upsert-transaction", (e, tx) => {
  db.run(
    `INSERT INTO transactions (id,kind,date,partyId,description,quantity,unitPrice,total,paid,notes)
     VALUES (?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET
       kind=excluded.kind, date=excluded.date, partyId=excluded.partyId, description=excluded.description,
       quantity=excluded.quantity, unitPrice=excluded.unitPrice, total=excluded.total, paid=excluded.paid, notes=excluded.notes`,
    [tx.id, tx.kind, tx.date, tx.partyId, tx.description || "", tx.quantity || 0, tx.unitPrice || 0, tx.total || 0, tx.paid || 0, tx.notes || ""]
  );
  persist();
  return tx;
});

ipcMain.handle("db-delete-transaction", (e, id) => {
  db.run("DELETE FROM transactions WHERE id = ?", [id]);
  persist();
  return { id };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    backgroundColor: "#F7F5EF",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }
}

app.whenReady().then(async () => {
  await initDb();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
