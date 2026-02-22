import { useState, useEffect, useMemo } from "react";
import {
  Package, TrendingUp, TrendingDown, AlertTriangle, Search, Plus, Edit, Trash2,
  Calendar, X, Check, FileText, Users, ArrowUpCircle, ArrowDownCircle, Home,
  Bell, Warehouse, AlertCircle, CheckCircle, Info, RefreshCw, Menu, Download,
  Upload, Settings, Scissors, BarChart3, Database, Cloud, CloudOff, HardDrive
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, Legend, Area, AreaChart, LineChart, Line
} from "recharts";

/* ═══════════════════════════════════════════
   SISTEMA DE BANCO DE DADOS (PERSISTÊNCIA)
   ═══════════════════════════════════════════ */
const DB_KEYS = {
  items: 'italin-house:items',
  employees: 'italin-house:employees',
  movements: 'italin-house:movements',
  portioning: 'italin-house:portioning',
  categories: 'italin-house:categories',
  units: 'italin-house:units'
};

const db = {
  async save(key, data) {
    try {
      const result = await window.storage.set(key, JSON.stringify(data));
      return result;
    } catch (error) {
      console.error(`❌ Erro ao salvar ${key}:`, error);
      return null;
    }
  },
  
  async load(key, defaultValue = null) {
    try {
      const result = await window.storage.get(key);
      if (result && result.value) {
        return JSON.parse(result.value);
      }
      return defaultValue;
    } catch (error) {
      console.error(`❌ Erro ao carregar ${key}:`, error);
      return defaultValue;
    }
  },
  
  async delete(key) {
    try {
      const result = await window.storage.delete(key);
      return result;
    } catch (error) {
      console.error(`❌ Erro ao deletar ${key}:`, error);
      return null;
    }
  },
  
  async clearAll() {
    try {
      await Promise.all(Object.values(DB_KEYS).map(key => window.storage.delete(key)));
      console.log('✓ Todos os dados foram limpos');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar dados:', error);
      return false;
    }
  }
};

/* ═══════════════════════════════════════════
   CONSTANTES & DADOS INICIAIS
   ═══════════════════════════════════════════ */
const initialCategories = ["Perecíveis", "Secos", "Bebidas", "Embalagens", "Limpeza", "Temperos"];
const initialUnits = ["kg", "litro", "unidade", "pacote", "grama", "caixa", "lata", "garrafa"];
const EXIT_REASONS = ["Venda/Produção", "Perda/Desperdício", "Consumo Interno", "Transferência", "Vencido"];
const ROLES = ["Administrador", "Gerente", "Cozinheiro", "Estoquista"];
const WASTE_REASONS = ["Deterioração", "Dano", "Superprodução", "Preparo Incorreto", "Validade Expirada"];

const initialItems = [
  { id: 1, name: "Molho de Tomate Pelado", unit: "kg", category: "Perecíveis", minStock: 10, cost: 12.5, supplier: "Fornecedor Italia", perishable: true, currentStock: 25 },
  { id: 2, name: "Massa Fresca", unit: "kg", category: "Perecíveis", minStock: 8, cost: 18.0, supplier: "Massas Artesanais", perishable: true, currentStock: 5 },
  { id: 3, name: "Queijo Parmesão", unit: "kg", category: "Perecíveis", minStock: 5, cost: 85.0, supplier: "Laticínios Premium", perishable: true, currentStock: 12 },
  { id: 4, name: "Farinha de Trigo 00", unit: "kg", category: "Secos", minStock: 15, cost: 8.5, supplier: "Moinho Central", perishable: false, currentStock: 30 },
  { id: 5, name: "Azeite Extra Virgem", unit: "litro", category: "Temperos", minStock: 5, cost: 42.0, supplier: "Oliveiras do Sul", perishable: false, currentStock: 3 },
  { id: 6, name: "Mussarela de Búfala", unit: "kg", category: "Perecíveis", minStock: 4, cost: 65.0, supplier: "Laticínios Premium", perishable: true, currentStock: 8 },
  { id: 7, name: "Embalagem Pizza Média", unit: "unidade", category: "Embalagens", minStock: 100, cost: 1.2, supplier: "EmbaPack", perishable: false, currentStock: 250 },
  { id: 8, name: "Presunto Parma", unit: "kg", category: "Perecíveis", minStock: 3, cost: 120.0, supplier: "Fornecedor Italia", perishable: true, currentStock: 2 },
  { id: 9, name: "Vinho Tinto Chianti", unit: "garrafa", category: "Bebidas", minStock: 12, cost: 55.0, supplier: "Adega Toscana", perishable: false, currentStock: 18 },
  { id: 10, name: "Manjericão Fresco", unit: "unidade", category: "Perecíveis", minStock: 20, cost: 3.5, supplier: "Horta Orgânica", perishable: true, currentStock: 15 },
];

const initialEmployees = [
  { id: 1, name: "Lucas Santos", role: "Administrador", status: "Ativo", username: "lucas.admin" },
  { id: 2, name: "Maria Oliveira", role: "Gerente", status: "Ativo", username: "maria.ger" },
  { id: 3, name: "Pedro Costa", role: "Cozinheiro", status: "Ativo", username: "pedro.coz" },
  { id: 4, name: "Ana Silva", role: "Estoquista", status: "Ativo", username: "ana.est" },
];

const generateMovements = () => {
  const movements = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    const numIn = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numIn; j++) {
      const item = initialItems[Math.floor(Math.random() * initialItems.length)];
      const emp = initialEmployees[Math.floor(Math.random() * initialEmployees.length)];
      movements.push({
        id: movements.length + 1, type: "in", itemId: item.id, itemName: item.name,
        quantity: Math.floor(Math.random() * 20) + 1, date: ds,
        time: `${String(8 + Math.floor(Math.random() * 10)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        employee: emp.name, supplier: item.supplier,
        price: +(item.cost * (0.9 + Math.random() * 0.2)).toFixed(2),
        batch: `LT${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
        expiry: item.perishable ? new Date(d.getTime() + 7 * 86400000 + Math.random() * 23 * 86400000).toISOString().split("T")[0] : null,
        notes: "", reason: null, wasteReason: null, invoice: null
      });
    }
    const numOut = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numOut; j++) {
      const item = initialItems[Math.floor(Math.random() * initialItems.length)];
      const emp = initialEmployees[Math.floor(Math.random() * initialEmployees.length)];
      const reason = EXIT_REASONS[Math.floor(Math.random() * EXIT_REASONS.length)];
      movements.push({
        id: movements.length + 1, type: "out", itemId: item.id, itemName: item.name,
        quantity: Math.floor(Math.random() * 10) + 1, date: ds,
        time: `${String(10 + Math.floor(Math.random() * 10)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        employee: emp.name, supplier: null, price: null, batch: null, expiry: null, notes: "",
        reason, wasteReason: reason === "Perda/Desperdício" ? WASTE_REASONS[Math.floor(Math.random() * WASTE_REASONS.length)] : null,
        invoice: null
      });
    }
  }
  return movements;
};

const generatePortioning = () => {
  const portioning = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    const num = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < num; j++) {
      const item = initialItems[Math.floor(Math.random() * initialItems.length)];
      const emp = initialEmployees[Math.floor(Math.random() * initialEmployees.length)];
      portioning.push({
        id: portioning.length + 1, itemId: item.id, itemName: item.name,
        quantity: Math.floor(Math.random() * 50) + 10, date: ds,
        time: `${String(9 + Math.floor(Math.random() * 8)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        employee: emp.name
      });
    }
  }
  return portioning;
};

/* ═══════════════════════════════════════════
   PALETA DE CORES
   ═══════════════════════════════════════════ */
const C = {
  bg: "#FAF6F1", card: "#FFFFFF",
  primary: "#C2452D", primaryDark: "#9E3623", primaryLight: "#F4DDD8",
  secondary: "#2D5A27", secondaryLight: "#E4F0E2",
  accent: "#D4A253", accentLight: "#FBF3E4",
  text: "#2C1810", textSec: "#6B5B4F", textMuted: "#9A8A7E",
  border: "#E8DDD4",
  danger: "#C2452D", dangerLight: "#FDE8E5",
  success: "#2D5A27", successLight: "#E4F0E2",
  warning: "#D4A253", warningLight: "#FBF3E4",
  chart: ["#C2452D", "#2D5A27", "#D4A253", "#6B5B4F", "#8B6F47", "#3D7A35", "#E07A5F", "#81B29A"]
};

const font = "'DM Sans', sans-serif";
const fontDisplay = "'Playfair Display', serif";

/* ═══════════════════════════════════════════
   COMPONENTES BASE REUTILIZÁVEIS
   ═══════════════════════════════════════════ */

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const cfg = {
    success: { bg: C.successLight, border: C.success, icon: <CheckCircle size={18} color={C.success} /> },
    error:   { bg: C.dangerLight,  border: C.danger,  icon: <AlertCircle size={18} color={C.danger} /> },
    warning: { bg: C.warningLight, border: C.warning,  icon: <AlertTriangle size={18} color={C.warning} /> },
    info:    { bg: "#EDF2FA",      border: "#3B6CB5",  icon: <Info size={18} color="#3B6CB5" /> }
  }[type] || {};
  return (
    <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, background: cfg.bg, borderLeft: `4px solid ${cfg.border}`, borderRadius: 10, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 300, maxWidth: 440, animation: "slideIn .3s ease" }}>
      {cfg.icon}
      <span style={{ color: C.text, fontSize: 14, fontWeight: 500, flex: 1, fontFamily: font }}>{message}</span>
      <X size={16} style={{ cursor: "pointer", color: C.textMuted, flexShrink: 0 }} onClick={onClose} />
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 560 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(44,24,16,0.5)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, borderRadius: 16, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 64px rgba(44,24,16,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.card, zIndex: 1, borderRadius: "16px 16px 0 0" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, fontFamily: fontDisplay }}>{title}</h3>
          <div onClick={onClose} style={{ cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}>
            <X size={20} color={C.textMuted} />
          </div>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 6, fontFamily: font }}>
          {label}{required && <span style={{ color: C.danger }}> *</span>}
        </label>
      )}
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8,
  fontSize: 14, color: C.text, background: C.bg, outline: "none", fontFamily: font, boxSizing: "border-box", transition: "border-color 0.2s"
};

