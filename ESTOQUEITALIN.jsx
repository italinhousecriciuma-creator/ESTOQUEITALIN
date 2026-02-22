
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
      return result !== null;
    } catch (error) {
      console.error(`❌ Erro ao salvar ${key}:`, error);
      return false;
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
const ITEMS_PER_PAGE = 15;

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
  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(44,24,16,0.5)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, borderRadius: 16, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 64px rgba(44,24,16,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.card, zIndex: 1, borderRadius: "16px 16px 0 0" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, fontFamily: fontDisplay }}>{title}</h3>
          <div onClick={onClose} style={{ cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }} title="Fechar (ESC)">
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

function Btn({ children, variant = "primary", size = "md", icon, style: extraStyle, disabled, loading, ...props }) {
  const v = {
    primary:   { bg: C.primary,     color: "#fff",     hbg: C.primaryDark },
    secondary: { bg: "transparent", color: C.primary,  hbg: C.primaryLight, border: `1.5px solid ${C.primary}` },
    success:   { bg: C.secondary,   color: "#fff",     hbg: "#1E4A1A" },
    danger:    { bg: C.danger,      color: "#fff",     hbg: "#A33722" },
    ghost:     { bg: "transparent", color: C.textSec,  hbg: C.bg },
  }[variant];
  const s = { sm: { px: 12, py: 6, fs: 12 }, md: { px: 18, py: 10, fs: 14 }, lg: { px: 24, py: 12, fs: 15 } }[size];
  const [hov, setHov] = useState(false);
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: `${s.py}px ${s.px}px`, background: hov && !isDisabled ? v.hbg : v.bg,
        color: v.color, border: v.border || "none", borderRadius: 8,
        fontSize: s.fs, fontWeight: 600, cursor: isDisabled ? "not-allowed" : "pointer", fontFamily: font,
        transition: "all 0.2s", whiteSpace: "nowrap", 
        opacity: isDisabled ? 0.6 : 1,
        ...extraStyle
      }}
    >
      {loading ? <RefreshCw size={s.fs} style={{ animation: 'spin 1s linear infinite' }} /> : icon}
      {children}
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

/* ═══════════════════════════════════════════
   TABELA COM PAGINAÇÃO E ORDENAÇÃO
   ═══════════════════════════════════════════ */
