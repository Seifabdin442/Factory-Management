import React, { useState, useEffect, useMemo } from "react";
import {
  Package, ShoppingCart, Users, BarChart3, Plus, Globe, X, Trash2,
  Pencil, ArrowUpCircle, ArrowDownCircle, Search, Download, ChevronLeft,
  ChevronRight, Wallet, Scissors
} from "lucide-react";

const COLORS = {
  bg: "#F7F5EF",
  surface: "#FFFFFF",
  ink: "#232840",
  inkSoft: "#4A4E68",
  accent: "#C9972E",
  accentSoft: "#F1E4C4",
  in: "#2F7A5C",
  inSoft: "#E3F0E9",
  out: "#B84A2F",
  outSoft: "#F6E4DE",
  border: "#E3DFD3",
  muted: "#8A8577",
};

const T = {
  ar: {
    appName: "دفتر المصنع", tagline: "إدارة المشتريات والمبيعات والعملاء",
    dashboard: "الرئيسية", purchases: "المشتريات", sales: "المبيعات",
    parties: "العملاء والموردون", reports: "التقارير",
    addPurchase: "إضافة مشترى", addSale: "إضافة عملية بيع", addParty: "إضافة طرف",
    date: "التاريخ", supplier: "المورد", client: "العميل", party: "الطرف",
    description: "الوصف", quantity: "الكمية", unitPrice: "سعر الوحدة",
    total: "الإجمالي", paid: "المدفوع الآن", remaining: "المتبقي",
    notes: "ملاحظات", save: "حفظ", cancel: "إلغاء", name: "الاسم",
    phone: "الهاتف", type: "النوع", clientType: "عميل", supplierType: "مورد",
    bothType: "عميل ومورد", balance: "الرصيد", theyOweYou: "له عندك",
    youOweThem: "لك عنده", settled: "لا يوجد رصيد", recordPayment: "تسجيل دفعة",
    paymentAmount: "المبلغ", paymentIn: "دفعة من العميل", paymentOut: "دفعة لمورد",
    selectParty: "اختر الطرف", newParty: "طرف جديد...", month: "الشهر",
    totalSales: "إجمالي المبيعات", totalPurchases: "إجمالي المشتريات",
    moneyIn: "وارد نقدي", moneyOut: "منصرف نقدي", netCashFlow: "صافي التدفق",
    outstandingReceivables: "مستحق لك من العملاء", outstandingPayables: "مستحق عليك للموردين",
    transactionsThisMonth: "عمليات هذا الشهر", noData: "لا توجد بيانات بعد",
    delete: "حذف", edit: "تعديل", search: "بحث...", all: "الكل",
    exportCsv: "تصدير CSV", currency: "ج.م", recent: "أحدث العمليات",
    confirmDelete: "هل تريد حذف هذا السجل؟", yes: "نعم", no: "لا",
    history: "سجل العمليات", noHistory: "لا توجد عمليات لهذا الطرف",
    thisMonth: "هذا الشهر", invoiced: "قيمة الفواتير", collected: "المحصل",
    close: "إغلاق", partyRequired: "من فضلك أدخل اسم الطرف",
    amountRequired: "من فضلك أدخل المبلغ", quickStats: "نظرة سريعة",
    numClients: "عدد العملاء", numSuppliers: "عدد الموردين",
    snapshot: "لقطة حتى اليوم", loading: "جاري التحميل...",
    username: "اسم المستخدم", password: "كلمة المرور", confirmPassword: "تأكيد كلمة المرور",
    createAdminAccount: "إنشاء حساب المدير", loginButton: "تسجيل الدخول",
    invalidCredentials: "بيانات الدخول غير صحيحة", logout: "تسجيل الخروج",
    welcomeBack: "أدخل بياناتك لتسجيل الدخول", setupAdminDesc: "قم بإنشاء حساب المدير لأول مرة",
    passwordsMustMatch: "كلمتا المرور غير متطابقتين", passwordTooShort: "كلمة المرور قصيرة جدًا (٤ أحرف على الأقل)",
    fillAllFields: "من فضلك أدخل جميع الحقول",
    remaining: "المتبقي", downloadExcel: "تحميل تقرير Excel", summaryReport: "تقرير ملخص",
    salesReportTitle: "تقرير المبيعات", purchasesReportTitle: "تقرير المشتريات", balancesReport: "تقرير الأرصدة",
    item: "البند", value: "القيمة", statusCol: "الحالة", generatedOn: "تاريخ الإصدار",
  },
  en: {
    appName: "Factory Ledger", tagline: "Purchases, sales and client balances",
    dashboard: "Dashboard", purchases: "Purchases", sales: "Sales",
    parties: "Clients & Suppliers", reports: "Reports",
    addPurchase: "Add purchase", addSale: "Add sale", addParty: "Add party",
    date: "Date", supplier: "Supplier", client: "Client", party: "Party",
    description: "Description", quantity: "Quantity", unitPrice: "Unit price",
    total: "Total", paid: "Paid now", remaining: "Remaining",
    notes: "Notes", save: "Save", cancel: "Cancel", name: "Name",
    phone: "Phone", type: "Type", clientType: "Client", supplierType: "Supplier",
    bothType: "Client & supplier", balance: "Balance", theyOweYou: "Owes you",
    youOweThem: "You owe", settled: "Settled", recordPayment: "Record payment",
    paymentAmount: "Amount", paymentIn: "Payment from client", paymentOut: "Payment to supplier",
    selectParty: "Select party", newParty: "New party...", month: "Month",
    totalSales: "Total sales", totalPurchases: "Total purchases",
    moneyIn: "Money in", moneyOut: "Money out", netCashFlow: "Net cash flow",
    outstandingReceivables: "Owed to you by clients", outstandingPayables: "Owed by you to suppliers",
    transactionsThisMonth: "Transactions this month", noData: "No data yet",
    delete: "Delete", edit: "Edit", search: "Search...", all: "All",
    exportCsv: "Export CSV", currency: "EGP", recent: "Recent transactions",
    confirmDelete: "Delete this record?", yes: "Yes", no: "No",
    history: "Transaction history", noHistory: "No transactions for this party",
    thisMonth: "This month", invoiced: "Invoiced", collected: "Collected",
    close: "Close", partyRequired: "Please enter a party name",
    amountRequired: "Please enter an amount", quickStats: "At a glance",
    numClients: "Clients", numSuppliers: "Suppliers",
    snapshot: "Snapshot as of today", loading: "Loading...",
    username: "Username", password: "Password", confirmPassword: "Confirm password",
    createAdminAccount: "Create admin account", loginButton: "Log in",
    invalidCredentials: "Invalid username or password", logout: "Log out",
    welcomeBack: "Enter your details to log in", setupAdminDesc: "Set up the admin account for first use",
    passwordsMustMatch: "Passwords don't match", passwordTooShort: "Password is too short (min 4 characters)",
    fillAllFields: "Please fill in all fields",
    remaining: "Remaining", downloadExcel: "Download Excel report", summaryReport: "Summary report",
    salesReportTitle: "Sales report", purchasesReportTitle: "Purchases report", balancesReport: "Balances report",
    item: "Item", value: "Value", statusCol: "Status", generatedOn: "Generated on",
  },
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const todayISO = () => new Date().toISOString().slice(0, 10);
const monthKey = (d) => (d || "").slice(0, 7);
const thisMonthKey = () => todayISO().slice(0, 7);

function fmtMoney(n, lang) {
  const v = Math.round((Number(n) || 0) * 100) / 100;
  const s = v.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 2 });
  return lang === "ar" ? `${s} ${T.ar.currency}` : `${T.en.currency} ${s}`;
}