function Input({ label, required, style: extraStyle, ...props }) {
  return (
    <FormField label={label} required={required}>
      <input
        {...props}
        style={{ ...inputStyle, ...extraStyle }}
        onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primaryLight}`; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
      />
    </FormField>
  );
}

function Select({ label, required, options, noMargin, style: extraStyle, ...props }) {
  const inner = (
    <select {...props} style={{ ...inputStyle, cursor: "pointer", ...extraStyle }}>
      <option value="">Selecione...</option>
      {options.map(o => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        return <option key={val} value={val}>{lbl}</option>;
      })}
    </select>
  );
  if (noMargin) return inner;
  return <FormField label={label} required={required}>{inner}</FormField>;
}

function Btn({ children, variant = "primary", size = "md", icon, style: extraStyle, disabled, ...props }) {
  const v = {
    primary:   { bg: C.primary,     color: "#fff",     hbg: C.primaryDark },
    secondary: { bg: "transparent", color: C.primary,  hbg: C.primaryLight, border: `1.5px solid ${C.primary}` },
    success:   { bg: C.secondary,   color: "#fff",     hbg: "#1E4A1A" },
    danger:    { bg: C.danger,      color: "#fff",     hbg: "#A33722" },
    ghost:     { bg: "transparent", color: C.textSec,  hbg: C.bg },
  }[variant];
  const s = { sm: { px: 12, py: 6, fs: 12 }, md: { px: 18, py: 10, fs: 14 }, lg: { px: 24, py: 12, fs: 15 } }[size];
  const [hov, setHov] = useState(false);
  return (
    <button
      {...props}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: `${s.py}px ${s.px}px`, background: hov && !disabled ? v.hbg : v.bg,
        color: v.color, border: v.border || "none", borderRadius: 8,
        fontSize: s.fs, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontFamily: font,
        transition: "all 0.2s", whiteSpace: "nowrap", 
        opacity: disabled ? 0.6 : 1,
        ...extraStyle
      }}
    >
      {icon}{children}
    </button>
  );
}

function Badge({ children, color = C.primary, bg = C.primaryLight }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: bg, color, letterSpacing: 0.3, fontFamily: font, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(44,24,16,0.04)", ...style }}>
      {children}
    </div>
  );
}

function KPICard({ icon, label, value, sub, bgColor = C.primaryLight }) {
  return (
    <Card style={{ padding: "20px 22px", flex: "1 1 200px", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4, fontFamily: font }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.text, fontFamily: fontDisplay, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, fontFamily: font }}>{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

function DataTable({ columns, data, onEdit, onDelete, actions }) {
  const hasActions = onEdit || onDelete || actions;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `2px solid ${C.border}`, whiteSpace: "nowrap" }}>{c.label}</th>
            ))}
            {hasActions && <th style={{ padding: "12px 14px", textAlign: "right", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `2px solid ${C.border}` }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length + (hasActions ? 1 : 0)} style={{ padding: 48, textAlign: "center", color: C.textMuted, fontSize: 14 }}>Nenhum registro encontrado</td></tr>
          ) : data.map((row, i) => (
            <tr key={row.id ?? i} style={{ borderBottom: `1px solid ${C.border}` }}
              onMouseEnter={e => e.currentTarget.style.background = C.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {columns.map(c => (
                <td key={c.key} style={{ padding: "12px 14px", fontSize: 13.5, color: C.text, whiteSpace: c.nowrap ? "nowrap" : "normal" }}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? "—")}
                </td>
              ))}
              {hasActions && (
                <td style={{ padding: "12px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                    {actions && actions(row)}
                    {onEdit && <Btn variant="ghost" size="sm" onClick={() => onEdit(row)} icon={<Edit size={14} />} />}
                    {onDelete && <Btn variant="ghost" size="sm" onClick={() => onDelete(row)} icon={<Trash2 size={14} color={C.danger} />} />}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: 380, minWidth: 200 }}>
      <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted, pointerEvents: "none" }} />
      <input
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        style={{ width: "100%", padding: "10px 14px 10px 40px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, background: C.card, outline: "none", fontFamily: font, boxSizing: "border-box" }}
        onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primaryLight}`; }}
        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   INDICADOR DE STATUS DO BANCO
   ═══════════════════════════════════════════ */
