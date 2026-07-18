const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("auth", {
  hasAdmin: () => ipcRenderer.invoke("auth-has-admin"),
  createAdmin: (username, password) => ipcRenderer.invoke("auth-create-admin", { username, password }),
  login: (username, password) => ipcRenderer.invoke("auth-login", { username, password }),
});

contextBridge.exposeInMainWorld("db", {
  getParties: () => ipcRenderer.invoke("db-get-parties"),
  upsertParty: (party) => ipcRenderer.invoke("db-upsert-party", party),
  deleteParty: (id) => ipcRenderer.invoke("db-delete-party", id),

  getTransactions: () => ipcRenderer.invoke("db-get-transactions"),
  upsertTransaction: (tx) => ipcRenderer.invoke("db-upsert-transaction", tx),
  deleteTransaction: (id) => ipcRenderer.invoke("db-delete-transaction", id),
});