function DataTable({ columns, data, onEdit, onDelete, actions, pageSize = ITEMS_PER_PAGE }) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const hasActions = onEdit || onDelete || actions;

  // Reset page quando dados mudam
  useEffect(() => { setPage(1); }, [data.length]);

  // Ordenação
  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  // Paginação
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return <ArrowUpDown size={12} color={C.textMuted} />;
    return sortDir === 'asc' ? <ArrowUp size={12} color={C.primary} /> : <ArrowDown size={12} color={C.primary} />;
  };

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font }}>
          <thead>
            <tr>
              {columns.map(c => (
                <th 
                  key={c.key} 
                  onClick={() => !c.noSort && handleSort(c.key)}
                  style={{ 
                    padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, 
                    color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, 
                    borderBottom: `2px solid ${C.border}`, whiteSpace: "nowrap",
                    cursor: c.noSort ? 'default' : 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {c.label}
                    {!c.noSort && <SortIcon colKey={c.key} />}
                  </div>
                </th>
              ))}
              {hasActions && <th style={{ padding: "12px 14px", textAlign: "right", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `2px solid ${C.border}` }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr><td colSpan={columns.length + (hasActions ? 1 : 0)} style={{ padding: 48, textAlign: "center", color: C.textMuted, fontSize: 14 }}>Nenhum registro encontrado</td></tr>
            ) : paginatedData.map((row, i) => (
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

      {/* Paginação */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 14px", borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: C.textMuted, fontFamily: font }}>
            Mostrando {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, sortedData.length)} de {sortedData.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Btn variant="ghost" size="sm" onClick={() => setPage(1)} disabled={page === 1} icon={<ChevronsLeft size={16} />} />
            <Btn variant="ghost" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1} icon={<ChevronLeft size={16} />} />
            <span style={{ padding: "6px 12px", fontSize: 13, fontWeight: 600, color: C.text, fontFamily: font }}>
              {page} / {totalPages}
            </span>
            <Btn variant="ghost" size="sm" onClick={() => setPage(p => p + 1)} disabled={page === totalPages} icon={<ChevronRight size={16} />} />
            <Btn variant="ghost" size="sm" onClick={() => setPage(totalPages)} disabled={page === totalPages} icon={<ChevronsRight size={16} />} />
          </div>
        </div>
      )}
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
    error: { icon: <CloudOff size={14} />, text: "Erro ao salvar", color: C.danger },
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
      background: status === 'error' ? C.dangerLight : status === 'saved' ? C.successLight : C.bg, 
      borderRadius: 8,
      fontSize: 12,
      color: config.color,
      fontFamily: font,
      fontWeight: 600,
      border: `1px solid ${status === 'error' ? C.danger : status === 'saved' ? C.success : C.border}`,
      transition: 'all 0.3s ease'
    }}>
      {config.icon}
      <span>{config.text}</span>
      {status === 'saved' && lastSaved && (
        <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 500 }}>
          às {formatTime(lastSaved)}
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
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  
  // Estados do banco de dados
  const [isInitialized, setIsInitialized] = useState(false);
  const [dbStatus, setDbStatus] = useState('loading');
  const [lastSaved, setLastSaved] = useState(null);
  
  // Refs para tracking de mudanças
  const dataRef = useRef({ items: [], employees: [], movements: [], portioning: [], categories: [], units: [] });
  const saveTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, key: Date.now() });
  }, []);

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
        
        const loadedItems = savedItems?.length > 0 ? savedItems : initialItems;
        const loadedEmployees = savedEmployees?.length > 0 ? savedEmployees : initialEmployees;
        const loadedMovements = savedMovements?.length > 0 ? savedMovements : generateMovements();
        const loadedPortioning = savedPortioning?.length > 0 ? savedPortioning : generatePortioning();
        const loadedCategories = savedCategories?.length > 0 ? savedCategories : initialCategories;
        const loadedUnits = savedUnits?.length > 0 ? savedUnits : initialUnits;
        
        setItems(loadedItems);
        setEmployees(loadedEmployees);
        setMovements(loadedMovements);
        setPortioning(loadedPortioning);
        setCategories(loadedCategories);
        setUnits(loadedUnits);
        
        // Guarda referência para comparação
        dataRef.current = {
          items: loadedItems,
          employees: loadedEmployees,
          movements: loadedMovements,
          portioning: loadedPortioning,
          categories: loadedCategories,
          units: loadedUnits
        };
        
        const hasData = savedItems?.length > 0 || savedMovements?.length > 0;
        console.log(hasData ? '✓ Dados carregados do banco' : '✓ Usando dados iniciais');
        
        setDbStatus('saved');
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
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

  // Auto-save OTIMIZADO - só salva o que mudou
  useEffect(() => {
    if (!isInitialized) return;
    
    // Limpa timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(async () => {
      const toSave = [];
      
      // Compara e salva só o que mudou
      if (JSON.stringify(items) !== JSON.stringify(dataRef.current.items)) {
        toSave.push(db.save(DB_KEYS.items, items));
        dataRef.current.items = items;
      }
      if (JSON.stringify(employees) !== JSON.stringify(dataRef.current.employees)) {
        toSave.push(db.save(DB_KEYS.employees, employees));
        dataRef.current.employees = employees;
      }
      if (JSON.stringify(movements) !== JSON.stringify(dataRef.current.movements)) {
        toSave.push(db.save(DB_KEYS.movements, movements));
        dataRef.current.movements = movements;
      }
      if (JSON.stringify(portioning) !== JSON.stringify(dataRef.current.portioning)) {
        toSave.push(db.save(DB_KEYS.portioning, portioning));
        dataRef.current.portioning = portioning;
      }
      if (JSON.stringify(categories) !== JSON.stringify(dataRef.current.categories)) {
        toSave.push(db.save(DB_KEYS.categories, categories));
        dataRef.current.categories = categories;
      }
      if (JSON.stringify(units) !== JSON.stringify(dataRef.current.units)) {
        toSave.push(db.save(DB_KEYS.units, units));
        dataRef.current.units = units;
      }
      
      if (toSave.length > 0) {
        console.log(`💾 Salvando ${toSave.length} tabela(s)...`);
        setDbStatus('saving');
        
        try {
          const results = await Promise.all(toSave);
          if (results.every(r => r === true)) {
            setDbStatus('saved');
            setLastSaved(new Date().toISOString());
            console.log('✓ Dados salvos com sucesso');
          } else {
            setDbStatus('error');
          }
        } catch (error) {
          console.error('❌ Erro ao salvar:', error);
          setDbStatus('error');
        }
      }
    }, 800); // Debounce de 800ms
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [items, employees, movements, portioning, categories, units, isInitialized]);

  // Carrega XLSX
  useEffect(() => {
    if (typeof window.XLSX !== 'undefined') return;
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    document.head.appendChild(script);
  }, []);

  // Responsividade da sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função para resetar banco
  const handleResetDb = useCallback(async () => {
    if (!confirm("⚠️ ATENÇÃO!\n\nIsso irá APAGAR TODOS os dados salvos.\n\nTem certeza?")) return;
    if (!confirm("🔴 ÚLTIMA CONFIRMAÇÃO\n\nTodos os itens, movimentações, funcionários e configurações serão perdidos.\n\nContinuar?")) return;
    
    setDbStatus('saving');
    await db.clearAll();
    
    const newItems = initialItems;
    const newEmployees = initialEmployees;
    const newMovements = generateMovements();
    const newPortioning = generatePortioning();
    const newCategories = initialCategories;
    const newUnits = initialUnits;
    
    setItems(newItems);
    setEmployees(newEmployees);
    setMovements(newMovements);
    setPortioning(newPortioning);
    setCategories(newCategories);
    setUnits(newUnits);
    
    dataRef.current = {
      items: newItems,
      employees: newEmployees,
      movements: newMovements,
      portioning: newPortioning,
      categories: newCategories,
      units: newUnits
    };
    
    setDbStatus('saved');
    setLastSaved(new Date().toISOString());
    showToast("🗑️ Banco de dados resetado!", "warning");
  }, [showToast]);

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
    { id: "items", label: "Itens", icon: <Package size={18} /> },
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
        gap: 20
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        `}</style>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 20, 
          background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 800,
          fontFamily: fontDisplay,
          color: "#fff",
          boxShadow: "0 8px 32px rgba(194,69,45,0.3)"
        }}>
          IH
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.text }}>
            <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} color={C.primary} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>Carregando sistema...</span>
          </div>
          <span style={{ fontSize: 13, color: C.textMuted }}>Italin House - Gestão de Estoque</span>
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
        @media (max-width: 768px) {
          .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; }
        }
      `}</style>

      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Overlay mobile */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside style={{ 
        width: sidebarOpen ? 240 : 64, 
        background: C.text, 
        color: "#fff", 
        display: "flex", 
        flexDirection: "column", 
        transition: "all 0.3s ease", 
        flexShrink: 0, 
        overflow: "hidden",
        position: window.innerWidth <= 768 ? 'fixed' : 'relative',
        height: '100%',
        zIndex: 100,
        transform: window.innerWidth <= 768 && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)'
      }}>
        <div style={{ padding: sidebarOpen ? "20px 16px 16px" : "20px 11px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, minHeight: 72 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 800, fontFamily: fontDisplay, color: "#fff" }}>IH</div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, lineHeight: 1.2, whiteSpace: "nowrap" }}>Italin House</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Gestão de Estoque</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: "12px 6px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => { setActiveTab(t.id); if (window.innerWidth <= 768) setSidebarOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: sidebarOpen ? "10px 12px" : "10px 0",
                borderRadius: 8, border: "none", cursor: "pointer", fontFamily: font,
                fontSize: 13, fontWeight: active ? 700 : 500, transition: "all 0.2s",
                background: active ? "rgba(194,69,45,0.2)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                width: "100%", minHeight: 40, position: "relative"
              }}>
                <span style={{ flexShrink: 0, display: "flex" }}>{t.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}</span>}
                {t.badge > 0 && sidebarOpen && (
                  <span style={{ marginLeft: "auto", background: C.danger, color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                    {t.badge}
                  </span>
                )}
                {t.id === "items" && criticalItems.length > 0 && sidebarOpen && (
                  <span style={{ marginLeft: "auto", background: C.danger, color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                    {criticalItems.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "10px 6px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", width: "100%",
            border: "none", borderRadius: 8, background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, fontFamily: font,
            justifyContent: sidebarOpen ? "flex-start" : "center"
          }}>
            <Menu size={16} />{sidebarOpen && "Recolher"}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{
          padding: "14px 20px", background: C.card, borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 50, gap: 12
        }}>
          {/* Menu mobile */}
          {window.innerWidth <= 768 && (
            <button onClick={() => setSidebarOpen(true)} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Menu size={24} color={C.text} />
            </button>
          )}
          
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: 19, fontWeight: 700, fontFamily: fontDisplay, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: 11, color: C.textMuted, marginTop: 2, fontFamily: font, display: window.innerWidth <= 480 ? 'none' : 'block' }}>
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <DbStatusIndicator status={dbStatus} lastSaved={lastSaved} />
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={C.textSec} />
              {criticalItems.length > 0 && (
                <span style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderRadius: 9, background: C.danger, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.card}` }}>
                  {criticalItems.length}
                </span>
              )}
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "auto", padding: window.innerWidth <= 768 ? "16px" : "20px 24px" }} key={activeTab}>
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {renderTab()}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════ */
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {criticalItems.length > 0 && (
        <div style={{ background: `linear-gradient(135deg, ${C.dangerLight}, ${C.warningLight})`, borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${C.border}` }}>
          <AlertTriangle size={22} color={C.danger} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.danger }}>{criticalItems.length} item(ns) em nível crítico!</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>
              {criticalItems.slice(0, 3).map(i => i.name).join(", ")}{criticalItems.length > 3 ? "..." : ""}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <KPICard icon={<Package size={20} color={C.primary} />} label="Total de Itens" value={fmtN(items.length)} sub={`${fmtN(items.reduce((s, i) => s + i.currentStock, 0))} unidades`} bgColor={C.primaryLight} />
        <KPICard icon={<AlertTriangle size={20} color={C.warning} />} label="Itens Críticos" value={criticalItems.length} sub={criticalItems.length > 0 ? "Precisa repor!" : "Tudo OK"} bgColor={C.warningLight} />
        <KPICard icon={<Warehouse size={20} color={C.secondary} />} label="Valor em Estoque" value={fmt(totalValue)} bgColor={C.secondaryLight} />
        <KPICard icon={<Scissors size={20} color={C.accent} />} label="Porcionamento" value={fmtN(portioningThisWeek)} sub="Últimos 7 dias" bgColor={C.accentLight} />
      </div>

      <Card style={{ padding: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 16 }}>Movimentação (14 dias)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={movementByDay}>
            <defs>
              <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.secondary} stopOpacity={0.2} /><stop offset="95%" stopColor={C.secondary} stopOpacity={0} /></linearGradient>
              <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.primary} stopOpacity={0.2} /><stop offset="95%" stopColor={C.primary} stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="date" fontSize={11} stroke={C.textMuted} />
            <YAxis fontSize={11} stroke={C.textMuted} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="entradas" stroke={C.secondary} fill="url(#gIn)" strokeWidth={2.5} name="Entradas" />
            <Area type="monotone" dataKey="saidas" stroke={C.primary} fill="url(#gOut)" strokeWidth={2.5} name="Saídas" />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 16 }}>Resumo do Mês</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 14, background: C.successLight, borderRadius: 10, textAlign: "center" }}>
              <ArrowUpCircle size={24} color={C.success} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 800, color: C.success, fontFamily: fontDisplay }}>{monthIn}</div>
              <div style={{ fontSize: 11, color: C.textSec, fontWeight: 600, textTransform: "uppercase" }}>Entradas</div>
            </div>
            <div style={{ padding: 14, background: C.dangerLight, borderRadius: 10, textAlign: "center" }}>
              <ArrowDownCircle size={24} color={C.danger} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 22, fontWeight: 800, color: C.danger, fontFamily: fontDisplay }}>{monthOut}</div>
              <div style={{ fontSize: 11, color: C.textSec, fontWeight: 600, textTransform: "uppercase" }}>Saídas</div>
            </div>
          </div>
        </Card>

        {criticalItems.length > 0 && (
          <Card style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginBottom: 16, color: C.danger }}>⚠️ Itens Críticos</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {criticalItems.slice(0, 5).map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: C.dangerLight, borderRadius: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.name}</span>
                  <Badge color={C.danger} bg="rgba(194,69,45,0.2)">{item.currentStock}/{item.minStock}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ITENS
   ═══════════════════════════════════════════ */