function DbStatusIndicator({ status, lastSaved }) {
  const config = {
    loading: { icon: <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />, text: "Carregando...", color: C.accent },
    saving: { icon: <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />, text: "Salvando...", color: C.accent },
    saved: { icon: <Cloud size={14} />, text: "Salvo", color: C.success },
    error: { icon: <CloudOff size={14} />, text: "Erro", color: C.danger },
    offline: { icon: <HardDrive size={14} />, text: "Local", color: C.textMuted }
  }[status] || { icon: <Database size={14} />, text: status, color: C.textMuted };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 6, 
      padding: "6px 12px", 
      background: C.bg, 
      borderRadius: 8,
      fontSize: 12,
      color: config.color,
      fontFamily: font,
      fontWeight: 500
    }}>
      {config.icon}
      <span>{config.text}</span>
      {status === 'saved' && lastSaved && (
        <span style={{ color: C.textMuted, fontSize: 11 }}>
          {formatTime(lastSaved)}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
const fmt = n => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const fmtN = n => new Intl.NumberFormat("pt-BR").format(n);
const fmtDate = iso => iso ? iso.split("-").reverse().join("/") : "—";
const todayISO = () => new Date().toISOString().split("T")[0];
const nowTime = () => new Date().toTimeString().slice(0, 5);
const nextId = arr => (arr.length > 0 ? Math.max(...arr.map(x => x.id)) + 1 : 1);

/* ═══════════════════════════════════════════
   APP PRINCIPAL
   ═══════════════════════════════════════════ */
export default function InventoryApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [movements, setMovements] = useState([]);
  const [portioning, setPortioning] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Estados do banco de dados
  const [isInitialized, setIsInitialized] = useState(false);
  const [dbStatus, setDbStatus] = useState('loading');
  const [lastSaved, setLastSaved] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type, key: Date.now() });

  // Carrega dados do banco na inicialização
  useEffect(() => {
    const loadData = async () => {
      console.log('📂 Carregando dados do banco...');
      setDbStatus('loading');
      
      try {
        const [savedItems, savedEmployees, savedMovements, savedPortioning, savedCategories, savedUnits] = await Promise.all([
          db.load(DB_KEYS.items),
          db.load(DB_KEYS.employees),
          db.load(DB_KEYS.movements),
          db.load(DB_KEYS.portioning),
          db.load(DB_KEYS.categories),
          db.load(DB_KEYS.units)
        ]);
        
        // Se não houver dados salvos, usa os dados iniciais
        setItems(savedItems?.length > 0 ? savedItems : initialItems);
        setEmployees(savedEmployees?.length > 0 ? savedEmployees : initialEmployees);
        setMovements(savedMovements?.length > 0 ? savedMovements : generateMovements());
        setPortioning(savedPortioning?.length > 0 ? savedPortioning : generatePortioning());
        setCategories(savedCategories?.length > 0 ? savedCategories : initialCategories);
        setUnits(savedUnits?.length > 0 ? savedUnits : initialUnits);
        
        const hasData = savedItems?.length > 0 || savedMovements?.length > 0;
        console.log(hasData ? '✓ Dados carregados do banco' : '✓ Usando dados iniciais');
        
        setDbStatus('saved');
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        // Em caso de erro, usa dados iniciais
        setItems(initialItems);
        setEmployees(initialEmployees);
        setMovements(generateMovements());
        setPortioning(generatePortioning());
        setCategories(initialCategories);
        setUnits(initialUnits);
        setDbStatus('error');
        setIsInitialized(true);
      }
    };
    
    loadData();
  }, []);

  // Auto-save com debounce quando os dados mudam
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveData = async () => {
      console.log('💾 Salvando dados...');
      setDbStatus('saving');
      
      try {
        await Promise.all([
          db.save(DB_KEYS.items, items),
          db.save(DB_KEYS.employees, employees),
          db.save(DB_KEYS.movements, movements),
          db.save(DB_KEYS.portioning, portioning),
          db.save(DB_KEYS.categories, categories),
          db.save(DB_KEYS.units, units)
        ]);
        
        setDbStatus('saved');
        setLastSaved(new Date().toISOString());
        console.log('✓ Dados salvos com sucesso');
      } catch (error) {
        console.error('❌ Erro ao salvar:', error);
        setDbStatus('error');
      }
    };
    
    // Debounce de 1 segundo
    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [items, employees, movements, portioning, categories, units, isInitialized]);

  // Carrega XLSX
  useEffect(() => {
    if (typeof window.XLSX !== 'undefined') {
      console.log("✓ XLSX já carregado");
      return;
    }
    
    console.log("⏳ Carregando XLSX...");
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = () => {
      console.log("✓ XLSX carregado! Versão:", window.XLSX?.version);
    };
    script.onerror = () => {
      console.error("✗ Erro ao carregar XLSX");
    };
    document.head.appendChild(script);
  }, []);

  // Reset do banco de dados
  const handleResetDb = async () => {
    if (!confirm("⚠️ ATENÇÃO!\n\nIsso irá APAGAR TODOS os dados salvos e restaurar os dados iniciais de demonstração.\n\nEsta ação não pode ser desfeita!\n\nDeseja continuar?")) {
      return;
    }
    
    setDbStatus('saving');
    await db.clearAll();
    
    // Restaura dados iniciais
    setItems(initialItems);
    setEmployees(initialEmployees);
    setMovements(generateMovements());
    setPortioning(generatePortioning());
    setCategories(initialCategories);
    setUnits(initialUnits);
    
    setDbStatus('saved');
    setLastSaved(new Date().toISOString());
    showToast("✓ Banco de dados resetado com sucesso!", "success");
  };

  const criticalItems = useMemo(() => items.filter(i => i.currentStock <= i.minStock), [items]);
  const totalValue = useMemo(() => items.reduce((s, i) => s + i.currentStock * i.cost, 0), [items]);
  const thisMonth = useMemo(() => {
    const n = new Date();
    return movements.filter(m => { const d = new Date(m.date); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); });
  }, [movements]);
  const monthIn = thisMonth.filter(m => m.type === "in").length;
  const monthOut = thisMonth.filter(m => m.type === "out").length;

  const wasteMovements = useMemo(() => movements.filter(m => m.reason === "Perda/Desperdício").sort((a, b) => b.id - a.id), [movements]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "items", label: "Itens de Estoque", icon: <Package size={18} /> },
    { id: "stockin", label: "Entrada", icon: <ArrowUpCircle size={18} /> },
    { id: "stockout", label: "Saída", icon: <ArrowDownCircle size={18} /> },
    { id: "waste", label: "Desperdício", icon: <AlertTriangle size={18} />, badge: wasteMovements.length },
    { id: "portioning", label: "Porcionamento", icon: <Scissors size={18} /> },
    { id: "employees", label: "Funcionários", icon: <Users size={18} /> },
    { id: "reports", label: "Relatórios", icon: <FileText size={18} /> },
    { id: "settings", label: "Configurações", icon: <Settings size={18} /> },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab items={items} movements={movements} criticalItems={criticalItems} totalValue={totalValue} monthIn={monthIn} monthOut={monthOut} portioning={portioning} />;
      case "items":     return <ItemsTab items={items} setItems={setItems} categories={categories} units={units} showToast={showToast} />;
      case "stockin":   return <StockInTab items={items} setItems={setItems} employees={employees} movements={movements} setMovements={setMovements} showToast={showToast} categories={categories} units={units} />;
      case "stockout":  return <StockOutTab items={items} setItems={setItems} employees={employees} movements={movements} setMovements={setMovements} showToast={showToast} />;
      case "waste":     return <WasteTab wasteMovements={wasteMovements} items={items} />;
      case "portioning": return <PortioningTab items={items} setItems={setItems} employees={employees} portioning={portioning} setPortioning={setPortioning} showToast={showToast} />;
      case "employees": return <EmployeesTab employees={employees} setEmployees={setEmployees} showToast={showToast} />;
      case "reports":   return <ReportsTab items={items} movements={movements} portioning={portioning} />;
      case "settings":  return <SettingsTab categories={categories} setCategories={setCategories} units={units} setUnits={setUnits} showToast={showToast} onResetDb={handleResetDb} />;
      default: return null;
    }
  };

  // Tela de carregamento
  if (!isInitialized) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        height: "100vh", 
        fontFamily: font, 
        background: C.bg,
        gap: 16
      }}>
        <div style={{ 
          width: 64, 
          height: 64, 
          borderRadius: 16, 
          background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 800,
          fontFamily: fontDisplay,
          color: "#fff"
        }}>
          IH
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.textSec }}>
          <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: 16, fontWeight: 500 }}>Carregando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: font, background: C.bg, color: C.text, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <aside style={{ width: sidebarOpen ? 256 : 72, background: C.text, color: "#fff", display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ padding: sidebarOpen ? "24px 20px 18px" : "24px 15px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, minHeight: 80 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, fontWeight: 800, fontFamily: fontDisplay, color: "#fff" }}>IH</div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, lineHeight: 1.2, whiteSpace: "nowrap" }}>Italin House</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Gestão de Estoque</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: "14px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: sidebarOpen ? "11px 14px" : "11px 0",
                borderRadius: 10, border: "none", cursor: "pointer", fontFamily: font,
                fontSize: 13.5, fontWeight: active ? 700 : 500, transition: "all 0.2s",
                background: active ? "rgba(194,69,45,0.2)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                width: "100%", minHeight: 42, position: "relative"
              }}>
                <span style={{ flexShrink: 0, display: "flex" }}>{t.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}</span>}
                {t.badge > 0 && sidebarOpen && (
                  <span style={{ marginLeft: "auto", background: C.danger, color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {t.badge}
                  </span>
                )}
                {t.id === "items" && criticalItems.length > 0 && sidebarOpen && (
                  <span style={{ marginLeft: "auto", background: C.danger, color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {criticalItems.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", width: "100%",
            border: "none", borderRadius: 8, background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontFamily: font,
            justifyContent: sidebarOpen ? "flex-start" : "center"
          }}>
            <Menu size={16} />{sidebarOpen && "Recolher menu"}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{
          padding: "16px 28px", background: C.card, borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 50
        }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 700, fontFamily: fontDisplay, color: C.text }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 2, fontFamily: font }}>
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <DbStatusIndicator status={dbStatus} lastSaved={lastSaved} />
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={C.textSec} />
              {criticalItems.length > 0 && (
                <span style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderRadius: 9, background: C.danger, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.card}` }}>
                  {criticalItems.length}
                </span>
              )}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, fontFamily: font }}>LS</div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }} key={activeTab}>
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {renderTab()}
          </div>
        </div>
      </main>
    </div>
  );
}

/* DASHBOARD */
function DashboardTab({ items, movements, criticalItems, totalValue, monthIn, monthOut, portioning }) {
  const movementByDay = useMemo(() => {
    const map = {};
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      map[key] = { date: `${d.getDate()}/${d.getMonth() + 1}`, entradas: 0, saidas: 0 };
    }
    movements.forEach(m => {
      if (map[m.date]) {
        if (m.type === "in") map[m.date].entradas += m.quantity;
        else map[m.date].saidas += m.quantity;
      }
    });
    return Object.values(map);
  }, [movements]);

  const portioningThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return portioning.filter(p => new Date(p.date) >= weekAgo).reduce((s, p) => s + p.quantity, 0);
  }, [portioning]);

  const ttStyle = { borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: font, fontSize: 12 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {criticalItems.length > 0 && (
        <div style={{ background: `linear-gradient(135deg, ${C.dangerLight}, ${C.warningLight})`, borderRadius: 14, padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${C.border}` }}>
          <AlertTriangle size={22} color={C.danger} />
          <div><div style={{ fontSize: 14, fontWeight: 700, color: C.danger }}>{criticalItems.length} item(ns) crítico(s)!</div></div>
        </div>
      )}

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <KPICard icon={<Package size={20} color={C.primary} />} label="Total de Itens" value={fmtN(items.length)} sub={`${fmtN(items.reduce((s, i) => s + i.currentStock, 0))} unidades`} bgColor={C.primaryLight} />
        <KPICard icon={<AlertTriangle size={20} color={C.warning} />} label="Itens Críticos" value={criticalItems.length} bgColor={C.warningLight} />
        <KPICard icon={<Warehouse size={20} color={C.secondary} />} label="Valor Total" value={fmt(totalValue)} bgColor={C.secondaryLight} />
        <KPICard icon={<Scissors size={20} color={C.accent} />} label="Porcionamento" value={fmtN(portioningThisWeek)} sub="Últimos 7 dias" bgColor={C.accentLight} />
      </div>

      <Card style={{ padding: 22 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 18 }}>Movimentação (14 dias)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={movementByDay}>
            <defs>
              <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.secondary} stopOpacity={0.2} /><stop offset="95%" stopColor={C.secondary} stopOpacity={0} /></linearGradient>
              <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.primary} stopOpacity={0.2} /><stop offset="95%" stopColor={C.primary} stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="date" fontSize={11} stroke={C.textMuted} />
            <YAxis fontSize={11} stroke={C.textMuted} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="entradas" stroke={C.secondary} fill="url(#gIn)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="saidas" stroke={C.primary} fill="url(#gOut)" strokeWidth={2.5} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ITENS */
function ItemsTab({ items, setItems, categories, units, showToast }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", unit: "", category: "", minStock: "", cost: "", supplier: "", perishable: false });

  const filtered = useMemo(() => items.filter(i =>
    (i.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCat || i.category === filterCat)
  ), [items, search, filterCat]);

  const openAdd = () => { setEditing(null); setForm({ name: "", unit: "", category: "", minStock: "", cost: "", supplier: "", perishable: false }); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, unit: item.unit, category: item.category, minStock: String(item.minStock), cost: String(item.cost), supplier: item.supplier || "", perishable: item.perishable }); setModalOpen(true); };
  
  const openDelete = (item) => {
    setItemToDelete(item);
    setDeleteModal(true);
  };
  
  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      showToast(`Item "${itemToDelete.name}" excluído com sucesso!`, "warning");
      setDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleSave = () => {
    if (!form.name || !form.unit || !form.category || !form.minStock || !form.cost) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const minStock = Number(form.minStock);
    const cost = Number(form.cost);
    
    if (isNaN(minStock) || minStock < 0) {
      showToast("Estoque mínimo deve ser um número válido", "error");
      return;
    }
    
    if (isNaN(cost) || cost < 0) {
      showToast("Custo deve ser um número válido", "error");
      return;
    }
    
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, minStock, cost } : i));
      showToast("✓ Item atualizado com sucesso!");
    } else {
      const newItem = { id: nextId(items), ...form, minStock, cost, currentStock: 0 };
      setItems(prev => [...prev, newItem]);
      showToast("✓ Item cadastrado com sucesso!");
    }
    setModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} />
        <Select noMargin options={categories} value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ width: 180, padding: "10px 14px" }} />
        <Btn onClick={openAdd} icon={<Plus size={16} />}>Novo Item</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "category", label: "Categoria" },
          { key: "unit", label: "Unidade" },
          { key: "currentStock", label: "Estoque", render: (v, r) => <span style={{ fontWeight: 700, color: v <= r.minStock ? C.danger : C.success }}>{v}</span> },
          { key: "minStock", label: "Mínimo" },
          { key: "cost", label: "Custo", render: v => fmt(v) },
        ]} data={filtered} onEdit={openEdit} onDelete={openDelete} />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Item" : "Novo Item"}>
        <Input label="Nome" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Select label="Unidade" required options={units} value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
        <Select label="Categoria" required options={categories} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <Input label="Estoque Mínimo" required type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} />
        <Input label="Custo (R$)" required type="number" step="0.01" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
        <Input label="Fornecedor" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
          <Btn onClick={handleSave} icon={<Check size={16} />}>Salvar</Btn>
        </div>
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Confirmar Exclusão" width={440}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: C.textSec, marginBottom: 12 }}>
            Tem certeza que deseja excluir o item abaixo?
          </p>
          {itemToDelete && (
            <div style={{ background: C.dangerLight, padding: 14, borderRadius: 8, border: `1px solid ${C.danger}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{itemToDelete.name}</div>
              <div style={{ fontSize: 12, color: C.textSec }}>
                Categoria: {itemToDelete.category} · Estoque atual: {itemToDelete.currentStock} {itemToDelete.unit}
              </div>
            </div>
          )}
          <div style={{ background: C.warningLight, padding: 12, borderRadius: 8, marginTop: 12, fontSize: 12, color: C.textSec, border: `1px solid ${C.warning}` }}>
            ⚠️ <strong>Atenção:</strong> Esta ação não pode ser desfeita. O histórico de movimentações deste item será mantido.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setDeleteModal(false)}>Cancelar</Btn>
          <Btn variant="danger" onClick={confirmDelete} icon={<Trash2 size={16} />}>Confirmar Exclusão</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ENTRADA */
function StockInTab({ items, setItems, employees, movements, setMovements, showToast, categories, units }) {
  const [search, setSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [nfReviewModal, setNfReviewModal] = useState(false);
  const [extractedItems, setExtractedItems] = useState([]);
  const [nfData, setNfData] = useState({ supplier: "", date: "", invoice: "" });
  const [creatingItem, setCreatingItem] = useState(null);
  const emptyForm = { itemId: "", quantity: "", batch: "", expiry: "", employee: "", date: todayISO(), time: nowTime(), supplier: "", price: "", notes: "", invoice: null };
  const [form, setForm] = useState(emptyForm);
  const [isReadingNF, setIsReadingNF] = useState(false);

  const filtered = useMemo(() =>
    movements.filter(m => m.type === "in").sort((a, b) => b.id - a.id).slice(0, 50)
      .filter(m => m.itemName.toLowerCase().includes(search.toLowerCase()))
  , [movements, search]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));
  const filteredItems = useMemo(() => items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())), [items, itemSearch]);

  const readNFData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      showToast("Arquivo muito grande! Máximo 5MB", "error");
      return;
    }

    setIsReadingNF(true);
    showToast("Analisando nota fiscal...", "info");
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const xmlText = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
          throw new Error("Erro ao interpretar XML da nota fiscal");
        }
        
        const supplierNode = xmlDoc.querySelector("emit xNome") || xmlDoc.querySelector("emit xFant");
        const supplier = supplierNode ? supplierNode.textContent.trim() : "Fornecedor não identificado";
        
        const dateNode = xmlDoc.querySelector("ide dhEmi") || xmlDoc.querySelector("ide dEmi");
        let nfDate = todayISO();
        if (dateNode) {
          const dateText = dateNode.textContent.trim();
          nfDate = dateText.substring(0, 10);
        }
        
        const chaveNode = xmlDoc.querySelector("infNFe");
        const chave = chaveNode ? chaveNode.getAttribute("Id") : null;
        const batch = chave ? `LT${chave.substring(chave.length - 4)}` : `LT${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
        
        const detNodes = xmlDoc.querySelectorAll("det");
        
        if (detNodes.length === 0) {
          showToast("Nenhum produto encontrado na nota fiscal", "error");
          setIsReadingNF(false);
          return;
        }
        
        const extractedProducts = [];
        
        detNodes.forEach((det, index) => {
          const prodNode = det.querySelector("prod");
          if (!prodNode) return;
          
          const name = prodNode.querySelector("xProd")?.textContent.trim() || `Produto ${index + 1}`;
          const unit = prodNode.querySelector("uCom")?.textContent.trim().toLowerCase() || "unidade";
          const quantity = parseFloat(prodNode.querySelector("qCom")?.textContent.trim() || "0");
          const unitPrice = parseFloat(prodNode.querySelector("vUnCom")?.textContent.trim() || "0");
          
          if (quantity > 0 && unitPrice > 0) {
            extractedProducts.push({
              extractedName: name,
              quantity: quantity,
              price: unitPrice,
              unit: normalizeUnit(unit)
            });
          }
        });
        
        if (extractedProducts.length === 0) {
          showToast("Não foi possível extrair produtos válidos da nota", "error");
          setIsReadingNF(false);
          return;
        }
        
        const processedItems = extractedProducts.map((extracted, index) => {
          const keywords = extracted.extractedName.toLowerCase().split(' ').filter(w => w.length > 3);
          const match = items.find(item => {
            const itemWords = item.name.toLowerCase().split(' ');
            const unitMatch = item.unit.toLowerCase() === extracted.unit.toLowerCase();
            const nameMatch = keywords.some(keyword => 
              itemWords.some(word => word.includes(keyword) || keyword.includes(word))
            );
            return unitMatch && nameMatch;
          });
          
          return {
            id: `nf-item-${Date.now()}-${index}`,
            extractedName: extracted.extractedName,
            quantity: extracted.quantity,
            price: extracted.price,
            unit: extracted.unit,
            matched: match ? true : false,
            matchedItem: match || null,
            itemId: match ? match.id : null,
            selected: true,
            needsCreation: !match
          };
        });
        
        setExtractedItems(processedItems);
        setNfData({ supplier, date: nfDate, invoice: file.name, batch });
        setIsReadingNF(false);
        setNfReviewModal(true);
        
        const matchedCount = processedItems.filter(i => i.matched).length;
        const totalCount = processedItems.length;
        showToast(`✓ NF lida! ${matchedCount}/${totalCount} itens encontrados no cadastro`, "success");
        
      } catch (error) {
        console.error("Erro ao processar XML:", error);
        showToast(`Erro ao processar nota fiscal: ${error.message}`, "error");
        setIsReadingNF(false);
      }
    };
    
    reader.onerror = () => {
      showToast("Erro ao ler arquivo da nota fiscal", "error");
      setIsReadingNF(false);
    };
    
    reader.readAsText(file, "UTF-8");
  };
  
  const normalizeUnit = (unit) => {
    const unitMap = {
      'un': 'unidade', 'und': 'unidade', 'unid': 'unidade', 'pc': 'unidade', 'pç': 'unidade',
      'kg': 'kg', 'kilo': 'kg', 'quilograma': 'kg',
      'l': 'litro', 'lt': 'litro', 'ltr': 'litro',
      'g': 'grama', 'gr': 'grama',
      'cx': 'caixa', 'cxa': 'caixa',
      'pct': 'pacote',
      'gf': 'garrafa', 'grf': 'garrafa'
    };
    const normalized = unit.toLowerCase().trim();
    return unitMap[normalized] || normalized;
  };

  const handleCreateNewItem = (extractedItem) => {
    setCreatingItem({
      ...extractedItem,
      name: extractedItem.extractedName,
      category: "",
      minStock: "",
      supplier: nfData.supplier,
      perishable: false
    });
  };

  const confirmCreateItem = () => {
    if (!creatingItem.name || !creatingItem.unit || !creatingItem.category || !creatingItem.minStock) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const minStock = Number(creatingItem.minStock);
    if (isNaN(minStock) || minStock < 0) {
      showToast("Estoque mínimo inválido", "error");
      return;
    }
    
    const newItem = {
      id: nextId(items),
      name: creatingItem.name,
      unit: creatingItem.unit,
      category: creatingItem.category,
      minStock: minStock,
      cost: Number(creatingItem.price) || 0,
      supplier: creatingItem.supplier || "",
      perishable: creatingItem.perishable || false,
      currentStock: 0
    };
    
    setItems(prev => [...prev, newItem]);
    
    setExtractedItems(prev => prev.map(item => 
      item.id === creatingItem.id 
        ? { ...item, matched: true, matchedItem: newItem, itemId: newItem.id, needsCreation: false }
        : item
    ));
    
    showToast(`✓ Item "${newItem.name}" criado com sucesso!`);
    setCreatingItem(null);
  };

  const handleImportItems = () => {
    const selectedItems = extractedItems.filter(item => item.selected && item.matched);
    
    if (selectedItems.length === 0) {
      showToast("Selecione pelo menos um item para importar", "error");
      return;
    }
    
    const hasUnmatched = extractedItems.some(item => item.selected && !item.matched);
    if (hasUnmatched) {
      showToast("Crie os itens faltantes antes de importar", "warning");
      return;
    }
    
    let nextMovementId = nextId(movements);
    const newMovements = [];
    const stockUpdates = {};
    
    selectedItems.forEach((extracted, idx) => {
      const newMov = {
        id: nextMovementId++,
        type: "in",
        itemId: extracted.itemId,
        itemName: extracted.matchedItem.name,
        quantity: Number(extracted.quantity) || 0,
        date: nfData.date,
        time: nowTime(),
        employee: employees.find(e => e.status === "Ativo")?.name || "Sistema",
        supplier: nfData.supplier,
        price: Number(extracted.price) || 0,
        batch: nfData.batch,
        expiry: null,
        notes: `Importado da NF: ${nfData.invoice}`,
        invoice: nfData.invoice,
        reason: null,
        wasteReason: null
      };
      
      newMovements.push(newMov);
      
      if (!stockUpdates[extracted.itemId]) {
        stockUpdates[extracted.itemId] = 0;
      }
      stockUpdates[extracted.itemId] += Number(extracted.quantity) || 0;
    });
    
    setMovements(prev => [...prev, ...newMovements]);
    
    setItems(prev => prev.map(item => {
      if (stockUpdates[item.id]) {
        return { ...item, currentStock: item.currentStock + stockUpdates[item.id] };
      }
      return item;
    }));
    
    showToast(`✓ ${selectedItems.length} item(ns) importado(s) com sucesso!`, "success");
    
    setNfReviewModal(false);
    setExtractedItems([]);
    setNfData({ supplier: "", date: "", invoice: "", batch: "" });
  };

  const handleSave = () => {
    if (!form.itemId || !form.quantity || !form.employee || !form.price) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const qty = Number(form.quantity);
    const price = Number(form.price);
    
    if (isNaN(qty) || qty <= 0) {
      showToast("Quantidade deve ser maior que zero", "error");
      return;
    }
    
    if (isNaN(price) || price < 0) {
      showToast("Preço deve ser um valor válido", "error");
      return;
    }
    
    if (!selectedItem) {
      showToast("Selecione um item válido", "error");
      return;
    }
    
    const newMov = { 
      id: nextId(movements), 
      type: "in", 
      itemId: Number(form.itemId), 
      itemName: selectedItem.name, 
      quantity: qty, 
      date: form.date, 
      time: form.time, 
      employee: form.employee, 
      supplier: form.supplier || selectedItem.supplier, 
      price: price, 
      batch: form.batch, 
      expiry: form.expiry || null, 
      notes: form.notes,
      invoice: form.invoice,
      reason: null,
      wasteReason: null
    };
    
    setMovements(prev => [...prev, newMov]);
    setItems(prev => prev.map(i => i.id === Number(form.itemId) ? { ...i, currentStock: i.currentStock + qty } : i));
    
    showToast(`✓ Entrada de ${qty} ${selectedItem.unit} registrada com sucesso!`);
    setModalOpen(false);
    setItemSearch("");
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setItemSearch(""); setModalOpen(true); }} variant="success" icon={<ArrowUpCircle size={16} />}>Nova Entrada</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}` },
          { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "quantity", label: "Qtd", render: v => <Badge color={C.success} bg={C.successLight}>+{v}</Badge> },
          { key: "batch", label: "Lote", render: v => v || "—" },
          { key: "supplier", label: "Fornecedor", render: v => v || "—" },
          { key: "price", label: "Preço", render: v => v ? `R$ ${Number(v).toFixed(2)}` : "—" },
          { key: "invoice", label: "NF", render: v => v ? <Badge color={C.secondary} bg={C.secondaryLight}>Anexada</Badge> : "—" },
        ]} data={filtered} />
      </Card>

      {/* Modal de Entrada Manual */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Entrada de Estoque" width={640}>
        <div style={{ background: C.accentLight, borderRadius: 10, padding: 16, marginBottom: 20, border: `1px solid ${C.accent}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <FileText size={20} color={C.accent} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: font }}>Leitura Automática de Nota Fiscal</div>
              <div style={{ fontSize: 12, color: C.textSec, fontFamily: font }}>Anexe a NF para extrair TODOS os itens automaticamente</div>
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", border: `2px dashed ${C.accent}`, borderRadius: 8, cursor: "pointer", background: C.card, fontSize: 14, fontFamily: font, transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.accentLight}
            onMouseLeave={e => e.currentTarget.style.background = C.card}>
            <Upload size={18} color={C.accent} />
            <span style={{ color: C.text, fontWeight: 600 }}>
              {isReadingNF ? "Lendo nota fiscal..." : "Clique aqui para importar NF completa"}
            </span>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.xml" onChange={readNFData} style={{ display: "none" }} disabled={isReadingNF} />
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <FormField label="Item" required>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted }} />
                <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Buscar item..." style={{ ...inputStyle, paddingLeft: 40 }} />
              </div>
              {itemSearch && filteredItems.length > 0 && (
                <div style={{ maxHeight: 200, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 8, background: C.card }}>
                  {filteredItems.map(item => (
                    <div key={item.id} onClick={() => { setForm({ ...form, itemId: String(item.id), supplier: form.supplier || item.supplier || "", price: form.price || String(item.cost) }); setItemSearch(""); }} style={{ padding: "10px 14px", cursor: "pointer", fontSize: 14, borderBottom: `1px solid ${C.border}` }} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = C.card}>
                      <strong>{item.name}</strong> ({item.unit})
                    </div>
                  ))}
                </div>
              )}
              <Select noMargin options={items.map(i => ({ value: String(i.id), label: `${i.name} (${i.unit})` }))} value={form.itemId} onChange={e => { const it = items.find(i => i.id === Number(e.target.value)); setForm({ ...form, itemId: e.target.value, supplier: form.supplier || it?.supplier || "", price: form.price || (it ? String(it.cost) : "") }); }} />
            </FormField>
          </div>
          <Input label="Quantidade" required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder={selectedItem ? `Em ${selectedItem.unit}` : ""} />
          <Input label="Preço Unitário (R$)" required type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <Input label="Nº do Lote" value={form.batch} onChange={e => setForm({ ...form, batch: e.target.value })} placeholder="Ex: LT0042" />
          <Input label="Data de Validade" type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
          <Input label="Data da Entrada" required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <Input label="Hora" required type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
          <Select label="Responsável" required options={employees.filter(e => e.status === "Ativo").map(e => ({ value: e.name, label: `${e.name} (${e.role})` }))} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
          <Input label="Fornecedor" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
          <div style={{ gridColumn: "1 / -1" }}>
            <Input label="Observações" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Detalhes da entrega, condições..." />
          </div>
        </div>
        {selectedItem && (
          <div style={{ background: selectedItem.currentStock <= selectedItem.minStock ? C.warningLight : C.bg, borderRadius: 10, padding: 14, marginTop: 16, fontSize: 13, color: C.textSec, fontFamily: font, display: "flex", alignItems: "center", gap: 8 }}>
            <Info size={16} color={C.textMuted} style={{ flexShrink: 0 }} />
            <span>Estoque atual: <strong style={{ color: selectedItem.currentStock <= selectedItem.minStock ? C.danger : C.success }}>{selectedItem.currentStock} {selectedItem.unit}</strong> (mínimo: {selectedItem.minStock})</span>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
          <Btn variant="success" onClick={handleSave} icon={<Check size={16} />}>Confirmar Entrada</Btn>
        </div>
      </Modal>

      {/* Modal de Revisão da NF */}
      <Modal open={nfReviewModal} onClose={() => setNfReviewModal(false)} title="Revisão da Nota Fiscal" width={900}>
        <div style={{ background: C.successLight, borderRadius: 10, padding: 16, marginBottom: 20, border: `1px solid ${C.success}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <CheckCircle size={20} color={C.success} />
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: font }}>Nota Fiscal Lida com Sucesso!</div>
          </div>
          <div style={{ fontSize: 13, color: C.textSec, fontFamily: font }}>
            <strong>Fornecedor:</strong> {nfData.supplier} · <strong>Data:</strong> {fmtDate(nfData.date)} · <strong>Lote:</strong> {nfData.batch} · <strong>NF:</strong> {nfData.invoice}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: C.text, fontFamily: font }}>
            Itens Extraídos da Nota Fiscal ({extractedItems.length})
          </h4>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.textSec, fontFamily: font, marginBottom: 12, padding: "10px 14px", background: C.bg, borderRadius: 8 }}>
            <div><strong>{extractedItems.filter(i => i.matched).length}</strong> já cadastrados (prontos para importar)</div>
            <div><strong>{extractedItems.filter(i => !i.matched).length}</strong> não cadastrados (precisam ser criados)</div>
            <div><strong>{extractedItems.filter(i => i.selected).length}</strong> selecionados</div>
          </div>
        </div>

        <div style={{ maxHeight: 400, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: font }}>
            <thead style={{ position: "sticky", top: 0, background: C.bg, zIndex: 1 }}>
              <tr>
                <th style={{ padding: "10px", textAlign: "left", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>
                  <input type="checkbox" checked={extractedItems.every(i => i.selected)} onChange={e => setExtractedItems(prev => prev.map(i => ({ ...i, selected: e.target.checked })))} style={{ accentColor: C.primary }} />
                </th>
                <th style={{ padding: "10px", textAlign: "left", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Item Extraído da NF</th>
                <th style={{ padding: "10px", textAlign: "center", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Qtd</th>
                <th style={{ padding: "10px", textAlign: "center", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Unidade</th>
                <th style={{ padding: "10px", textAlign: "center", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Preço</th>
                <th style={{ padding: "10px", textAlign: "center", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "10px", textAlign: "center", borderBottom: `2px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {extractedItems.map(item => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${C.border}`, background: item.selected ? (item.matched ? C.successLight : C.warningLight) : "transparent" }}>
                  <td style={{ padding: "10px" }}>
                    <input type="checkbox" checked={item.selected} onChange={e => setExtractedItems(prev => prev.map(i => i.id === item.id ? { ...i, selected: e.target.checked } : i))} style={{ accentColor: C.primary }} />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ fontWeight: 600, color: C.text }}>{item.extractedName}</div>
                    {item.matched && (
                      <div style={{ fontSize: 11, color: C.success, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                        <CheckCircle size={12} /> Vinculado a: {item.matchedItem.name}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={e => setExtractedItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Number(e.target.value) } : i))}
                      style={{ width: 70, padding: "4px 8px", border: `1px solid ${C.border}`, borderRadius: 6, textAlign: "center", fontSize: 13, fontWeight: 700 }}
                    />
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <select
                      value={item.unit}
                      onChange={e => setExtractedItems(prev => prev.map(i => i.id === item.id ? { ...i, unit: e.target.value } : i))}
                      style={{ padding: "4px 8px", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12, fontFamily: font, background: C.card }}
                    >
                      {units.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <input 
                      type="number" 
                      step="0.01"
                      value={item.price} 
                      onChange={e => setExtractedItems(prev => prev.map(i => i.id === item.id ? { ...i, price: Number(e.target.value) } : i))}
                      style={{ width: 80, padding: "4px 8px", border: `1px solid ${C.border}`, borderRadius: 6, textAlign: "right", fontSize: 13, fontWeight: 600 }}
                    />
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {item.matched ? (
                      <Badge color={C.success} bg={C.successLight}>✓ Cadastrado</Badge>
                    ) : (
                      <Badge color={C.danger} bg={C.dangerLight}>✕ Não Cadastrado</Badge>
                    )}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {!item.matched && (
                      <Btn variant="secondary" size="sm" onClick={() => handleCreateNewItem(item)} icon={<Plus size={14} />}>Criar</Btn>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 20, padding: "16px 0" }}>
          <div style={{ fontSize: 13, color: C.textSec, fontFamily: font }}>
            <strong style={{ color: C.text }}>{extractedItems.filter(i => i.selected && i.matched).length}</strong> de <strong style={{ color: C.text }}>{extractedItems.filter(i => i.selected).length}</strong> itens prontos para importar
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn variant="ghost" onClick={() => { setNfReviewModal(false); setExtractedItems([]); }}>Cancelar</Btn>
            <Btn onClick={handleImportItems} icon={<Check size={16} />} disabled={extractedItems.filter(i => i.selected && i.matched).length === 0}>
              Importar e Atualizar Estoque
            </Btn>
          </div>
        </div>
      </Modal>

      {/* Modal de Criação de Item */}
      <Modal open={!!creatingItem} onClose={() => setCreatingItem(null)} title="Criar Novo Item" width={600}>
        {creatingItem && (
          <>
            <div style={{ background: C.bg, padding: 14, borderRadius: 8, marginBottom: 16, fontSize: 13, color: C.textSec, fontFamily: font }}>
              <strong>Item da NF:</strong> {creatingItem.extractedName} · <strong>Qtd:</strong> {creatingItem.quantity} {creatingItem.unit} · <strong>Preço:</strong> R$ {creatingItem.price.toFixed(2)}
            </div>
            <Input label="Nome do Item" required value={creatingItem.name} onChange={e => setCreatingItem({ ...creatingItem, name: e.target.value })} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Select label="Unidade" required options={units} value={creatingItem.unit} onChange={e => setCreatingItem({ ...creatingItem, unit: e.target.value })} />
              <Select label="Categoria" required options={categories} value={creatingItem.category} onChange={e => setCreatingItem({ ...creatingItem, category: e.target.value })} />
              <Input label="Estoque Mínimo" required type="number" min="0" value={creatingItem.minStock} onChange={e => setCreatingItem({ ...creatingItem, minStock: e.target.value })} />
              <Input label="Custo Unitário (R$)" required type="number" min="0" step="0.01" value={creatingItem.price} onChange={e => setCreatingItem({ ...creatingItem, price: e.target.value })} />
            </div>
            <Input label="Fornecedor" value={creatingItem.supplier} onChange={e => setCreatingItem({ ...creatingItem, supplier: e.target.value })} />
            <div style={{ marginTop: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: C.text, fontFamily: font }}>
                <input type="checkbox" checked={creatingItem.perishable} onChange={e => setCreatingItem({ ...creatingItem, perishable: e.target.checked })} style={{ width: 18, height: 18, accentColor: C.primary }} />
                Item perecível (requer controle de validade)
              </label>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
              <Btn variant="ghost" onClick={() => setCreatingItem(null)}>Cancelar</Btn>
              <Btn onClick={confirmCreateItem} icon={<Check size={16} />}>Criar e Continuar</Btn>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

/* SAÍDA */
function StockOutTab({ items, setItems, employees, movements, setMovements, showToast }) {
  const [search, setSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const emptyForm = { itemId: "", quantity: "", employee: "", date: todayISO(), time: nowTime(), reason: "", wasteReason: "", notes: "" };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() =>
    movements.filter(m => m.type === "out").sort((a, b) => b.id - a.id).slice(0, 50)
      .filter(m => m.itemName.toLowerCase().includes(search.toLowerCase()))
  , [movements, search]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));
  const filteredItems = useMemo(() => items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())), [items, itemSearch]);

  const handleSave = () => {
    if (!form.itemId || !form.quantity || !form.employee || !form.reason) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    if (form.reason === "Perda/Desperdício" && !form.wasteReason) {
      showToast("Selecione a causa da perda", "error");
      return;
    }
    
    const qty = Number(form.quantity);
    
    if (isNaN(qty) || qty <= 0) {
      showToast("Quantidade deve ser maior que zero", "error");
      return;
    }
    
    if (!selectedItem) {
      showToast("Selecione um item válido", "error");
      return;
    }
    
    if (qty > selectedItem.currentStock) {
      showToast(`Quantidade indisponível! Estoque atual: ${selectedItem.currentStock} ${selectedItem.unit}`, "error");
      return;
    }
    
    const newMov = { 
      id: nextId(movements), 
      type: "out", 
      itemId: Number(form.itemId), 
      itemName: selectedItem.name, 
      quantity: qty, 
      date: form.date, 
      time: form.time, 
      employee: form.employee, 
      reason: form.reason, 
      wasteReason: form.wasteReason || null, 
      notes: form.notes,
      supplier: null,
      price: null,
      batch: null,
      expiry: null,
      invoice: null
    };
    
    setMovements(prev => [...prev, newMov]);
    setItems(prev => prev.map(i => i.id === Number(form.itemId) ? { ...i, currentStock: i.currentStock - qty } : i));
    
    showToast(`✓ Saída de ${qty} ${selectedItem.unit} registrada!`);
    setModalOpen(false);
    setItemSearch("");
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setItemSearch(""); setModalOpen(true); }} variant="danger" icon={<ArrowDownCircle size={16} />}>Nova Saída</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}` },
          { key: "itemName", label: "Item" },
          { key: "quantity", label: "Qtd", render: v => <Badge color={C.danger} bg={C.dangerLight}>-{v}</Badge> },
          { key: "reason", label: "Motivo" },
        ]} data={filtered} />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Saída" width={600}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <FormField label="Item" required>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted }} />
                <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Buscar item..." style={{ ...inputStyle, paddingLeft: 40 }} />
              </div>
              {itemSearch && filteredItems.length > 0 && (
                <div style={{ maxHeight: 200, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 8 }}>
                  {filteredItems.map(item => (
                    <div key={item.id} onClick={() => { setForm({ ...form, itemId: String(item.id) }); setItemSearch(""); }} style={{ padding: "10px 14px", cursor: "pointer", fontSize: 14 }} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = "white"}>
                      <strong>{item.name}</strong> (estoque: {item.currentStock})
                    </div>
                  ))}
                </div>
              )}
              <Select noMargin options={items.map(i => ({ value: String(i.id), label: `${i.name} (${i.currentStock})` }))} value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })} />
            </FormField>
          </div>
          <Input label="Quantidade" required type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          <Select label="Motivo" required options={EXIT_REASONS} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value, wasteReason: "" })} />
          {form.reason === "Perda/Desperdício" && (
            <Select label="Causa da Perda" required options={WASTE_REASONS} value={form.wasteReason} onChange={e => setForm({ ...form, wasteReason: e.target.value })} />
          )}
          <Select label="Responsável" required options={employees.map(e => e.name)} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
          <Btn variant="danger" onClick={handleSave}>Confirmar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* DESPERDÍCIO */