function balanceImpact(t) {
  if (t.kind === "sale") return t.total - t.paid;
  if (t.kind === "purchase") return -(t.total - t.paid);
  if (t.kind === "payment_in") return -t.paid;
  if (t.kind === "payment_out") return t.paid;
  return 0;
}

function StitchDivider() {
  return (
    <svg width="100%" height="8" style={{ display: "block", margin: "4px 0" }}>
      <line x1="0" y1="4" x2="100%" y2="4" stroke={COLORS.accent} strokeWidth="1.5"
        strokeDasharray="5,5" opacity="0.55" />
    </svg>
  );
}

function Badge({ children, color, bg }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 999,
      fontSize: 12, fontWeight: 600, color, background: bg, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Btn({ children, onClick, variant = "primary", style, disabled }) {
  const base = {
    padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer", border: "none",
    display: "inline-flex", alignItems: "center", gap: 6, opacity: disabled ? 0.5 : 1,
    transition: "transform 0.1s",
  };
  const variants = {
    primary: { background: COLORS.ink, color: "#fff" },
    accent: { background: COLORS.accent, color: "#fff" },
    ghost: { background: "transparent", color: COLORS.ink, border: `1px solid ${COLORS.border}` },
    danger: { background: COLORS.outSoft, color: COLORS.out },
  };
  return (
    <button disabled={disabled} onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      {children}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      {label && <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 4, fontWeight: 600 }}>{label}</div>}
      <input {...props} style={{
        width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
        fontSize: 14, boxSizing: "border-box", background: "#FCFBF8", color: COLORS.ink, fontFamily: "inherit",
        ...(props.style || {}),
      }} />
    </label>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      {label && <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 4, fontWeight: 600 }}>{label}</div>}
      <select {...props} style={{
        width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
        fontSize: 14, boxSizing: "border-box", background: "#FCFBF8", color: COLORS.ink, fontFamily: "inherit",
      }}>{children}</select>
    </label>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(35,40,64,0.45)", zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: COLORS.surface, borderRadius: 14, padding: 24, width: "100%",
        maxWidth: wide ? 640 : 460, maxHeight: "88vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(35,40,64,0.25)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: COLORS.ink, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MetricCard({ label, value, tone }) {
  const toneColor = tone === "in" ? COLORS.in : tone === "out" ? COLORS.out : COLORS.ink;
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12,
      padding: "16px 18px", flex: "1 1 180px", minWidth: 160,
    }}>
      <div style={{ fontSize: 12.5, color: COLORS.muted, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</div>
      <div style={{ fontSize: 21, fontWeight: 800, color: toneColor, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    </div>
  );
}

function ReportCard({ title, desc, label, onClick }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>{desc}</div>
      <Btn variant="accent" style={{ width: "100%", justifyContent: "center" }} onClick={onClick}>
        <Download size={15} /> {label}
      </Btn>
    </div>
  );
}

export default function FactoryLedger() {
  const [lang, setLang] = useState("ar");
  const t = T[lang];
  const isRTL = lang === "ar";

  const [parties, setParties] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("dashboard");

  const [authChecked, setAuthChecked] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [txModal, setTxModal] = useState(null); // { kind: 'purchase'|'sale' }
  const [payModal, setPayModal] = useState(null); // { party }
  const [partyModal, setPartyModal] = useState(false);
  const [partyDetail, setPartyDetail] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null); // { kind:'tx'|'party', id }
  const [search, setSearch] = useState("");
  const [reportMonth, setReportMonth] = useState(thisMonthKey());

  useEffect(() => {
    (async () => {
      try {
        const has = await window.auth.hasAdmin();
        setHasAdmin(!!has);
      } catch (e) { /* ignore */ }
      setAuthChecked(true);
    })();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      try {
        const [p, tx] = await Promise.all([window.db.getParties(), window.db.getTransactions()]);
        setParties(p || []);
        setTransactions(tx || []);
      } catch (e) { /* no data yet */ }
      setLoaded(true);
    })();
  }, [loggedIn]);

  function logout() {
    setLoggedIn(false);
    setLoaded(false);
    setParties([]);
    setTransactions([]);
    setTab("dashboard");
  }

  const partyBalance = (partyId) =>
    transactions.filter((x) => x.partyId === partyId).reduce((s, x) => s + balanceImpact(x), 0);

  const partiesWithBalance = useMemo(
    () => parties.map((p) => ({ ...p, balance: partyBalance(p.id) })),
    [parties, transactions]
  );

  const totalReceivable = partiesWithBalance.reduce((s, p) => s + Math.max(p.balance, 0), 0);
  const totalPayable = partiesWithBalance.reduce((s, p) => s + Math.max(-p.balance, 0), 0);

  const monthTx = (mk) => transactions.filter((x) => monthKey(x.date) === mk);
  const currentMonthTx = monthTx(thisMonthKey());
  const moneyInThisMonth = currentMonthTx.filter((x) => x.kind === "sale" || x.kind === "payment_in").reduce((s, x) => s + x.paid, 0);
  const moneyOutThisMonth = currentMonthTx.filter((x) => x.kind === "purchase" || x.kind === "payment_out").reduce((s, x) => s + x.paid, 0);

  function addParty(name, type, phone) {
    const p = { id: uid(), name, type, phone: phone || "" };
    setParties((prev) => [...prev, p]);
    window.db.upsertParty(p).catch(() => {});
    return p;
  }

  function findOrCreateParty(name, defaultType) {
    const existing = parties.find((p) => p.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (existing) return existing;
    return addParty(name.trim(), defaultType);
  }

  function saveTransaction(kind, form) {
    let partyId = form.partyId;
    if (partyId === "__new__") {
      const p = findOrCreateParty(form.newPartyName, kind === "purchase" ? "supplier" : "client");
      partyId = p.id;
    }
    const total = kind === "purchase" || kind === "sale"
      ? (Number(form.quantity) || 0) * (Number(form.unitPrice) || 0)
      : Number(form.amount) || 0;
    const paid = kind === "purchase" || kind === "sale" ? (Number(form.paid) || 0) : total;
    const record = {
      id: uid(), kind, date: form.date || todayISO(), partyId,
      description: form.description || "", quantity: Number(form.quantity) || 0,
      unitPrice: Number(form.unitPrice) || 0, total, paid, notes: form.notes || "",
    };
    setTransactions((prev) => [record, ...prev]);
    window.db.upsertTransaction(record).catch(() => {});
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((x) => x.id !== id));
    window.db.deleteTransaction(id).catch(() => {});
  }
  function deleteParty(id) {
    setParties((prev) => prev.filter((p) => p.id !== id));
    setTransactions((prev) => prev.filter((x) => x.partyId !== id));
    window.db.deleteParty(id).catch(() => {});
  }

  function exportCsv(mk) {
    const rows = monthTx(mk);
    const header = ["date", "type", "party", "description", "quantity", "unit_price", "total", "paid", "notes"];
    const lines = [header.join(",")];
    rows.forEach((r) => {
      const p = parties.find((x) => x.id === r.partyId);
      lines.push([r.date, r.kind, p ? p.name : "", (r.description || "").replace(/,/g, ";"),
        r.quantity, r.unitPrice, r.total, r.paid, (r.notes || "").replace(/,/g, ";")].join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `report-${mk}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  function escHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function excelDoc(title, headers, rows) {
    const isRTL = lang === "ar";
    const align = isRTL ? "right" : "left";
    const style = `body{font-family:Arial,sans-serif;} table{border-collapse:collapse;} ` +
      `th{background:#232840;color:#ffffff;padding:8px 12px;border:1px solid #999999;font-size:13px;text-align:${align};} ` +
      `td{padding:6px 12px;border:1px solid #cccccc;font-size:12px;text-align:${align};} ` +
      `.ttl{font-size:18px;font-weight:bold;color:#232840;padding:6px 0;} .sub{font-size:12px;color:#8A8577;padding-bottom:10px;} ` +
      `.posv{color:#2F7A5C;font-weight:bold;} .negv{color:#B84A2F;font-weight:bold;}`;
    const head = `<tr>${headers.map((h) => `<th>${escHtml(h)}</th>`).join("")}</tr>`;
    const body = rows.map((r) => `<tr>${r.map((c) => {
      let cls = ""; let val = c;
      if (c && typeof c === "object") { cls = c.cls ? ` class="${c.cls}"` : ""; val = c.text; }
      return `<td${cls}>${escHtml(val)}</td>`;
    }).join("")}</tr>`).join("");
    return `<html${isRTL ? ' dir="rtl"' : ""}><head><meta charset="UTF-8"/><style>${style}</style></head><body>` +
      `<div class="ttl">${escHtml(title)}</div><div class="sub">${escHtml(t.generatedOn)}: ${escHtml(todayISO())}</div>` +
      `<table><thead>${head}</thead><tbody>${body}</tbody></table></body></html>`;
  }

  function downloadExcelFile(filename, htmlContent) {
    const blob = new Blob(["\ufeff" + htmlContent], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function txRowsForExcel(list) {
    return list.map((x) => {
      const p = parties.find((pp) => pp.id === x.partyId);
      return [x.date, p ? p.name : "", x.description || "", x.quantity || "", x.unitPrice || "",
        { text: fmtMoney(x.total, lang) }, { text: fmtMoney(x.paid, lang), cls: "posv" },
        { text: fmtMoney(x.total - x.paid, lang), cls: (x.total - x.paid) > 0 ? "negv" : "" }, x.notes || ""];
    });
  }

  function exportSummaryExcel() {
    const mk = reportMonth;
    const tx = monthTx(mk);
    const moneyIn = tx.filter((x) => x.kind === "sale" || x.kind === "payment_in").reduce((s, x) => s + x.paid, 0);
    const moneyOut = tx.filter((x) => x.kind === "purchase" || x.kind === "payment_out").reduce((s, x) => s + x.paid, 0);
    const totalSalesInvoiced = tx.filter((x) => x.kind === "sale").reduce((s, x) => s + x.total, 0);
    const totalPurchasesInvoiced = tx.filter((x) => x.kind === "purchase").reduce((s, x) => s + x.total, 0);
    const headers = [t.item, t.value];
    const rows = [
      [t.moneyIn, { text: fmtMoney(moneyIn, lang), cls: "posv" }],
      [t.moneyOut, { text: fmtMoney(moneyOut, lang), cls: "negv" }],
      [t.netCashFlow, { text: fmtMoney(moneyIn - moneyOut, lang), cls: (moneyIn - moneyOut) >= 0 ? "posv" : "negv" }],
      [`${t.totalSales} (${t.invoiced})`, fmtMoney(totalSalesInvoiced, lang)],
      [`${t.totalPurchases} (${t.invoiced})`, fmtMoney(totalPurchasesInvoiced, lang)],
    ];
    downloadExcelFile(`summary-${mk}.xls`, excelDoc(`${t.summaryReport} — ${mk}`, headers, rows));
  }

  function exportSalesExcel() {
    const mk = reportMonth;
    const list = monthTx(mk).filter((x) => x.kind === "sale");
    const headers = [t.date, t.client, t.description, t.quantity, t.unitPrice, t.total, t.paid, t.remaining, t.notes];
    downloadExcelFile(`sales-${mk}.xls`, excelDoc(`${t.salesReportTitle} — ${mk}`, headers, txRowsForExcel(list)));
  }

  function exportPurchasesExcel() {
    const mk = reportMonth;
    const list = monthTx(mk).filter((x) => x.kind === "purchase");
    const headers = [t.date, t.supplier, t.description, t.quantity, t.unitPrice, t.total, t.paid, t.remaining, t.notes];
    downloadExcelFile(`purchases-${mk}.xls`, excelDoc(`${t.purchasesReportTitle} — ${mk}`, headers, txRowsForExcel(list)));
  }

  function exportBalancesExcel() {
    const headers = [t.name, t.type, t.statusCol, t.balance || t.theyOweYou];
    const rows = partiesWithBalance.map((p) => {
      const typeLabel = p.type === "client" ? t.clientType : p.type === "supplier" ? t.supplierType : t.bothType;
      const statusLabel = p.balance > 0 ? t.theyOweYou : p.balance < 0 ? t.youOweThem : t.settled;
      return [p.name, typeLabel, statusLabel, { text: fmtMoney(Math.abs(p.balance), lang), cls: p.balance > 0 ? "posv" : p.balance < 0 ? "negv" : "" }];
    });
    downloadExcelFile(`balances-${todayISO()}.xls`, excelDoc(`${t.balancesReport} — ${t.snapshot}`, headers, rows));
  }

  const navItems = [
    { key: "dashboard", label: t.dashboard, icon: BarChart3 },
    { key: "purchases", label: t.purchases, icon: Package },
    { key: "sales", label: t.sales, icon: ShoppingCart },
    { key: "parties", label: t.parties, icon: Users },
    { key: "reports", label: t.reports, icon: Wallet },
  ];

  if (!authChecked) {
    return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontFamily: "Cairo, sans-serif" }}>{t.loading}</div>;
  }

  if (!loggedIn) {
    return (
      <AuthScreen
        hasAdmin={hasAdmin} lang={lang} t={t}
        onCreated={() => { setHasAdmin(true); setLoggedIn(true); }}
        onLoggedIn={() => setLoggedIn(true)}
      />
    );
  }

  if (!loaded) {
    return <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontFamily: "Cairo, sans-serif" }}>{t.loading}</div>;
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{
      fontFamily: "'Cairo', sans-serif", background: COLORS.bg, minHeight: 600,
      display: "flex", color: COLORS.ink, borderRadius: 16, overflow: "hidden",
      border: `1px solid ${COLORS.border}`,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');`}</style>

      {/* Sidebar */}
      <div style={{
        width: 210, background: COLORS.ink, color: "#fff", padding: "22px 14px",
        display: "flex", flexDirection: "column", gap: 4, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, padding: "0 6px" }}>
          <Scissors size={20} color={COLORS.accent} />
          <div style={{ fontWeight: 800, fontSize: 16 }}>{t.appName}</div>
        </div>
        <div style={{ fontSize: 11.5, color: "#9498B0", padding: "0 6px", marginBottom: 18 }}>{t.tagline}</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = tab === item.key;
          return (
            <button key={item.key} onClick={() => setTab(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 8, border: "none", cursor: "pointer", textAlign: isRTL ? "right" : "left",
              background: active ? "rgba(201,151,46,0.18)" : "transparent",
              color: active ? COLORS.accent : "#D5D7E3", fontSize: 14, fontWeight: 600, fontFamily: "inherit",
            }}>
              <Icon size={17} /> {item.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#D5D7E3",
          cursor: "pointer", fontSize: 13, fontFamily: "inherit",
        }}>
          <Globe size={15} /> {lang === "ar" ? "English" : "العربية"}
        </button>
        <button onClick={logout} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#D5D7E3",
          cursor: "pointer", fontSize: 13, fontFamily: "inherit", marginTop: 6,
        }}>
          <X size={15} /> {t.logout}
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 26, overflowY: "auto", maxHeight: 700 }}>
        {tab === "dashboard" && (
          <Dashboard t={t} lang={lang} moneyIn={moneyInThisMonth} moneyOut={moneyOutThisMonth}
            totalReceivable={totalReceivable} totalPayable={totalPayable}
            parties={parties} transactions={transactions.slice(0, 6)} />
        )}
        {tab === "purchases" && (
          <TxList t={t} lang={lang} kind="purchase" transactions={transactions.filter((x) => x.kind === "purchase")}
            parties={parties} onAdd={() => setTxModal({ kind: "purchase" })}
            onDelete={(id) => setConfirmDel({ kind: "tx", id })}
            search={search} setSearch={setSearch} />
        )}
        {tab === "sales" && (
          <TxList t={t} lang={lang} kind="sale" transactions={transactions.filter((x) => x.kind === "sale")}
            parties={parties} onAdd={() => setTxModal({ kind: "sale" })}
            onDelete={(id) => setConfirmDel({ kind: "tx", id })}
            search={search} setSearch={setSearch} />
        )}
        {tab === "parties" && (
          <PartiesView t={t} lang={lang} parties={partiesWithBalance}
            onAdd={() => setPartyModal(true)} onOpen={(p) => setPartyDetail(p)}
            search={search} setSearch={setSearch} />
        )}
        {tab === "reports" && (
          <ReportsView t={t} lang={lang} reportMonth={reportMonth} setReportMonth={setReportMonth}
            transactions={monthTx(reportMonth)} parties={parties}
            totalReceivable={totalReceivable} totalPayable={totalPayable}
            onExport={() => exportCsv(reportMonth)}
            onExportSummary={exportSummaryExcel} onExportSales={exportSalesExcel}
            onExportPurchases={exportPurchasesExcel} onExportBalances={exportBalancesExcel} />
        )}
      </div>

      {txModal && (
        <TxModal t={t} lang={lang} kind={txModal.kind} parties={parties}
          onClose={() => setTxModal(null)}
          onSave={(form) => { saveTransaction(txModal.kind, form); setTxModal(null); }} />
      )}
      {payModal && (
        <PaymentModal t={t} lang={lang} party={payModal.party}
          onClose={() => setPayModal(null)}
          onSave={(form) => {
            const kind = payModal.party.type === "supplier" ? "payment_out" : "payment_in";
            saveTransaction(kind === "payment_out" ? "payment_out" : "payment_in", {
              ...form, partyId: payModal.party.id,
            });
            setPayModal(null);
          }} />
      )}
      {partyModal && (
        <PartyModal t={t} lang={lang} onClose={() => setPartyModal(false)}
          onSave={(name, type, phone) => {
            const p = { id: uid(), name, type, phone };
            setParties((prev) => [...prev, p]);
            setPartyModal(false);
          }} />
      )}
      {partyDetail && (
        <PartyDetailModal t={t} lang={lang}
          party={partiesWithBalance.find((p) => p.id === partyDetail.id) || partyDetail}
          transactions={transactions.filter((x) => x.partyId === partyDetail.id)}
          parties={parties}
          onClose={() => setPartyDetail(null)}
          onPay={() => setPayModal({ party: partyDetail })}
          onDeleteTx={(id) => setConfirmDel({ kind: "tx", id })}
          onDeleteParty={() => setConfirmDel({ kind: "party", id: partyDetail.id })}
        />
      )}
      {confirmDel && (
        <Modal title={t.confirmDelete} onClose={() => setConfirmDel(null)}>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setConfirmDel(null)}>{t.no}</Btn>
            <Btn variant="danger" onClick={() => {
              if (confirmDel.kind === "tx") deleteTransaction(confirmDel.id);
              else { deleteParty(confirmDel.id); setPartyDetail(null); }
              setConfirmDel(null);
            }}>{t.yes}, {t.delete}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Dashboard({ t, lang, moneyIn, moneyOut, totalReceivable, totalPayable, parties, transactions }) {
  const net = moneyIn - moneyOut;
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>{t.dashboard}</h2>
      <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>{t.thisMonth}</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <MetricCard label={t.moneyIn} value={fmtMoney(moneyIn, lang)} tone="in" />
        <MetricCard label={t.moneyOut} value={fmtMoney(moneyOut, lang)} tone="out" />
        <MetricCard label={t.netCashFlow} value={fmtMoney(net, lang)} tone={net >= 0 ? "in" : "out"} />
      </div>
      <StitchDivider />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "18px 0 22px" }}>
        <MetricCard label={t.outstandingReceivables} value={fmtMoney(totalReceivable, lang)} tone="in" />
        <MetricCard label={t.outstandingPayables} value={fmtMoney(totalPayable, lang)} tone="out" />
        <MetricCard label={t.numClients} value={parties.filter((p) => p.type !== "supplier").length} />
        <MetricCard label={t.numSuppliers} value={parties.filter((p) => p.type !== "client").length} />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{t.recent}</h3>
      {transactions.length === 0 ? (
        <Empty t={t} />
      ) : (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          {transactions.map((x, i) => (
            <TxRow key={x.id} tx={x} lang={lang} parties={[]} t={t} last={i === transactions.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function Empty({ t }) {
  return <div style={{ padding: 30, textAlign: "center", color: COLORS.muted, fontSize: 14 }}>{t.noData}</div>;
}

function TxRow({ tx, lang, t, last, partyName, onDelete }) {
  const isIn = tx.kind === "sale" || tx.kind === "payment_in";
  const Icon = isIn ? ArrowUpCircle : ArrowDownCircle;
  const label = { purchase: t.purchases, sale: t.sales, payment_in: t.paymentIn, payment_out: t.paymentOut }[tx.kind];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
      borderBottom: last ? "none" : `1px solid ${COLORS.border}`,
    }}>
      <Icon size={18} color={isIn ? COLORS.in : COLORS.out} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {partyName || label} {tx.description ? `— ${tx.description}` : ""}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>{tx.date} · {label}</div>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13.5, color: isIn ? COLORS.in : COLORS.out, whiteSpace: "nowrap" }}>
        {isIn ? "+" : "-"}{fmtMoney(tx.paid, lang)}
      </div>
      {onDelete && (
        <button onClick={() => onDelete(tx.id)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted }}>
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}

function TxList({ t, lang, kind, transactions, parties, onAdd, onDelete, search, setSearch }) {
  const filtered = transactions.filter((x) => {
    const p = parties.find((pp) => pp.id === x.partyId);
    const hay = `${p ? p.name : ""} ${x.description}`.toLowerCase();
    return hay.includes(search.toLowerCase());
  });
  const label = kind === "purchase" ? t.purchases : t.sales;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{label}</h2>
        <Btn variant="accent" onClick={onAdd}><Plus size={16} /> {kind === "purchase" ? t.addPurchase : t.addSale}</Btn>
      </div>
      <div style={{ position: "relative", marginBottom: 14, maxWidth: 320 }}>
        <Search size={15} style={{ position: "absolute", top: 11, insetInlineStart: 10, color: COLORS.muted }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search}
          style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
      </div>
      {filtered.length === 0 ? <Empty t={t} /> : (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          {filtered.map((x, i) => {
            const p = parties.find((pp) => pp.id === x.partyId);
            return <TxRow key={x.id} tx={x} lang={lang} t={t} last={i === filtered.length - 1} partyName={p ? p.name : ""} onDelete={onDelete} />;
          })}
        </div>
      )}
    </div>
  );
}

function PartiesView({ t, lang, parties, onAdd, onOpen, search, setSearch }) {
  const filtered = parties.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{t.parties}</h2>
        <Btn variant="accent" onClick={onAdd}><Plus size={16} /> {t.addParty}</Btn>
      </div>
      <div style={{ position: "relative", marginBottom: 14, maxWidth: 320 }}>
        <Search size={15} style={{ position: "absolute", top: 11, insetInlineStart: 10, color: COLORS.muted }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search}
          style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
      </div>
      {filtered.length === 0 ? <Empty t={t} /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
          {filtered.map((p) => {
            const typeLabel = p.type === "client" ? t.clientType : p.type === "supplier" ? t.supplierType : t.bothType;
            const bal = p.balance;
            return (
              <div key={p.id} onClick={() => onOpen(p)} style={{
                background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12,
                padding: 16, cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <Badge color={COLORS.inkSoft} bg={COLORS.accentSoft}>{typeLabel}</Badge>
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>
                  {bal > 0 ? t.theyOweYou : bal < 0 ? t.youOweThem : t.settled}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 16, color: bal > 0 ? COLORS.in : bal < 0 ? COLORS.out : COLORS.muted }}>
                  {fmtMoney(Math.abs(bal), lang)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ReportsView({ t, lang, reportMonth, setReportMonth, transactions, parties, totalReceivable, totalPayable,
  onExport, onExportSummary, onExportSales, onExportPurchases, onExportBalances }) {
  const sales = transactions.filter((x) => x.kind === "sale");
  const purchases = transactions.filter((x) => x.kind === "purchase");
  const totalSalesInvoiced = sales.reduce((s, x) => s + x.total, 0);
  const totalPurchasesInvoiced = purchases.reduce((s, x) => s + x.total, 0);
  const moneyIn = transactions.filter((x) => x.kind === "sale" || x.kind === "payment_in").reduce((s, x) => s + x.paid, 0);
  const moneyOut = transactions.filter((x) => x.kind === "purchase" || x.kind === "payment_out").reduce((s, x) => s + x.paid, 0);
  const net = moneyIn - moneyOut;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{t.reports}</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="month" value={reportMonth} onChange={(e) => setReportMonth(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, fontFamily: "inherit" }} />
          <Btn variant="ghost" onClick={onExport}><Download size={15} /> {t.exportCsv}</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 22 }}>
        <ReportCard title={t.summaryReport} desc={t.transactionsThisMonth} label={t.downloadExcel} onClick={onExportSummary} />
        <ReportCard title={t.salesReportTitle} desc={t.sales} label={t.downloadExcel} onClick={onExportSales} />
        <ReportCard title={t.purchasesReportTitle} desc={t.purchases} label={t.downloadExcel} onClick={onExportPurchases} />
        <ReportCard title={t.balancesReport} desc={t.snapshot} label={t.downloadExcel} onClick={onExportBalances} />
      </div>
      <StitchDivider />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "18px 0" }}>
        <MetricCard label={t.moneyIn} value={fmtMoney(moneyIn, lang)} tone="in" />
        <MetricCard label={t.moneyOut} value={fmtMoney(moneyOut, lang)} tone="out" />
        <MetricCard label={t.netCashFlow} value={fmtMoney(net, lang)} tone={net >= 0 ? "in" : "out"} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
        <MetricCard label={`${t.totalSales} (${t.invoiced})`} value={fmtMoney(totalSalesInvoiced, lang)} />
        <MetricCard label={`${t.totalPurchases} (${t.invoiced})`} value={fmtMoney(totalPurchasesInvoiced, lang)} />
      </div>
      <StitchDivider />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "18px 0" }}>
        <MetricCard label={`${t.outstandingReceivables} (${t.snapshot})`} value={fmtMoney(totalReceivable, lang)} tone="in" />
        <MetricCard label={`${t.outstandingPayables} (${t.snapshot})`} value={fmtMoney(totalPayable, lang)} tone="out" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{t.transactionsThisMonth}</h3>
      {transactions.length === 0 ? <Empty t={t} /> : (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          {transactions.map((x, i) => {
            const p = parties.find((pp) => pp.id === x.partyId);
            return <TxRow key={x.id} tx={x} lang={lang} t={t} last={i === transactions.length - 1} partyName={p ? p.name : ""} />;
          })}
        </div>
      )}
    </div>
  );
}

function TxModal({ t, lang, kind, parties, onClose, onSave }) {
  const relevantParties = parties.filter((p) => kind === "purchase" ? p.type !== "client" : p.type !== "supplier");
  const [form, setForm] = useState({
    date: todayISO(), partyId: relevantParties[0]?.id || "__new__", newPartyName: "",
    description: "", quantity: 1, unitPrice: "", paid: "", notes: "",
  });
  const total = (Number(form.quantity) || 0) * (Number(form.unitPrice) || 0);
  const canSave = (form.partyId !== "__new__" || form.newPartyName.trim()) && Number(form.unitPrice) > 0;

  return (
    <Modal title={kind === "purchase" ? t.addPurchase : t.addSale} onClose={onClose}>
      <Input label={t.date} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <Select label={kind === "purchase" ? t.supplier : t.client} value={form.partyId}
        onChange={(e) => setForm({ ...form, partyId: e.target.value })}>
        {relevantParties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        <option value="__new__">{t.newParty}</option>
      </Select>
      {form.partyId === "__new__" && (
        <Input label={t.name} value={form.newPartyName} onChange={(e) => setForm({ ...form, newPartyName: e.target.value })} />
      )}
      <Input label={t.description} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Input label={t.quantity} type="number" min="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </div>
        <div style={{ flex: 1 }}>
          <Input label={t.unitPrice} type="number" min="0" value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
        </div>
      </div>
      <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 12 }}>
        {t.total}: <b style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fmtMoney(total, lang)}</b>
      </div>
      <Input label={t.paid} type="number" min="0" max={total} value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })} />
      <Input label={t.notes} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="ghost" onClick={onClose}>{t.cancel}</Btn>
        <Btn variant="accent" disabled={!canSave} onClick={() => onSave(form)}>{t.save}</Btn>
      </div>
    </Modal>
  );
}