function ItemsTab({ items, setItems, categories, units, showToast }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", unit: "", category: "", minStock: "", cost: "", supplier: "", perishable: false });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => items.filter(i =>
    (i.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCat || i.category === filterCat)
  ), [items, search, filterCat]);

  const openAdd = () => { setEditing(null); setForm({ name: "", unit: "", category: "", minStock: "", cost: "", supplier: "", perishable: false }); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, unit: item.unit, category: item.category, minStock: String(item.minStock), cost: String(item.cost), supplier: item.supplier || "", perishable: item.perishable }); setModalOpen(true); };
  
  const openDelete = (item) => { setItemToDelete(item); setDeleteModal(true); };
  
  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      showToast(`Item "${itemToDelete.name}" excluído!`, "warning");
      setDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.unit || !form.category || !form.minStock || !form.cost) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const minStock = Number(form.minStock);
    const cost = Number(form.cost);
    
    if (isNaN(minStock) || minStock < 0) {
      showToast("Estoque mínimo inválido", "error");
      return;
    }
    
    if (isNaN(cost) || cost < 0) {
      showToast("Custo inválido", "error");
      return;
    }
    
    setSaving(true);
    
    // Simula pequeno delay para feedback visual
    await new Promise(r => setTimeout(r, 300));
    
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, minStock, cost } : i));
      showToast("✓ Item atualizado!");
    } else {
      const newItem = { id: nextId(items), ...form, minStock, cost, currentStock: 0 };
      setItems(prev => [...prev, newItem]);
      showToast("✓ Item cadastrado!");
    }
    
    setSaving(false);
    setModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar item..." />
        <Select noMargin options={categories} value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ width: 160, padding: "10px 14px" }} />
        <Btn onClick={openAdd} icon={<Plus size={16} />}>Novo Item</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "category", label: "Categoria", render: v => <Badge color={C.secondary} bg={C.secondaryLight}>{v}</Badge> },
          { key: "unit", label: "Unidade" },
          { key: "currentStock", label: "Estoque", render: (v, r) => <span style={{ fontWeight: 700, color: v <= r.minStock ? C.danger : C.success }}>{v}</span> },
          { key: "minStock", label: "Mínimo" },
          { key: "cost", label: "Custo", render: v => fmt(v), nowrap: true },
        ]} data={filtered} onEdit={openEdit} onDelete={openDelete} />
      </Card>

      <Modal open={modalOpen} onClose={() => !saving && setModalOpen(false)} title={editing ? "Editar Item" : "Novo Item"}>
        <Input label="Nome" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ex: Queijo Parmesão" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Select label="Unidade" required options={units} value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
          <Select label="Categoria" required options={categories} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Estoque Mínimo" required type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} />
          <Input label="Custo (R$)" required type="number" step="0.01" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
        </div>
        <Input label="Fornecedor" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} placeholder="Nome do fornecedor" />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Btn>
          <Btn onClick={handleSave} icon={<Check size={16} />} loading={saving}>{saving ? "Salvando..." : "Salvar"}</Btn>
        </div>
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Confirmar Exclusão" width={420}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: C.textSec, marginBottom: 12 }}>Tem certeza que deseja excluir?</p>
          {itemToDelete && (
            <div style={{ background: C.dangerLight, padding: 14, borderRadius: 8, border: `1px solid ${C.danger}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{itemToDelete.name}</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>
                Estoque atual: {itemToDelete.currentStock} {itemToDelete.unit}
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setDeleteModal(false)}>Cancelar</Btn>
          <Btn variant="danger" onClick={confirmDelete} icon={<Trash2 size={16} />}>Excluir</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ENTRADA DE ESTOQUE
   ═══════════════════════════════════════════ */
function StockInTab({ items, setItems, employees, movements, setMovements, showToast, categories, units }) {
  const [search, setSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const emptyForm = { itemId: "", quantity: "", batch: "", expiry: "", employee: "", date: todayISO(), time: nowTime(), supplier: "", price: "", notes: "" };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() =>
    movements.filter(m => m.type === "in").sort((a, b) => b.id - a.id)
      .filter(m => m.itemName.toLowerCase().includes(search.toLowerCase()))
  , [movements, search]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));
  const filteredItems = useMemo(() => items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())), [items, itemSearch]);

  const handleSave = async () => {
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
      showToast("Preço inválido", "error");
      return;
    }
    
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    
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
      invoice: null,
      reason: null,
      wasteReason: null
    };
    
    setMovements(prev => [...prev, newMov]);
    setItems(prev => prev.map(i => i.id === Number(form.itemId) ? { ...i, currentStock: i.currentStock + qty } : i));
    
    showToast(`✓ Entrada de ${qty} ${selectedItem.unit} registrada!`);
    setSaving(false);
    setModalOpen(false);
    setItemSearch("");
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar entrada..." />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setItemSearch(""); setModalOpen(true); }} variant="success" icon={<ArrowUpCircle size={16} />}>Nova Entrada</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
          { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "quantity", label: "Qtd", render: v => <Badge color={C.success} bg={C.successLight}>+{v}</Badge> },
          { key: "batch", label: "Lote", render: v => v || "—" },
          { key: "supplier", label: "Fornecedor", render: v => v || "—" },
          { key: "price", label: "Preço", render: v => v ? fmt(v) : "—", nowrap: true },
          { key: "employee", label: "Responsável" },
        ]} data={filtered} />
      </Card>

      <Modal open={modalOpen} onClose={() => !saving && setModalOpen(false)} title="Nova Entrada de Estoque" width={600}>
        <FormField label="Item" required>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted }} />
            <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Buscar item..." style={{ ...inputStyle, paddingLeft: 40 }} />
          </div>
          {itemSearch && filteredItems.length > 0 && (
            <div style={{ maxHeight: 180, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 8, background: C.card }}>
              {filteredItems.map(item => (
                <div key={item.id} onClick={() => { setForm({ ...form, itemId: String(item.id), supplier: form.supplier || item.supplier || "", price: form.price || String(item.cost) }); setItemSearch(""); }} 
                  style={{ padding: "10px 14px", cursor: "pointer", fontSize: 14, borderBottom: `1px solid ${C.border}` }} 
                  onMouseEnter={e => e.currentTarget.style.background = C.bg} 
                  onMouseLeave={e => e.currentTarget.style.background = C.card}>
                  <strong>{item.name}</strong> <span style={{ color: C.textMuted }}>({item.unit})</span>
                </div>
              ))}
            </div>
          )}
          <Select noMargin options={items.map(i => ({ value: String(i.id), label: `${i.name} (${i.unit})` }))} value={form.itemId} onChange={e => { const it = items.find(i => i.id === Number(e.target.value)); setForm({ ...form, itemId: e.target.value, supplier: form.supplier || it?.supplier || "", price: form.price || (it ? String(it.cost) : "") }); }} />
        </FormField>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Quantidade" required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder={selectedItem ? `Em ${selectedItem.unit}` : ""} />
          <Input label="Preço Unitário (R$)" required type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Nº do Lote" value={form.batch} onChange={e => setForm({ ...form, batch: e.target.value })} placeholder="Ex: LT0042" />
          <Input label="Data de Validade" type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Data" required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <Select label="Responsável" required options={employees.filter(e => e.status === "Ativo").map(e => ({ value: e.name, label: `${e.name}` }))} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        </div>
        
        <Input label="Fornecedor" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
        
        {selectedItem && (
          <div style={{ background: selectedItem.currentStock <= selectedItem.minStock ? C.warningLight : C.bg, borderRadius: 10, padding: 12, marginTop: 8, fontSize: 13, color: C.textSec, fontFamily: font, display: "flex", alignItems: "center", gap: 8 }}>
            <Info size={16} color={C.textMuted} />
            <span>Estoque atual: <strong style={{ color: selectedItem.currentStock <= selectedItem.minStock ? C.danger : C.success }}>{selectedItem.currentStock} {selectedItem.unit}</strong> (mín: {selectedItem.minStock})</span>
          </div>
        )}
        
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Btn>
          <Btn variant="success" onClick={handleSave} icon={<Check size={16} />} loading={saving}>{saving ? "Salvando..." : "Confirmar"}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SAÍDA DE ESTOQUE
   ═══════════════════════════════════════════ */
function StockOutTab({ items, setItems, employees, movements, setMovements, showToast }) {
  const [search, setSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const emptyForm = { itemId: "", quantity: "", employee: "", date: todayISO(), time: nowTime(), reason: "", wasteReason: "", notes: "" };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() =>
    movements.filter(m => m.type === "out").sort((a, b) => b.id - a.id)
      .filter(m => m.itemName.toLowerCase().includes(search.toLowerCase()))
  , [movements, search]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));
  const filteredItems = useMemo(() => items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())), [items, itemSearch]);

  const handleSave = async () => {
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
    
    if (qty > selectedItem.currentStock) {
      showToast(`Estoque insuficiente! Disponível: ${selectedItem.currentStock} ${selectedItem.unit}`, "error");
      return;
    }
    
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    
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
    setSaving(false);
    setModalOpen(false);
    setItemSearch("");
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar saída..." />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setItemSearch(""); setModalOpen(true); }} variant="danger" icon={<ArrowDownCircle size={16} />}>Nova Saída</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
          { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "quantity", label: "Qtd", render: v => <Badge color={C.danger} bg={C.dangerLight}>-{v}</Badge> },
          { key: "reason", label: "Motivo" },
          { key: "employee", label: "Responsável" },
        ]} data={filtered} />
      </Card>

      <Modal open={modalOpen} onClose={() => !saving && setModalOpen(false)} title="Nova Saída de Estoque" width={560}>
        <FormField label="Item" required>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted }} />
            <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Buscar item..." style={{ ...inputStyle, paddingLeft: 40 }} />
          </div>
          {itemSearch && filteredItems.length > 0 && (
            <div style={{ maxHeight: 180, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 8 }}>
              {filteredItems.map(item => (
                <div key={item.id} onClick={() => { setForm({ ...form, itemId: String(item.id) }); setItemSearch(""); }} 
                  style={{ padding: "10px 14px", cursor: "pointer", fontSize: 14, borderBottom: `1px solid ${C.border}`, background: C.card }} 
                  onMouseEnter={e => e.currentTarget.style.background = C.bg} 
                  onMouseLeave={e => e.currentTarget.style.background = C.card}>
                  <strong>{item.name}</strong> <span style={{ color: item.currentStock <= item.minStock ? C.danger : C.success, fontWeight: 600 }}>(estoque: {item.currentStock})</span>
                </div>
              ))}
            </div>
          )}
          <Select noMargin options={items.map(i => ({ value: String(i.id), label: `${i.name} (${i.currentStock} em estoque)` }))} value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })} />
        </FormField>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Quantidade" required type="number" min="1" max={selectedItem?.currentStock} value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          <Select label="Motivo" required options={EXIT_REASONS} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value, wasteReason: "" })} />
        </div>
        
        {form.reason === "Perda/Desperdício" && (
          <Select label="Causa da Perda" required options={WASTE_REASONS} value={form.wasteReason} onChange={e => setForm({ ...form, wasteReason: e.target.value })} />
        )}
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Data" required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <Select label="Responsável" required options={employees.filter(e => e.status === "Ativo").map(e => e.name)} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        </div>
        
        {selectedItem && (
          <div style={{ background: C.bg, borderRadius: 10, padding: 12, fontSize: 13, color: C.textSec, fontFamily: font }}>
            Estoque atual: <strong style={{ color: selectedItem.currentStock <= selectedItem.minStock ? C.danger : C.text }}>{selectedItem.currentStock} {selectedItem.unit}</strong>
            {form.quantity && Number(form.quantity) > 0 && (
              <span> → Após saída: <strong style={{ color: selectedItem.currentStock - Number(form.quantity) <= selectedItem.minStock ? C.danger : C.success }}>{selectedItem.currentStock - Number(form.quantity)} {selectedItem.unit}</strong></span>
            )}
          </div>
        )}
        
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Btn>
          <Btn variant="danger" onClick={handleSave} icon={<Check size={16} />} loading={saving}>{saving ? "Salvando..." : "Confirmar"}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DESPERDÍCIO
   ═══════════════════════════════════════════ */
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

  const totalWasteValue = useMemo(() => {
    return filtered.reduce((sum, m) => {
      const item = items.find(i => i.id === m.itemId);
      return sum + (item ? m.quantity * item.cost : 0);
    }, 0);
  }, [filtered, items]);

  const handleDownload = () => {
    if (filtered.length === 0 || typeof window.XLSX === 'undefined') return;
    const data = filtered.map(m => {
      const item = items.find(i => i.id === m.itemId);
      return {
        Data: fmtDate(m.date),
        Hora: m.time,
        Item: m.itemName,
        Quantidade: m.quantity,
        Motivo: m.wasteReason || "—",
        "Valor Perdido": item ? (m.quantity * item.cost).toFixed(2) : "—",
        Responsável: m.employee
      };
    });
    
    const ws = window.XLSX.utils.json_to_sheet(data);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Desperdício");
    window.XLSX.writeFile(wb, `desperdicio_${dateFrom}_${dateTo}.xlsx`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar..." />
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ ...inputStyle, width: 140, padding: "10px 12px" }} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ ...inputStyle, width: 140, padding: "10px 12px" }} />
        <Btn onClick={handleDownload} variant="secondary" icon={<Download size={16} />}>Exportar</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <KPICard icon={<AlertTriangle size={20} color={C.danger} />} label="Total de Perdas" value={filtered.length} sub={`${fmtDate(dateFrom)} a ${fmtDate(dateTo)}`} bgColor={C.dangerLight} />
        <KPICard icon={<Warehouse size={20} color={C.warning} />} label="Valor Perdido" value={fmt(totalWasteValue)} sub="No período" bgColor={C.warningLight} />
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
          { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "quantity", label: "Qtd", render: v => <Badge color={C.danger} bg={C.dangerLight}>{v}</Badge> },
          { key: "wasteReason", label: "Causa", render: v => v || "—" },
          { key: "employee", label: "Responsável" },
        ]} data={filtered} />
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PORCIONAMENTO
   ═══════════════════════════════════════════ */
function PortioningTab({ items, setItems, employees, portioning, setPortioning, showToast }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const emptyForm = { itemId: "", quantity: "", employee: "", date: todayISO(), time: nowTime() };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => 
    portioning.filter(p => p.itemName.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.id - a.id)
  , [portioning, search]);

  const selectedItem = items.find(i => i.id === Number(form.itemId));

  const handleSave = async () => {
    if (!form.itemId || !form.quantity || !form.employee) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    
    const qty = Number(form.quantity);
    if (isNaN(qty) || qty <= 0) {
      showToast("Quantidade inválida", "error");
      return;
    }

    setSaving(true);
    await new Promise(r => setTimeout(r, 300));

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
    setSaving(false);
    setModalOpen(false);
    setForm({ ...emptyForm, date: todayISO(), time: nowTime() });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar..." />
        <Btn onClick={() => { setForm({ ...emptyForm, date: todayISO(), time: nowTime() }); setModalOpen(true); }} icon={<Scissors size={16} />}>Novo Porcionamento</Btn>
      </div>

      <Card>
        <DataTable columns={[
          { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
          { key: "itemName", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
          { key: "quantity", label: "Quantidade", render: v => <Badge color={C.accent} bg={C.accentLight}>{v}</Badge> },
          { key: "employee", label: "Responsável" },
        ]} data={filtered} />
      </Card>

      <Modal open={modalOpen} onClose={() => !saving && setModalOpen(false)} title="Novo Porcionamento">
        <Select label="Item" required options={items.map(i => ({ value: String(i.id), label: `${i.name} (${i.currentStock} disponível)` }))} value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })} />
        <Input label="Quantidade" required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <Select label="Responsável" required options={employees.filter(e => e.status === "Ativo").map(e => e.name)} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Btn>
          <Btn onClick={handleSave} icon={<Check size={16} />} loading={saving}>{saving ? "Salvando..." : "Confirmar"}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FUNCIONÁRIOS
   ═══════════════════════════════════════════ */
function EmployeesTab({ employees, setEmployees, showToast }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", username: "" });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase())), [employees, search]);

  const openAdd = () => { setEditing(null); setForm({ name: "", role: "", username: "" }); setModalOpen(true); };
  const openEdit = (emp) => { setEditing(emp); setForm({ name: emp.name, role: emp.role, username: emp.username }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name || !form.role || !form.username) {
      showToast("Preencha todos os campos", "error");
      return;
    }
    
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    
    if (editing) {
      setEmployees(prev => prev.map(e => e.id === editing.id ? { ...e, ...form } : e));
      showToast("✓ Funcionário atualizado!");
    } else {
      setEmployees(prev => [...prev, { id: nextId(prev), ...form, status: "Ativo" }]);
      showToast("✓ Funcionário cadastrado!");
    }
    setSaving(false);
    setModalOpen(false);
  };

  const toggleStatus = (emp) => {
    const newStatus = emp.status === "Ativo" ? "Inativo" : "Ativo";
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: newStatus } : e));
    showToast(`${emp.name} ${newStatus === "Ativo" ? "ativado" : "desativado"}!`, newStatus === "Ativo" ? "success" : "warning");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar funcionário..." />
        <Btn onClick={openAdd} icon={<Plus size={16} />}>Novo Funcionário</Btn>
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

      <Modal open={modalOpen} onClose={() => !saving && setModalOpen(false)} title={editing ? "Editar Funcionário" : "Novo Funcionário"}>
        <Input label="Nome Completo" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Select label="Cargo" required options={ROLES} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <Input label="Nome de Usuário" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Btn>
          <Btn onClick={handleSave} icon={<Check size={16} />} loading={saving}>{saving ? "Salvando..." : "Salvar"}</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RELATÓRIOS (Simplificado)
   ═══════════════════════════════════════════ */
function ReportsTab({ items, movements, portioning }) {
  const [reportType, setReportType] = useState("stock");

  const reports = [
    { id: "stock", label: "Estoque Atual", icon: <Package size={16} /> },
    { id: "movements", label: "Movimentações", icon: <RefreshCw size={16} /> },
    { id: "critical", label: "Itens Críticos", icon: <AlertTriangle size={16} /> },
  ];

  const handleDownload = () => {
    if (typeof window.XLSX === 'undefined') return;
    
    let data = [];
    let filename = "";

    switch (reportType) {
      case "stock":
        data = items.map(i => ({
          Item: i.name,
          Categoria: i.category,
          Unidade: i.unit,
          "Estoque Atual": i.currentStock,
          "Estoque Mínimo": i.minStock,
          "Custo Unitário": i.cost,
          "Valor Total": (i.currentStock * i.cost).toFixed(2)
        }));
        filename = "estoque_atual.xlsx";
        break;
      case "movements":
        data = movements.slice(-100).map(m => ({
          Tipo: m.type === "in" ? "Entrada" : "Saída",
          Data: fmtDate(m.date),
          Item: m.itemName,
          Quantidade: m.quantity,
          Responsável: m.employee
        }));
        filename = "movimentacoes.xlsx";
        break;
      case "critical":
        data = items.filter(i => i.currentStock <= i.minStock).map(i => ({
          Item: i.name,
          "Estoque Atual": i.currentStock,
          "Estoque Mínimo": i.minStock,
          Déficit: i.minStock - i.currentStock
        }));
        filename = "itens_criticos.xlsx";
        break;
    }

    if (data.length > 0) {
      const ws = window.XLSX.utils.json_to_sheet(data);
      const wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, ws, "Relatório");
      window.XLSX.writeFile(wb, filename);
    }
  };

  const renderReport = () => {
    switch (reportType) {
      case "stock":
        return (
          <DataTable columns={[
            { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
            { key: "category", label: "Categoria" },
            { key: "currentStock", label: "Estoque", render: (v, r) => <span style={{ fontWeight: 700, color: v <= r.minStock ? C.danger : C.success }}>{v}</span> },
            { key: "minStock", label: "Mínimo" },
            { key: "cost", label: "Valor Total", render: (v, r) => fmt(r.currentStock * v), nowrap: true },
          ]} data={items} />
        );
      case "movements":
        return (
          <DataTable columns={[
            { key: "type", label: "Tipo", render: v => v === "in" ? <Badge color={C.success} bg={C.successLight}>Entrada</Badge> : <Badge color={C.danger} bg={C.dangerLight}>Saída</Badge> },
            { key: "date", label: "Data", render: (v, r) => `${fmtDate(v)} ${r.time}`, nowrap: true },
            { key: "itemName", label: "Item" },
            { key: "quantity", label: "Qtd" },
            { key: "employee", label: "Responsável" },
          ]} data={movements.slice().reverse()} />
        );
      case "critical":
        const critical = items.filter(i => i.currentStock <= i.minStock);
        return (
          <DataTable columns={[
            { key: "name", label: "Item", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
            { key: "currentStock", label: "Estoque", render: v => <span style={{ color: C.danger, fontWeight: 700 }}>{v}</span> },
            { key: "minStock", label: "Mínimo" },
            { key: "supplier", label: "Fornecedor", render: v => v || "—" },
          ]} data={critical} />
        );
      default:
        return null;
    }
  };

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
            fontFamily: font
          }}>
            {r.icon}{r.label}
          </button>
        ))}
        <Btn onClick={handleDownload} variant="secondary" icon={<Download size={16} />}>Exportar Excel</Btn>
      </div>

      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay }}>{reports.find(r => r.id === reportType)?.label}</h3>
        </div>
        {renderReport()}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONFIGURAÇÕES
   ═══════════════════════════════════════════ */
function SettingsTab({ categories, setCategories, units, setUnits, showToast, onResetDb }) {
  const [newCat, setNewCat] = useState("");
  const [newUnit, setNewUnit] = useState("");
  
  const handleAddCategory = () => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Categoria já existe", "error");
      return;
    }
    setCategories([...categories, trimmed]);
    setNewCat("");
    showToast("✓ Categoria adicionada!");
  };
  
  const handleAddUnit = () => {
    const trimmed = newUnit.trim();
    if (!trimmed) return;
    if (units.some(u => u.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Unidade já existe", "error");
      return;
    }
    setUnits([...units, trimmed]);
    setNewUnit("");
    showToast("✓ Unidade adicionada!");
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
            style={{ ...inputStyle, flex: 1 }} 
          />
          <Btn onClick={handleAddCategory} icon={<Plus size={16} />}>Adicionar</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13 }}>{c}</span>
              <X size={14} style={{ cursor: "pointer", color: C.danger }} onClick={() => { setCategories(categories.filter(x => x !== c)); showToast("Categoria removida", "warning"); }} />
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
            style={{ ...inputStyle, flex: 1 }} 
          />
          <Btn onClick={handleAddUnit} icon={<Plus size={16} />}>Adicionar</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {units.map(u => (
            <div key={u} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13 }}>{u}</span>
              <X size={14} style={{ cursor: "pointer", color: C.danger }} onClick={() => { setUnits(units.filter(x => x !== u)); showToast("Unidade removida", "warning"); }} />
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Database size={20} color={C.success} />
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, margin: 0 }}>Banco de Dados</h3>
        </div>
        <div style={{ fontSize: 13, color: C.textSec, fontFamily: font, marginBottom: 16, lineHeight: 1.6 }}>
          <p style={{ marginBottom: 8 }}>✓ Dados salvos automaticamente</p>
          <p style={{ marginBottom: 8 }}>✓ Persistência entre sessões</p>
        </div>
      </Card>

      <Card style={{ padding: 24, border: `2px solid ${C.dangerLight}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <AlertTriangle size={20} color={C.danger} />
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: fontDisplay, margin: 0, color: C.danger }}>Zona de Perigo</h3>
        </div>
        <p style={{ fontSize: 13, color: C.textSec, marginBottom: 16 }}>
          Apaga todos os dados e restaura valores iniciais.
        </p>
        <Btn variant="danger" onClick={onResetDb} icon={<Trash2 size={16} />}>Resetar Banco de Dados</Btn>
      </Card>
    </div>
  );
}