function WasteTab({ wasteMovements, items }) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [dateTo, setDateTo] = useState(todayISO);

  const filtered = useMemo(() => 
    wasteMovements.filter(m => 
      m.date >= dateFrom && m.date <= dateTo &&
      (m.itemName.toLowerCase().includes(search.toLowerCase()) || m.employee.toLowerCase().includes(search.toLowerCase()))
    )
  , [wasteMovements, search, dateFrom, dateTo]);

  const handleDownload = () => {
    if (filtered.length === 0) return;
    const data = filtered.map(m => {
      const item = items.find(i => i.id === m.itemId);
      return {
        Data: fmtDate(m.date),
        Hora: m.time,
        Item: m.itemName,
        Quantidade: m.quantity,
        Motivo: m.wasteReason || "—",
        "Valor Perdido": item ? `R$ ${(m.quantity * item.cost).toFixed(2)}` : "—",
        Responsável: m.employee,
        Observações: m.notes || "—"
      };
    });
    
    try {
      const ws = window.XLSX.utils.json_to_sheet(data);
      const wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, ws, "Desperdício");
      window.XLSX.writeFile(wb, `desperdicio_${dateFrom}_${dateTo}.xlsx`);
    } catch (error) {
      alert("Erro ao exportar: " + error.message);
    }
  };

  const totalWasteValue = useMemo(() => {
    return filtered.reduce((sum, m) => {
      const item = items.find(i => i.id === m.itemId);
      return sum + (item ? m.quantity * item.cost : 0);
    }, 0);
  }, [filtered, items]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar..." />
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ ...inputStyle, width: 150, padding: "10px 14px" }} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ ...inputStyle, width: 150, padding: "10px 14px" }} />
        <Btn onClick={handleDownload} variant="secondary" icon={<Download size={16} />}>Exportar Excel</Btn>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <KPICard icon={<AlertTriangle size={20} color={C.danger} />} label="Total de Perdas" value={filtered.length} sub={`${fmtDate(dateFrom)} a ${fmtDate(dateTo)}`} bgColor={C.dangerLight} />
        <KPICard icon={<Warehouse size={20} color={C.warning} />} label="Valor Perdido" value={fmt(totalWasteValue)} sub="No período" bgColor={C.warningLight} />
      </div>

      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay }}>Histórico de Desperdício</h3>
        </div>
        <div style={{ padding: "0 8px 8px" }}>
          <DataTable columns={[
            { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}` },
            { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
            { key: "quantity", label: "Quantidade", render: v => <Badge color={C.danger} bg={C.dangerLight}>{v}</Badge> },
            { key: "wasteReason", label: "Motivo", render: v => v || "—" },
            { key: "employee", label: "Responsável" },
          ]} data={filtered} />
        </div>
      </Card>
    </div>
  );
}

/* PORCIONAMENTO */
function PortioningTab({ items, setItems, employees, portioning, setPortioning, showToast }) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().split("T")[0]; });
  const [dateTo, setDateTo] = useState(todayISO);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const emptyForm = { itemId: "", quantity: "", employee: "", date: todayISO(), time: nowTime() };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => 
    portioning.filter(p => 
      p.date >= dateFrom && p.date <= dateTo &&
      (p.itemName.toLowerCase().includes(search.toLowerCase())) &&
      (!filterEmployee || p.employee === filterEmployee)
    ).sort((a, b) => b.id - a.id)
  , [portioning, search, dateFrom, dateTo, filterEmployee]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));
  const totalPortioned = useMemo(() => filtered.reduce((s, p) => s + p.quantity, 0), [filtered]);

  const portioningByDay = useMemo(() => {
    const map = {};
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      map[key] = { date: `${d.getDate()}/${d.getMonth() + 1}`, quantidade: 0 };
    }
    filtered.forEach(p => {
      if (map[p.date]) map[p.date].quantidade += p.quantity;
    });
    return Object.values(map);
  }, [filtered, dateFrom, dateTo]);

  const topPortioned = useMemo(() => {
    const map = {};
    filtered.forEach(p => { map[p.itemName] = (map[p.itemName] || 0) + p.quantity; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([name, qty]) => ({ name, quantidade: qty }));
  }, [filtered]);

  const handleSave = () => {
    if (!form.itemId || !form.quantity || !form.employee) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const qty = Number(form.quantity);
    
    if (isNaN(qty) || qty <= 0) {
      showToast("Quantidade deve ser maior que zero", "error");
      return;
    }
    
    if (!selectedItem) {
      showToast("Selecione um item válido", "error");
      return;
    }

    const newPort = { 
      id: nextId(portioning), 
      itemId: Number(form.itemId), 
      itemName: selectedItem.name, 
      quantity: qty, 
      date: form.date, 
      time: form.time, 
      employee: form.employee 
    };
    
    setPortioning(prev => [...prev, newPort]);
    setItems(prev => prev.map(i => i.id === Number(form.itemId) ? { ...i, currentStock: Math.max(0, i.currentStock - qty) } : i));
    
    showToast(`✓ Porcionamento de ${qty} ${selectedItem.unit} registrado!`);
    setModalOpen(false);
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  const handleDownload = () => {
    if (filtered.length === 0) return;
    const data = filtered.map(p => ({
      Data: fmtDate(p.date),
      Hora: p.time,
      Item: p.itemName,
      Quantidade: p.quantity,
      Responsável: p.employee
    }));
    
    try {
      const ws = window.XLSX.utils.json_to_sheet(data);
      const wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, ws, "Porcionamento");
      window.XLSX.writeFile(wb, `porcionamento_${dateFrom}_${dateTo}.xlsx`);
    } catch (error) {
      alert("Erro ao exportar: " + error.message);
    }
  };

  const ttStyle = { borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} />
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ ...inputStyle, width: 150, padding: "10px 14px" }} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ ...inputStyle, width: 150, padding: "10px 14px" }} />
        <Select noMargin options={employees.map(e => e.name)} value={filterEmployee} onChange={e => setFilterEmployee(e.target.value)} style={{ width: 180, padding: "10px 14px" }} />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setModalOpen(true); }} icon={<Scissors size={16} />}>Novo</Btn>
        <Btn onClick={handleDownload} variant="secondary" icon={<Download size={16} />}>Exportar Excel</Btn>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <KPICard icon={<Scissors size={20} color={C.accent} />} label="Total Porcionado" value={fmtN(totalPortioned)} sub={`${fmtDate(dateFrom)} a ${fmtDate(dateTo)}`} bgColor={C.accentLight} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 18 }}>Porcionamento por Dia</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={portioningByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="date" fontSize={11} stroke={C.textMuted} />
              <YAxis fontSize={11} stroke={C.textMuted} />
              <Tooltip contentStyle={ttStyle} />
              <Line type="monotone" dataKey="quantidade" stroke={C.accent} strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 18 }}>Top 5 Itens</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topPortioned} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" fontSize={11} stroke={C.textMuted} />
              <YAxis dataKey="name" type="category" width={100} fontSize={11} stroke={C.textMuted} />
              <Tooltip contentStyle={ttStyle} />
              <Bar dataKey="quantidade" fill={C.accent} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}` },
          { key: "itemName", label: "Item" },
          { key: "quantity", label: "Quantidade", render: v => <Badge color={C.accent} bg={C.accentLight}>{v}</Badge> },
          { key: "employee", label: "Responsável" },
        ]} data={filtered} />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Novo Porcionamento">
        <Select label="Item" required options={items.map(i => ({ value: String(i.id), label: i.name }))} value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })} />
        <Input label="Quantidade" required type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <Select label="Responsável" required options={employees.map(e => e.name)} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
          <Btn onClick={handleSave}>Confirmar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* FUNCIONÁRIOS */