function PaymentModal({ t, lang, party, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [notes, setNotes] = useState("");
  const isIn = party.type !== "supplier";
  return (
    <Modal title={`${t.recordPayment} — ${party.name}`} onClose={onClose}>
      <Input label={t.date} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Input label={t.paymentAmount} type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Input label={t.notes} value={notes} onChange={(e) => setNotes(e.target.value)} />
      <div style={{ fontSize: 12.5, color: COLORS.muted, marginBottom: 12 }}>
        {isIn ? t.paymentIn : t.paymentOut}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="ghost" onClick={onClose}>{t.cancel}</Btn>
        <Btn variant="accent" disabled={!(Number(amount) > 0)} onClick={() => onSave({ date, amount, notes })}>{t.save}</Btn>
      </div>
    </Modal>
  );
}

function PartyModal({ t, lang, onClose, onSave }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("client");
  const [phone, setPhone] = useState("");
  return (
    <Modal title={t.addParty} onClose={onClose}>
      <Input label={t.name} value={name} onChange={(e) => setName(e.target.value)} />
      <Select label={t.type} value={type} onChange={(e) => setType(e.target.value)}>
        <option value="client">{t.clientType}</option>
        <option value="supplier">{t.supplierType}</option>
        <option value="both">{t.bothType}</option>
      </Select>
      <Input label={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <Btn variant="ghost" onClick={onClose}>{t.cancel}</Btn>
        <Btn variant="accent" disabled={!name.trim()} onClick={() => onSave(name.trim(), type, phone)}>{t.save}</Btn>
      </div>
    </Modal>
  );
}

function PartyDetailModal({ t, lang, party, transactions, onClose, onPay, onDeleteTx, onDeleteParty }) {
  const bal = party.balance ?? 0;
  const typeLabel = party.type === "client" ? t.clientType : party.type === "supplier" ? t.supplierType : t.bothType;
  const sorted = [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <Modal title={party.name} onClose={onClose} wide>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <Badge color={COLORS.inkSoft} bg={COLORS.accentSoft}>{typeLabel}</Badge>
        {party.phone && <Badge color={COLORS.inkSoft} bg={COLORS.bg}>{party.phone}</Badge>}
      </div>
      <div style={{
        background: bal > 0 ? COLORS.inSoft : bal < 0 ? COLORS.outSoft : COLORS.bg,
        borderRadius: 10, padding: 14, marginBottom: 16,
      }}>
        <div style={{ fontSize: 12.5, color: COLORS.muted, marginBottom: 4 }}>
          {bal > 0 ? t.theyOweYou : bal < 0 ? t.youOweThem : t.settled}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 20, color: bal > 0 ? COLORS.in : bal < 0 ? COLORS.out : COLORS.muted }}>
          {fmtMoney(Math.abs(bal), lang)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <Btn variant="accent" onClick={onPay}><Wallet size={15} /> {t.recordPayment}</Btn>
        <Btn variant="danger" onClick={onDeleteParty}><Trash2 size={15} /> {t.delete}</Btn>
      </div>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{t.history}</h4>
      {sorted.length === 0 ? <Empty t={t} /> : (
        <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
          {sorted.map((x, i) => <TxRow key={x.id} tx={x} lang={lang} t={t} last={i === sorted.length - 1} onDelete={onDeleteTx} />)}
        </div>
      )}
    </Modal>
  );
}

function AuthScreen({ hasAdmin, lang, t, onCreated, onLoggedIn }) {
  const isRTL = lang === "ar";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError("");
    if (!username.trim() || !password) { setError(t.fillAllFields); return; }
    setBusy(true);
    try {
      if (!hasAdmin) {
        if (password !== confirm) { setError(t.passwordsMustMatch); setBusy(false); return; }
        if (password.length < 4) { setError(t.passwordTooShort); setBusy(false); return; }
        const res = await window.auth.createAdmin(username.trim(), password);
        if (res && res.ok) onCreated(); else setError(t.invalidCredentials);
      } else {
        const res = await window.auth.login(username.trim(), password);
        if (res && res.ok) onLoggedIn(); else setError(t.invalidCredentials);
      }
    } catch (e) {
      setError(t.invalidCredentials);
    }
    setBusy(false);
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{
      minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center",
      background: COLORS.bg, fontFamily: "'Cairo', sans-serif", borderRadius: 16,
      border: `1px solid ${COLORS.border}`,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');`}</style>
      <div style={{
        width: 340, background: COLORS.surface, borderRadius: 14, padding: 28,
        border: `1px solid ${COLORS.border}`, boxShadow: "0 12px 30px rgba(35,40,64,0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Scissors size={20} color={COLORS.accent} />
          <div style={{ fontWeight: 800, fontSize: 17 }}>{t.appName}</div>
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 18 }}>
          {hasAdmin ? t.welcomeBack : t.setupAdminDesc}
        </div>
        <Input label={t.username} value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label={t.password} type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && hasAdmin) submit(); }} />
        {!hasAdmin && (
          <Input label={t.confirmPassword} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
        )}
        {error && <div style={{ color: COLORS.out, fontSize: 13, marginBottom: 10 }}>{error}</div>}
        <Btn variant="accent" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 6 }} onClick={submit}>
          {hasAdmin ? t.loginButton : t.createAdminAccount}
        </Btn>
      </div>
    </div>
  );
}
