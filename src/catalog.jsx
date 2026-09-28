// Saved items and fabrics with default prices, suggested while entering purchases/sales.
import React, { useState, useMemo } from "react";
import { Plus, Trash2, Pencil, Boxes } from "lucide-react";
import { COLORS, uid, fmtMoney, Btn, Input, Modal, Empty, SearchBox } from "./ui.jsx";

const mono = "'JetBrains Mono', monospace";

export function CatalogView({ t, lang, catalog, transactions, onAdd, onEdit, onDelete, search, setSearch }) {
  const usage = useMemo(() => {
    const m = new Map();
    for (const tx of transactions) for (const it of tx.items || []) {
      if (it.catalogId) m.set(it.catalogId, (m.get(it.catalogId) || 0) + 1);
    }
    return m;
  }, [transactions]);
  const q = search.trim().toLowerCase();
  const list = catalog.filter((c) => !q || `${c.name} ${c.unit || ""} ${c.notes || ""}`.toLowerCase().includes(q));
  const th = { padding: "10px 14px", fontSize: 12, color: COLORS.muted, fontWeight: 700, textAlign: "start", borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" };
  const td = { padding: "11px 14px", fontSize: 13.5, borderBottom: `1px solid ${COLORS.border}` };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{t.catalog}</h2>
        <Btn variant="accent" onClick={onAdd} title="Ctrl+N"><Plus size={16} /> {t.addCatalogItem}</Btn>
      </div>
      <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14, maxWidth: 720 }}>{t.catalogDesc}</div>
      <div style={{ marginBottom: 12 }}><SearchBox value={search} onChange={setSearch} placeholder={t.search} /></div>
      {list.length === 0 ? (
        catalog.length === 0 ? (
          <div style={{ background: COLORS.surface, border: `1px dashed ${COLORS.border}`, borderRadius: 12, padding: 30, textAlign: "center" }}>
            <Boxes size={28} color={COLORS.muted} />
            <div style={{ color: COLORS.muted, fontSize: 13.5, margin: "8px 0 14px" }}>{t.noData}</div>
            <Btn variant="accent" onClick={onAdd}><Plus size={16} /> {t.addCatalogItem}</Btn>
          </div>
        ) : <Empty t={t} />
      ) : (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>{t.name}</th>
                <th style={th}>{t.unit}</th>
                <th style={{ ...th, textAlign: "end" }}>{t.salePrice}</th>
                <th style={{ ...th, textAlign: "end" }}>{t.purchasePrice}</th>
                <th style={{ ...th, textAlign: "center" }}>{t.timesUsed}</th>
                <th style={th} />
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td style={td}>
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    {c.notes && <div style={{ fontSize: 12, color: COLORS.muted }}>{c.notes}</div>}
                  </td>
                  <td style={{ ...td, color: COLORS.inkSoft }}>{c.unit || "—"}</td>
                  <td style={{ ...td, textAlign: "end", fontFamily: mono }}>{c.salePrice ? fmtMoney(c.salePrice, lang) : "—"}</td>
                  <td style={{ ...td, textAlign: "end", fontFamily: mono }}>{c.purchasePrice ? fmtMoney(c.purchasePrice, lang) : "—"}</td>
                  <td style={{ ...td, textAlign: "center", color: COLORS.inkSoft }}>{usage.get(c.id) || 0}</td>
                  <td style={{ ...td, textAlign: "end", whiteSpace: "nowrap" }}>
                    <button onClick={() => onEdit(c)} title={t.edit} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted }}><Pencil size={15} /></button>
                    <button onClick={() => onDelete(c)} title={t.delete} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted }}><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function CatalogModal({ t, editItem, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    id: editItem ? editItem.id : uid(),
    name: editItem ? editItem.name : "",
    unit: editItem ? editItem.unit || "" : "",
    salePrice: editItem && editItem.salePrice ? editItem.salePrice : "",
    purchasePrice: editItem && editItem.purchasePrice ? editItem.purchasePrice : "",
    notes: editItem ? editItem.notes || "" : "",
  }));
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const canSave = form.name.trim().length > 0;
  const save = () => {
    if (!canSave) return;
    onSave({ ...form, name: form.name.trim(), unit: form.unit.trim(), salePrice: Number(form.salePrice) || 0, purchasePrice: Number(form.purchasePrice) || 0 });
  };
  return (
    <Modal title={editItem ? t.editCatalogItem : t.addCatalogItem} onClose={onClose} onSubmit={save}>
      <Input label={t.name} value={form.name} onChange={set("name")} autoFocus />
      <Input label={t.unit} value={form.unit} onChange={set("unit")} placeholder={t.unitPlaceholder} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label={t.salePrice} type="number" min="0" step="any" value={form.salePrice} onChange={set("salePrice")} />
        <Input label={t.purchasePrice} type="number" min="0" step="any" value={form.purchasePrice} onChange={set("purchasePrice")} />
      </div>
      <Input label={t.notes} value={form.notes} onChange={set("notes")} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="ghost" onClick={onClose}>{t.cancel}</Btn>
        <Btn variant="accent" disabled={!canSave} onClick={save}>{t.save}</Btn>
      </div>
    </Modal>
  );
}