function EmployeesTab({ employees, setEmployees, showToast }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", username: "" });

  const filtered = useMemo(() => employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase())), [employees, search]);

  const openAdd = () => { setEditing(null); setForm({ name: "", role: "", username: "" }); setModalOpen(true); };
  const openEdit = (emp) => { setEditing(emp); setForm({ name: emp.name, role: emp.role, username: emp.username }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.role || !form.username) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    if (form.name.trim().length < 3) {
      showToast("Nome deve ter pelo menos 3 caracteres", "error");
      return;
    }
    
    if (form.username.trim().length < 3) {
      showToast("Usuário deve ter pelo menos 3 caracteres", "error");
      return;
    }
    
    const usernameExists = employees.some(e => 
      e.username.toLowerCase() === form.username.toLowerCase() && 
      (!editing || e.id !== editing.id)
    );
    
    if (usernameExists) {
      showToast("Este nome de usuário já está em uso", "error");
      return;
    }
    
    if (editing) {
      setEmployees(prev => prev.map(e => e.id === editing.id ? { ...e, ...form } : e));
      showToast("✓ Funcionário atualizado com sucesso!");
    } else {
      setEmployees(prev => [...prev, { id: nextId(prev), ...form, status: "Ativo" }]);
      showToast("✓ Funcionário cadastrado com sucesso!");
    }
    setModalOpen(false);
  };

  const toggleStatus = (emp) => {
    const newStatus = emp.status === "Ativo" ? "Inativo" : "Ativo";
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: newStatus } : e));
    showToast(`${emp.name} ${newStatus === "Ativo" ? "ativado" : "desativado"}!`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} />
        <Btn onClick={openAdd} icon={<Plus size={16} />}>Novo</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "name", label: "Nome", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "role", label: "Cargo" },
          { key: "username", label: "Usuário" },
          { key: "status", label: "Status", render: v => <Badge color={v === "Ativo" ? C.success : C.textMuted} bg={v === "Ativo" ? C.successLight : C.bg}>{v}</Badge> },
        ]} data={filtered} onEdit={openEdit} actions={(row) => (
          <Btn variant="ghost" size="sm" onClick={() => toggleStatus(row)} icon={row.status === "Ativo" ? <X size={14} /> : <Check size={14} />} />
        )} />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar" : "Novo"}>
        <Input label="Nome" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Select label="Cargo" required options={ROLES} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <Input label="Usuário" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Btn>
          <Btn onClick={handleSave}>Salvar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* RELATÓRIOS */
function ReportsTab({ items, movements, portioning }) {
  const [reportType, setReportType] = useState("stock");
  const [dateFrom, setDateFrom] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [dateTo, setDateTo] = useState(todayISO);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterItem, setFilterItem] = useState("");
  const [filterReason, setFilterReason] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [xlsxReady, setXlsxReady] = useState(false);
  const [dateFilterApplied, setDateFilterApplied] = useState(false);

  useEffect(() => {
    const checkXLSX = () => {
      if (typeof window.XLSX !== 'undefined') {
        setXlsxReady(true);
        return true;
      }
      return false;
    };

    if (checkXLSX()) return;

    const interval = setInterval(() => {
      if (checkXLSX()) {
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [xlsxReady]);

  const reports = [
    { id: "stock", label: "Estoque Atual", icon: <Package size={16} />, desc: "Lista completa de todos os itens em estoque" },
    { id: "movements", label: "Movimentações", icon: <RefreshCw size={16} />, desc: "Detalhe de entradas e saídas por período" },
    { id: "critical", label: "Itens Críticos", icon: <AlertTriangle size={16} />, desc: "Itens abaixo do estoque mínimo" },
    { id: "consumption", label: "Consumo", icon: <TrendingDown size={16} />, desc: "Consumo de itens por período" },
    { id: "expiry", label: "Validades", icon: <Calendar size={16} />, desc: "Itens próximos ao vencimento" },
    { id: "waste", label: "Perdas/Desperdício", icon: <Trash2 size={16} />, desc: "Detalhamento de perdas" },
    { id: "portioning", label: "Porcionamento", icon: <Scissors size={16} />, desc: "Histórico de porcionamento" },
  ];

  const filteredMovements = useMemo(() => movements.filter(m => {
    if (dateFilterApplied && (m.date < dateFrom || m.date > dateTo)) return false;
    if (filterItem && m.itemId !== Number(filterItem)) return false;
    if (filterReason && m.reason !== filterReason) return false;
    return true;
  }), [movements, dateFrom, dateTo, filterItem, filterReason, dateFilterApplied]);

  const applyDateFilter = () => {
    setDateFilterApplied(true);
  };

  const clearDateFilter = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    setDateFrom(d.toISOString().split("T")[0]);
    setDateTo(todayISO());
    setDateFilterApplied(false);
  };

  const handleDownload = () => {
    if (!xlsxReady || typeof window.XLSX === 'undefined') {
      alert("Sistema de exportação ainda está carregando. Aguarde e tente novamente.");
      return;
    }
    
    setIsExporting(true);
    
    setTimeout(() => {
      try {
        let data = [];
        let filename = "";
        let sheetName = "Dados";

        const effectiveDateFrom = dateFilterApplied ? dateFrom : null;
        const effectiveDateTo = dateFilterApplied ? dateTo : null;

        switch (reportType) {
          case "stock": {
            const stockData = items.filter(i => !filterCategory || i.category === filterCategory);
            data = stockData.map(i => ({
              Item: i.name,
              Categoria: i.category,
              Unidade: i.unit,
              "Estoque Atual": i.currentStock,
              "Estoque Mínimo": i.minStock,
              "Custo Unitário": Number(i.cost.toFixed(2)),
              "Valor Total": Number((i.currentStock * i.cost).toFixed(2)),
              Fornecedor: i.supplier || "—"
            }));
            filename = "estoque_atual.xlsx";
            sheetName = "Estoque Atual";
            break;
          }
          case "movements": {
            const movData = effectiveDateFrom ? filteredMovements : movements;
            data = movData.map(m => ({
              Tipo: m.type === "in" ? "Entrada" : "Saída",
              Data: fmtDate(m.date),
              Hora: m.time,
              Item: m.itemName,
              Quantidade: m.quantity,
              Motivo: m.reason || (m.type === "in" ? "Compra" : "—"),
              Fornecedor: m.supplier || "—",
              "Preço Unit": m.price ? Number(m.price.toFixed(2)) : 0,
              Lote: m.batch || "—",
              Responsável: m.employee
            }));
            filename = effectiveDateFrom ? `movimentacoes_${dateFrom}_${dateTo}.xlsx` : `movimentacoes_completo.xlsx`;
            sheetName = "Movimentações";
            break;
          }
          case "critical": {
            const critical = items.filter(i => i.currentStock <= i.minStock);
            data = critical.map(i => ({
              Item: i.name,
              Categoria: i.category,
              "Estoque Atual": i.currentStock,
              "Estoque Mínimo": i.minStock,
              Déficit: i.minStock - i.currentStock,
              "Sugestão Compra": Math.max(i.minStock * 2 - i.currentStock, 0),
              "Custo Estimado": Number((Math.max(i.minStock * 2 - i.currentStock, 0) * i.cost).toFixed(2)),
              Fornecedor: i.supplier || "—"
            }));
            filename = "itens_criticos.xlsx";
            sheetName = "Itens Críticos";
            break;
          }
          case "consumption": {
            const outMov = effectiveDateFrom ? filteredMovements.filter(m => m.type === "out") : movements.filter(m => m.type === "out");
            const map = {};
            outMov.forEach(m => {
              if (!map[m.itemId]) {
                const it = items.find(i => i.id === m.itemId);
                map[m.itemId] = { name: m.itemName, unit: it?.unit || "", total: 0, cost: it?.cost || 0 };
              }
              map[m.itemId].total += m.quantity;
            });
            data = Object.values(map).map(i => ({
              Item: i.name,
              "Qtd Total": `${i.total} ${i.unit}`,
              "Custo Unit": Number(i.cost.toFixed(2)),
              "Custo Total": Number((i.total * i.cost).toFixed(2))
            }));
            filename = effectiveDateFrom ? `consumo_${dateFrom}_${dateTo}.xlsx` : `consumo_completo.xlsx`;
            sheetName = "Consumo";
            break;
          }
          case "expiry": {
            const expiryMov = movements.filter(m => m.type === "in" && m.expiry).map(m => {
              const exp = new Date(m.expiry);
              const now = new Date();
              const diff = Math.ceil((exp - now) / 86400000);
              return { ...m, daysLeft: diff, status: diff < 0 ? "Vencido" : diff <= 7 ? "Crítico" : diff <= 15 ? "Atenção" : "OK" };
            }).filter(m => m.daysLeft <= 30);
            data = expiryMov.map(m => ({
              Item: m.itemName,
              Lote: m.batch || "—",
              Quantidade: m.quantity,
              Validade: fmtDate(m.expiry),
              "Dias Restantes": m.daysLeft,
              Status: m.status,
              Fornecedor: m.supplier || "—"
            }));
            filename = "validades.xlsx";
            sheetName = "Validades";
            break;
          }
          case "waste": {
            const wasteMov = effectiveDateFrom ? filteredMovements.filter(m => m.reason === "Perda/Desperdício") : movements.filter(m => m.reason === "Perda/Desperdício");
            data = wasteMov.map(m => {
              const item = items.find(i => i.id === m.itemId);
              return {
                Data: fmtDate(m.date),
                Hora: m.time,
                Item: m.itemName,
                Quantidade: m.quantity,
                "Causa": m.wasteReason || "—",
                "Custo Unit": item?.cost ? Number(item.cost.toFixed(2)) : 0,
                "Valor Perdido": item ? Number((m.quantity * item.cost).toFixed(2)) : 0,
                Responsável: m.employee,
                Obs: m.notes || "—"
              };
            });
            filename = effectiveDateFrom ? `desperdicio_${dateFrom}_${dateTo}.xlsx` : `desperdicio_completo.xlsx`;
            sheetName = "Desperdício";
            break;
          }
          case "portioning": {
            const portData = effectiveDateFrom 
              ? portioning.filter(p => p.date >= dateFrom && p.date <= dateTo)
              : portioning;
            data = portData.map(p => ({
              Data: fmtDate(p.date),
              Hora: p.time,
              Item: p.itemName,
              Quantidade: p.quantity,
              Responsável: p.employee
            }));
            filename = effectiveDateFrom ? `porcionamento_${dateFrom}_${dateTo}.xlsx` : `porcionamento_completo.xlsx`;
            sheetName = "Porcionamento";
            break;
          }
          default:
            setIsExporting(false);
            return;
        }

        if (data.length === 0) {
          alert("Nenhum dado disponível para exportar!");
          setIsExporting(false);
          return;
        }

        const ws = window.XLSX.utils.json_to_sheet(data);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
        window.XLSX.writeFile(wb, filename);
        
        setTimeout(() => setIsExporting(false), 1000);
        
      } catch (error) {
        alert("Erro ao exportar:\n\n" + error.message);
        setIsExporting(false);
      }
    }, 100);
  };

  const renderReport = () => {
    switch (reportType) {
      case "stock": {
        const data = items.filter(i => !filterCategory || i.category === filterCategory)
          .map(i => ({ ...i, totalValue: i.currentStock * i.cost }));
        const total = data.reduce((s, i) => s + i.totalValue, 0);
        return (
          <div>
            <div style={{ marginBottom: 16, fontSize: 14, color: C.textSec, fontFamily: font }}>
              {data.length} itens cadastrados · Valor total: <strong style={{ color: C.text }}>{fmt(total)}</strong>
            </div>
            <DataTable columns={[
              { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
              { key: "category", label: "Categoria", render: v => <Badge color={C.secondary} bg={C.secondaryLight}>{v}</Badge> },
              { key: "unit", label: "Unidade" },
              { key: "currentStock", label: "Estoque", render: (v, r) => <span style={{ fontWeight: 700, color: v <= r.minStock ? C.danger : C.success }}>{v}</span> },
              { key: "minStock", label: "Mínimo" },
              { key: "cost", label: "Custo Unit.", render: v => fmt(v), nowrap: true },
              { key: "totalValue", label: "Valor Total", render: v => <strong>{fmt(v)}</strong>, nowrap: true },
              { key: "supplier", label: "Fornecedor", render: v => v || "—" },
            ]} data={data} />
          </div>
        );
      }
      case "movements": {
        const data = filteredMovements.sort((a, b) => b.id - a.id);
        return (
          <div>
            <div style={{ marginBottom: 16, fontSize: 14, color: C.textSec, fontFamily: font }}>
              {data.filter(m => m.type === "in").length} entradas · {data.filter(m => m.type === "out").length} saídas
              {dateFilterApplied && ` (período filtrado)`}
            </div>
            <DataTable columns={[
              { key: "type", label: "Tipo", render: v => v === "in" ? <Badge color={C.success} bg={C.successLight}>Entrada</Badge> : <Badge color={C.danger} bg={C.dangerLight}>Saída</Badge> },
              { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
              { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
              { key: "quantity", label: "Qtd", render: (v, r) => <span style={{ fontWeight: 700, color: r.type === "in" ? C.success : C.danger }}>{r.type === "in" ? "+" : "-"}{v}</span> },
              { key: "reason", label: "Motivo", render: v => v || "—" },
              { key: "employee", label: "Responsável" },
            ]} data={data} />
          </div>
        );
      }
      case "critical": {
        const data = items.filter(i => i.currentStock <= i.minStock).map(i => ({
          ...i,
          deficit: i.minStock - i.currentStock,
          suggestedPurchase: Math.max(i.minStock * 2 - i.currentStock, 0),
          estimatedCost: Math.max(i.minStock * 2 - i.currentStock, 0) * i.cost
        }));
        const totalCost = data.reduce((s, i) => s + i.estimatedCost, 0);
        return (
          <div>
            {data.length > 0 && (
              <div style={{ marginBottom: 16, fontSize: 14, color: C.danger, fontWeight: 600, fontFamily: font }}>
                {data.length} item(ns) em nível crítico
              </div>
            )}
            <DataTable columns={[
              { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
              { key: "category", label: "Categoria" },
              { key: "currentStock", label: "Estoque", render: (v, r) => <span style={{ color: C.danger, fontWeight: 700 }}>{v} {r.unit}</span> },
              { key: "minStock", label: "Mínimo", render: (v, r) => `${v} ${r.unit}` },
              { key: "deficit", label: "Déficit", render: (v, r) => <span style={{ color: C.danger }}>{v} {r.unit}</span> },
              { key: "suggestedPurchase", label: "Sugestão Compra", render: (v, r) => <span style={{ fontWeight: 700, color: C.secondary }}>{v} {r.unit}</span> },
              { key: "estimatedCost", label: "Custo Est.", render: v => fmt(v), nowrap: true },
              { key: "supplier", label: "Fornecedor", render: v => v || "—" },
            ]} data={data} />
            {data.length > 0 && (
              <div style={{ marginTop: 16, padding: 14, background: C.warningLight, borderRadius: 10, fontSize: 13, color: C.textSec, fontFamily: font }}>
                Custo estimado total para reposição: <strong style={{ color: C.text }}>{fmt(totalCost)}</strong>
              </div>
            )}
          </div>
        );
      }
      default: 
        return <div style={{ padding: 32, textAlign: "center", color: C.textMuted }}>Selecione um tipo de relatório</div>;
    }
  };

  const filterInputStyle = { padding: "8px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: font, background: C.bg, color: C.text, outline: "none" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {reports.map(r => (
          <button key={r.id} onClick={() => setReportType(r.id)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10,
            border: reportType === r.id ? `2px solid ${C.primary}` : `1.5px solid ${C.border}`,
            background: reportType === r.id ? C.primaryLight : C.card, cursor: "pointer",
            fontSize: 13, fontWeight: reportType === r.id ? 700 : 500,
            color: reportType === r.id ? C.primary : C.textSec,
            fontFamily: font, transition: "all 0.2s", whiteSpace: "nowrap"
          }}>
            {r.icon}{r.label}
          </button>
        ))}
      </div>

      <Card style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 4, fontFamily: font }}>De</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={filterInputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 4, fontFamily: font }}>Até</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={filterInputStyle} />
          </div>
          <Btn onClick={applyDateFilter} variant="secondary" size="sm" icon={<Calendar size={14} />}>Filtrar Datas</Btn>
          {dateFilterApplied && (
            <Btn onClick={clearDateFilter} variant="ghost" size="sm" icon={<X size={14} />}>Limpar Filtro</Btn>
          )}
          {reportType === "stock" && (
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 4, fontFamily: font }}>Categoria</label>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={filterInputStyle}>
                <option value="">Todas</option>
                {initialCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          {(reportType === "movements" || reportType === "consumption") && (
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 4, fontFamily: font }}>Item</label>
              <select value={filterItem} onChange={e => setFilterItem(e.target.value)} style={{ ...filterInputStyle, maxWidth: 200 }}>
                <option value="">Todos</option>
                {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          )}
          {reportType === "movements" && (
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 4, fontFamily: font }}>Motivo</label>
              <select value={filterReason} onChange={e => setFilterReason(e.target.value)} style={filterInputStyle}>
                <option value="">Todos</option>
                {EXIT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}
          <Btn 
            onClick={handleDownload} 
            icon={isExporting ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={16} />} 
            variant="secondary"
            disabled={isExporting || !xlsxReady}
            style={!xlsxReady ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {isExporting ? "Exportando..." : !xlsxReady ? "Carregando..." : "Exportar Excel"}
          </Btn>
        </div>
        {dateFilterApplied && (
          <div style={{ marginTop: 12, padding: "8px 12px", background: C.primaryLight, borderRadius: 6, fontSize: 12, color: C.primary, fontWeight: 600 }}>
            📅 Exibindo dados de {fmtDate(dateFrom)} até {fmtDate(dateTo)}
          </div>
        )}
      </Card>

      {/* Report Content */}
      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, margin: 0, color: C.text }}>{reports.find(r => r.id === reportType)?.label}</h3>
          <p style={{ fontSize: 12, color: C.textMuted, margin: "4px 0 0", fontFamily: font }}>{reports.find(r => r.id === reportType)?.desc}</p>
        </div>
        <div style={{ padding: "8px 8px 16px" }}>
          {renderReport()}
        </div>
      </Card>
    </div>
  );
}

/* CONFIGURAÇÕES */
function SettingsTab({ categories, setCategories, units, setUnits, showToast, onResetDb }) {
  const [newCat, setNewCat] = useState("");
  const [newUnit, setNewUnit] = useState("");
  
  const handleAddCategory = () => {
    const trimmed = newCat.trim();
    if (!trimmed) {
      showToast("Digite o nome da categoria", "error");
      return;
    }
    if (trimmed.length < 2) {
      showToast("Nome da categoria muito curto", "error");
      return;
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Esta categoria já existe", "error");
      return;
    }
    setCategories([...categories, trimmed]);
    setNewCat("");
    showToast("✓ Categoria adicionada!");
  };
  
  const handleAddUnit = () => {
    const trimmed = newUnit.trim();
    if (!trimmed) {
      showToast("Digite o nome da unidade", "error");
      return;
    }
    if (trimmed.length < 1) {
      showToast("Nome da unidade muito curto", "error");
      return;
    }
    if (units.some(u => u.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Esta unidade já existe", "error");
      return;
    }
    setUnits([...units, trimmed]);
    setNewUnit("");
    showToast("✓ Unidade adicionada!");
  };
  
  const handleRemoveCategory = (cat) => {
    if (confirm(`Tem certeza que deseja remover a categoria "${cat}"?`)) {
      setCategories(categories.filter(x => x !== cat));
      showToast("Categoria removida", "warning");
    }
  };
  
  const handleRemoveUnit = (unit) => {
    if (confirm(`Tem certeza que deseja remover a unidade "${unit}"?`)) {
      setUnits(units.filter(x => x !== unit));
      showToast("Unidade removida", "warning");
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: fontDisplay }}>Categorias</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input 
            value={newCat} 
            onChange={e => setNewCat(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleAddCategory()}
            placeholder="Nova categoria" 
            style={inputStyle} 
          />
          <Btn onClick={handleAddCategory} icon={<Plus size={16} />}>Adicionar</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13 }}>{c}</span>
              <X size={14} style={{ cursor: "pointer", color: C.danger }} onClick={() => handleRemoveCategory(c)} />
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: fontDisplay }}>Unidades de Medida</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input 
            value={newUnit} 
            onChange={e => setNewUnit(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleAddUnit()}
            placeholder="Nova unidade" 
            style={inputStyle} 
          />
          <Btn onClick={handleAddUnit} icon={<Plus size={16} />}>Adicionar</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {units.map(u => (
            <div key={u} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13 }}>{u}</span>
              <X size={14} style={{ cursor: "pointer", color: C.danger }} onClick={() => handleRemoveUnit(u)} />
            </div>
          ))}
        </div>
      </Card>

      {/* Zona de Perigo - Reset do Banco */}
      <Card style={{ padding: 24, border: `2px solid ${C.danger}`, background: C.dangerLight }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <AlertTriangle size={24} color={C.danger} />
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, color: C.danger, margin: 0 }}>Zona de Perigo</h3>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: font }}>Resetar Banco de Dados</h4>
          <p style={{ fontSize: 13, color: C.textSec, marginBottom: 12, fontFamily: font, lineHeight: 1.5 }}>
            Esta ação irá <strong>apagar permanentemente</strong> todos os dados salvos no sistema, incluindo:
          </p>
          <ul style={{ fontSize: 13, color: C.textSec, marginLeft: 20, marginBottom: 16, fontFamily: font, lineHeight: 1.8 }}>
            <li>Todos os itens de estoque cadastrados</li>
            <li>Histórico completo de movimentações (entradas e saídas)</li>
            <li>Registros de porcionamento</li>
            <li>Cadastro de funcionários</li>
            <li>Categorias e unidades personalizadas</li>
          </ul>
          <p style={{ fontSize: 13, color: C.danger, fontWeight: 600, marginBottom: 16, fontFamily: font }}>
            ⚠️ Esta ação NÃO pode ser desfeita!
          </p>
        </div>
        
        <Btn variant="danger" onClick={onResetDb} icon={<Trash2 size={16} />}>
          Apagar Todos os Dados e Resetar Sistema
        </Btn>
      </Card>

      {/* Informações do Sistema */}
      <Card style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Database size={20} color={C.secondary} />
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, margin: 0 }}>Informações do Sistema</h3>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ padding: 12, background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Armazenamento</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Persistente (Cloud)</div>
          </div>
          <div style={{ padding: 12, background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Salvamento</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Automático</div>
          </div>
        </div>
        
        <div style={{ marginTop: 16, padding: 12, background: C.successLight, borderRadius: 8, border: `1px solid ${C.success}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={16} color={C.success} />
            <span style={{ fontSize: 13, color: C.text, fontFamily: font }}>
              <strong>Seus dados estão sendo salvos automaticamente.</strong> Todas as alterações são persistidas em tempo real.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
