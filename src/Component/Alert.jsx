import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  ShieldAlert,
  Workflow,
  BrainCircuit,
  Server,
  Layers3,
  Activity,
  XCircle,
  Search,
  Filter,
  Check,
  X,
  ChevronRight,
  Clock3,
  Zap,
  ShieldCheck,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/* ================= PALETTE ================= */

const appPalette = {
  primaryAccent: "#7A1F2D",
  secondaryAccent: "#B4535F",
  background: "#FFFDFC",
  softBackground: "#F4EEE6",
  textPrimary: "#151112",
  textSecondary: "#675A55",
  border: "#D9B8B5",

  success: "#2E8B57",
  warning: "#E59E0B",
  error: "#DC2626",
  info: "#2563EB",

  whiteGlass: "rgba(255,255,255,0.75)",
  strongGlass: "rgba(255,255,255,0.90)",
  darkOverlay: "rgba(21,17,18,0.35)",
  softBorder: "rgba(217,184,181,0.45)",
  mutedBorder: "rgba(217,184,181,0.25)",
  strongBorder: "rgba(217,184,181,0.60)",

  primaryGlow: "rgba(122,31,45,0.18)",
  successGlow: "rgba(46,139,87,0.20)",
  warningGlow: "rgba(229,158,11,0.20)",
  errorGlow: "rgba(220,38,38,0.20)",
  infoGlow: "rgba(37,99,235,0.20)",
  cardShadow: "rgba(122,31,45,0.08)",
};

/* ================= DATA ================= */

const alertStats = [
  {
    title: "Critical Alerts",
    value: 3,
    change: "-2",
    icon: AlertTriangle,
    color: appPalette.error,
  },
  {
    title: "Warnings",
    value: 18,
    change: "+5",
    icon: AlertCircle,
    color: appPalette.warning,
  },
  {
    title: "Info Alerts",
    value: 124,
    change: "+12%",
    icon: Info,
    color: appPalette.info,
  },
  {
    title: "Resolved Today",
    value: 89,
    change: "+22%",
    icon: CheckCircle2,
    color: appPalette.success,
  },
  {
    title: "System Health",
    value: 96,
    suffix: "%",
    change: "+1.8%",
    icon: Server,
    color: appPalette.primaryAccent,
  },
];

const initialAlerts = [
  {
    id: 1,
    type: "Critical",
    title: "OCR failure detected in Invoice processing batch",
    description:
      "OCR workers failed checksum validation on invoice shard 3A. Retry queue has been triggered, but document extraction is paused for this batch.",
    time: "18 sec ago",
    severity: 98,
    source: "OCR",
    status: "Open",
    color: appPalette.error,
  },
  {
    id: 2,
    type: "Warning",
    title: "Queue latency exceeded threshold (1200+ documents)",
    description:
      "Inbound review queue crossed the configured soft threshold. Worker autoscaling is active but SLA headroom is dropping.",
    time: "1 min ago",
    severity: 78,
    source: "Queue",
    status: "Investigating",
    color: appPalette.warning,
  },
  {
    id: 3,
    type: "Info",
    title: "AI confidence dropped below 85% for KYC documents",
    description:
      "Confidence drift detected in the KYC extraction model for low-resolution uploads. Recommend review-routing adjustment.",
    time: "3 min ago",
    severity: 62,
    source: "AI",
    status: "Open",
    color: appPalette.info,
  },
  {
    id: 4,
    type: "Warning",
    title: "Workflow execution delayed due to worker overload",
    description:
      "Validation stage concurrency is saturated. 3 execution branches are waiting for compute allocation.",
    time: "6 min ago",
    severity: 74,
    source: "Workflow",
    status: "Open",
    color: appPalette.warning,
  },
  {
    id: 5,
    type: "Critical",
    title: "Unusual API spike detected in document uploads",
    description:
      "Traffic anomaly detected from upload endpoints. Rate limiting is holding, but ingestion burst exceeds predicted load.",
    time: "8 min ago",
    severity: 94,
    source: "API",
    status: "Escalated",
    color: appPalette.error,
  },
  {
    id: 6,
    type: "Info",
    title: "Manual review backlog increasing rapidly",
    description:
      "Human-review routing volume is up 14% over the last hour due to confidence degradation in one claims model.",
    time: "11 min ago",
    severity: 58,
    source: "Review",
    status: "Open",
    color: appPalette.info,
  },
  {
    id: 7,
    type: "Success",
    title: "Workflow recovery completed successfully",
    description:
      "Retry orchestration restored 92 delayed documents back into the active pipeline without data loss.",
    time: "14 min ago",
    severity: 35,
    source: "Workflow",
    status: "Resolved",
    color: appPalette.success,
  },
  {
    id: 8,
    type: "Security",
    title: "Unrecognized admin session blocked",
    description:
      "Behavioral policy blocked an access attempt from an untrusted fingerprint. Audit trail has been recorded.",
    time: "18 min ago",
    severity: 88,
    source: "Security",
    status: "Escalated",
    color: appPalette.primaryAccent,
  },
];

const alertFrequencyData = [
  { time: "09:00", critical: 2, warning: 6, info: 14, resolved: 8 },
  { time: "10:00", critical: 1, warning: 8, info: 16, resolved: 11 },
  { time: "11:00", critical: 3, warning: 12, info: 18, resolved: 15 },
  { time: "12:00", critical: 2, warning: 10, info: 20, resolved: 17 },
  { time: "13:00", critical: 4, warning: 14, info: 22, resolved: 19 },
  { time: "14:00", critical: 3, warning: 16, info: 21, resolved: 23 },
  { time: "15:00", critical: 3, warning: 18, info: 24, resolved: 26 },
];

const severityDistribution = [
  { name: "Critical", value: 3, color: appPalette.error },
  { name: "Warning", value: 18, color: appPalette.warning },
  { name: "Info", value: 124, color: appPalette.info },
  { name: "Success", value: 89, color: appPalette.success },
  { name: "Security", value: 7, color: appPalette.primaryAccent },
];

const resolutionTimeData = [
  { day: "Mon", minutes: 18 },
  { day: "Tue", minutes: 16 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 13 },
  { day: "Fri", minutes: 11 },
  { day: "Sat", minutes: 12 },
  { day: "Sun", minutes: 10 },
];

const moduleBreakdownData = [
  { module: "OCR", count: 19 },
  { module: "Workflow", count: 14 },
  { module: "AI", count: 11 },
  { module: "Queue", count: 18 },
  { module: "API", count: 8 },
  { module: "Security", count: 7 },
];

const queueCorrelationData = [
  { time: "09:00", queue: 820, alerts: 12 },
  { time: "10:00", queue: 910, alerts: 14 },
  { time: "11:00", queue: 1020, alerts: 18 },
  { time: "12:00", queue: 980, alerts: 16 },
  { time: "13:00", queue: 1100, alerts: 21 },
  { time: "14:00", queue: 1230, alerts: 24 },
  { time: "15:00", queue: 1205, alerts: 22 },
];

const systemHealth = [
  { label: "OCR Cluster", value: 94, color: appPalette.success, icon: Server },
  { label: "Queue Stability", value: 82, color: appPalette.warning, icon: Layers3 },
  { label: "AI Monitoring", value: 91, color: appPalette.info, icon: BrainCircuit },
  { label: "Incident Response", value: 96, color: appPalette.primaryAccent, icon: ShieldCheck },
];

const alertSuggestions = [
  {
    title: "Enable temporary OCR burst autoscaling",
    description: "Would reduce invoice batch recovery time by ~18%.",
    icon: Zap,
    color: appPalette.info,
  },
  {
    title: "Reroute low-confidence KYC docs to review pool B",
    description: "Can reduce queue pressure on current human review cluster.",
    icon: BrainCircuit,
    color: appPalette.warning,
  },
  {
    title: "Escalate API spike to security workflow",
    description: "Pattern similarity suggests traffic anomaly classification.",
    icon: ShieldAlert,
    color: appPalette.error,
  },
];

/* ================= HELPERS ================= */

function CountUp({ end, duration = 1200, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const easeOutQuart = (v) => 1 - Math.pow(1 - v, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutQuart(progress);
      setCount(eased * end);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-2xl border border-[#D9B8B5]/60 bg-white/90 px-4 py-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#181313]/90"
    >
      {label ? (
        <p className="mb-1 text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
          {label}
        </p>
      ) : null}

      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color || entry.payload?.color }}
          />
          <p className="text-sm font-bold text-[#151112] dark:text-white">
            {entry.name}: {Number(entry.value).toLocaleString()}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

function typeBadge(type) {
  switch (type) {
    case "Critical":
      return "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";
    case "Warning":
      return "bg-[#E59E0B]/10 text-[#E59E0B] border-[#E59E0B]/20";
    case "Info":
      return "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20";
    case "Success":
      return "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20";
    default:
      return "bg-[#7A1F2D]/10 text-[#7A1F2D] border-[#7A1F2D]/20";
  }
}

function statusBadge(status) {
  if (status === "Resolved") {
    return "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20";
  }
  if (status === "Escalated") {
    return "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";
  }
  if (status === "Investigating") {
    return "bg-[#E59E0B]/10 text-[#E59E0B] border-[#E59E0B]/20";
  }
  return "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20";
}

/* ================= UI PIECES ================= */

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl border border-[#D9B8B5]/40 bg-white/60"
          />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-[2rem] border border-[#D9B8B5]/40 bg-white/60" />
    </div>
  );
}

function Card({ eyebrow, title, icon: Icon, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] ${className}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112] dark:text-white">
            {title}
          </h3>
        </div>
        {Icon ? <Icon className="h-5 w-5 text-[#7A1F2D] dark:text-[#D9B8B5]" /> : null}
      </div>
      {children}
    </motion.div>
  );
}

function MetricCard({ item, index }) {
  const Icon = item.icon;
  const positive = item.change.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_16px_50px_rgba(122,31,45,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_24px_70px_rgba(122,31,45,0.14)] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: item.color }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${item.color}14`, color: item.color }}
        >
          <Icon className="h-5 w-5 stroke-[2.4]" />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
            positive ? "text-[#2E8B57]" : "text-[#DC2626]"
          }`}
          style={{
            backgroundColor: positive
              ? appPalette.successGlow
              : appPalette.errorGlow,
          }}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {item.change}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#675A55] dark:text-[#D9B8B5]">
          {item.title}
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-[#151112] dark:text-white">
          <CountUp end={item.value} suffix={item.suffix || ""} />
        </h3>
      </div>
    </motion.div>
  );
}

function AlertFeedItem({ alert, onResolve, onIgnore, onInspect, expanded, onToggle }) {
  const pulse = alert.type === "Critical";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-[#D9B8B5]/40 bg-white/80 p-4 shadow-[0_14px_40px_rgba(122,31,45,0.06)] transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_22px_60px_rgba(122,31,45,0.12)]"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${typeBadge(alert.type)}`}>
              {alert.type}
            </span>
            <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusBadge(alert.status)}`}>
              {alert.status}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EEE6]/80 px-2.5 py-1 text-xs font-bold text-[#675A55]">
              <Clock3 className="h-3.5 w-3.5" />
              {alert.time}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F4EEE6]/80 px-2.5 py-1 text-xs font-bold text-[#675A55]">
              {alert.source}
            </span>
          </div>

          <div className="mt-3 flex items-start gap-3">
            <div className="mt-1">
              <span className="relative flex h-3 w-3">
                {pulse ? (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                    style={{ backgroundColor: alert.color }}
                  />
                ) : null}
                <span
                  className="relative inline-flex h-3 w-3 rounded-full"
                  style={{ backgroundColor: alert.color }}
                />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-[#151112]">{alert.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#675A55]">
                {expanded ? alert.description : `${alert.description.slice(0, 112)}...`}
              </p>

              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#675A55]">
                  <span>Severity</span>
                  <span>{alert.severity}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/25">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.severity}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: alert.color }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 xl:justify-end">
          <button
            onClick={onToggle}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white px-3 text-xs font-black text-[#675A55] hover:bg-[#F4EEE6]"
          >
            Details
            <ChevronRight
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </button>

          <button
            onClick={onInspect}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white px-3 text-xs font-black text-[#7A1F2D] hover:bg-[#F4EEE6]"
          >
            Investigate
          </button>

          <button
            onClick={onIgnore}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white px-3 text-xs font-black text-[#675A55] hover:bg-[#F4EEE6]"
          >
            Ignore
          </button>

          <button
            onClick={onResolve}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2E8B57] px-3 text-xs font-black text-white shadow-md shadow-[#2E8B57]/20 hover:bg-[#28784C]"
          >
            <Check className="h-4 w-4" />
            Resolve
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AlertDrawer({ alert, onClose, onResolve }) {
  return (
    <AnimatePresence>
      {alert ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[#151112]/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl overflow-y-auto border-l border-[#D9B8B5] bg-[#FFFDFC] p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${typeBadge(alert.type)}`}>
                  {alert.type}
                </span>
                <h3 className="mt-3 text-2xl font-black text-[#151112]">
                  {alert.title}
                </h3>
                <p className="mt-1 text-sm text-[#675A55]">
                  Source: {alert.source} • {alert.time}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#675A55] hover:bg-[#F4EEE6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5">
              <p className="text-sm leading-7 text-[#675A55]">{alert.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                    Severity
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#151112]">
                    {alert.severity}%
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                    Status
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#151112]">
                    {alert.status}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#F4EEE6]/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                  Auto-resolution suggestion
                </p>
                <p className="mt-2 text-sm font-semibold text-[#151112]">
                  Scale OCR workers by 2 and reroute low-confidence invoices to fallback extraction policy.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 mt-6 flex gap-3 border-t border-[#D9B8B5]/50 bg-[#FFFDFC]/90 py-4 backdrop-blur-xl">
              <button
                onClick={onClose}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white text-sm font-black text-[#675A55] hover:bg-[#F4EEE6]"
              >
                Close
              </button>

              <button
                onClick={() => onResolve(alert.id)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2E8B57] text-sm font-black text-white shadow-lg shadow-[#2E8B57]/20 hover:bg-[#28784C]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark Resolved
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ================= MAIN ================= */

export default function AlertsNotificationsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const liveTimer = window.setInterval(() => {
      setToast("Live alert stream refreshed");
      window.setTimeout(() => setToast(""), 1800);
    }, 12000);

    return () => window.clearInterval(liveTimer);
  }, []);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesQuery =
        alert.title.toLowerCase().includes(query.toLowerCase()) ||
        alert.description.toLowerCase().includes(query.toLowerCase()) ||
        alert.source.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = filter === "All" ? true : alert.type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [alerts, query, filter]);

  const handleResolve = (id) => {
    setAlerts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Resolved", type: "Success", color: appPalette.success } : item
      )
    );
    setSelectedAlert(null);
    setToast("Alert resolved");
    window.setTimeout(() => setToast(""), 1800);
  };

  const handleIgnore = (id) => {
    setAlerts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Ignored" } : item
      )
    );
    setToast("Alert ignored");
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <section className="min-h-screen w-full bg-[#FFFDFC] p-4 text-[#151112] transition-colors duration-300 dark:bg-[#110D0E] dark:text-white sm:p-6">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            className="fixed right-5 top-5 z-[70] rounded-2xl border border-[#D9B8B5] bg-white/90 px-4 py-3 text-sm font-black text-[#151112] shadow-2xl backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[1700px]"
          >
            <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-[#D9B8B5]/35 bg-[#FFFDFC]/85 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-[#110D0E]/85 sm:-mx-6 sm:px-6">
              <div className="mx-auto flex max-w-[1700px] flex-col justify-between gap-4 xl:flex-row xl:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/60 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#7A1F2D] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-[#D9B8B5]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DC2626] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#DC2626]" />
                    </span>
                    Mission-critical alert monitoring
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight text-[#151112] dark:text-white sm:text-3xl lg:text-4xl">
                    Alerts & Notifications Dashboard
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675A55] dark:text-[#D9B8B5]">
                    Monitor system failures, queue pressure, AI anomalies,
                    security events, and live operational signals across your
                    document processing platform.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-11 items-center gap-2 rounded-xl border border-[#D9B8B5] bg-white/75 px-3 shadow-sm backdrop-blur-xl focus-within:border-[#7A1F2D] focus-within:ring-4 focus-within:ring-[#D9B8B5]/40">
                    <Search className="h-4 w-4 text-[#7A1F2D]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search alerts, modules..."
                      className="w-full min-w-[220px] bg-transparent text-sm text-[#151112] outline-none placeholder:text-[#675A55]"
                    />
                  </div>

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-11 rounded-xl border border-[#D9B8B5] bg-white/75 px-3 text-sm font-bold text-[#675A55] shadow-sm outline-none focus:border-[#7A1F2D] focus:ring-4 focus:ring-[#D9B8B5]/40"
                  >
                    <option>All</option>
                    <option>Critical</option>
                    <option>Warning</option>
                    <option>Info</option>
                    <option>Success</option>
                    <option>Security</option>
                  </select>

                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#7A1F2D] px-4 text-sm font-black text-white shadow-md shadow-[#7A1F2D]/20 hover:bg-[#5F1723]">
                    <Filter className="h-4 w-4" />
                    Smart Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              {alertStats.map((item, index) => {
                const Icon = item.icon;
                const positive = item.change.startsWith("+");

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.015 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_16px_50px_rgba(122,31,45,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_24px_70px_rgba(122,31,45,0.14)]"
                  >
                    <div
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                      style={{ backgroundColor: item.color }}
                    />

                    <div className="relative flex items-start justify-between">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${item.color}14`, color: item.color }}
                      >
                        <Icon className="h-5 w-5 stroke-[2.4]" />
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
                          positive ? "text-[#2E8B57]" : "text-[#DC2626]"
                        }`}
                        style={{
                          backgroundColor: positive
                            ? appPalette.successGlow
                            : appPalette.errorGlow,
                        }}
                      >
                        {positive ? (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5" />
                        )}
                        {item.change}
                      </span>
                    </div>

                    <div className="relative mt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#675A55]">
                        {item.title}
                      </p>
                      <h3 className="mt-2 text-3xl font-black tracking-tight text-[#151112]">
                        <CountUp end={item.value} suffix={item.suffix || ""} />
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Live Alerts Feed" title="Real-Time Alert Stream" icon={Bell} className="xl:col-span-2">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <button className="rounded-full bg-[#DC2626]/10 px-3 py-1.5 text-xs font-black text-[#DC2626]">
                    Critical first
                  </button>
                  <button className="rounded-full bg-[#F4EEE6] px-3 py-1.5 text-xs font-black text-[#675A55]">
                    Latest first
                  </button>
                  <button className="rounded-full bg-[#F4EEE6] px-3 py-1.5 text-xs font-black text-[#675A55]">
                    Group by module
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {filteredAlerts.map((alert) => (
                      <AlertFeedItem
                        key={alert.id}
                        alert={alert}
                        expanded={expandedId === alert.id}
                        onToggle={() =>
                          setExpandedId((current) =>
                            current === alert.id ? null : alert.id
                          )
                        }
                        onResolve={() => handleResolve(alert.id)}
                        onIgnore={() => handleIgnore(alert.id)}
                        onInspect={() => setSelectedAlert(alert)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </Card>

              <div className="space-y-6">
                <Card eyebrow="Severity Distribution" title="Alert Mix" icon={Activity}>
                  <div className="relative h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          {severityDistribution.map((item, index) => (
                            <linearGradient
                              key={item.name}
                              id={`severityGrad-${index}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor={item.color} stopOpacity={0.95} />
                              <stop offset="100%" stopColor={item.color} stopOpacity={0.45} />
                            </linearGradient>
                          ))}
                        </defs>

                        <Pie
                          data={severityDistribution}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={72}
                          outerRadius={108}
                          paddingAngle={3}
                          cornerRadius={10}
                          animationDuration={1200}
                        >
                          {severityDistribution.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={`url(#severityGrad-${index})`}
                              stroke="rgba(255,255,255,0.75)"
                              strokeWidth={3}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#675A55]">
                        Total
                      </p>
                      <p className="mt-1 text-2xl font-black">241</p>
                    </div>
                  </div>
                </Card>

                <Card eyebrow="AI Suggestions" title="Auto-Resolution" icon={BrainCircuit}>
                  <div className="space-y-3">
                    {alertSuggestions.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.05 }}
                          className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4"
                        >
                          <div className="flex gap-3">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                              style={{ backgroundColor: `${item.color}14`, color: item.color }}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-[#151112]">{item.title}</p>
                              <p className="mt-1 text-xs leading-5 text-[#675A55]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Alert Frequency" title="Frequency Over Time" icon={Bell} className="xl:col-span-2">
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={alertFrequencyData}>
                    <defs>
                      <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.error} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={appPalette.error} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="warningGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.warning} stopOpacity={0.22} />
                        <stop offset="100%" stopColor={appPalette.warning} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="warning"
                      name="Warnings"
                      stroke={appPalette.warning}
                      strokeWidth={3}
                      fill="url(#warningGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="critical"
                      name="Critical"
                      stroke={appPalette.error}
                      strokeWidth={3}
                      fill="url(#criticalGrad)"
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved"
                      stroke={appPalette.success}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.success, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="System Health" title="Operational Status" icon={Server}>
                <div className="space-y-4">
                  {systemHealth.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: `${item.color}14`, color: item.color }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-lg font-black text-[#151112]">
                            {item.value}%
                          </span>
                        </div>
                        <p className="mb-2 text-xs font-bold text-[#675A55]">{item.label}</p>
                        <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/25">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 0.8, delay: index * 0.04 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Incident Resolution" title="Resolution Time Trend" icon={RefreshCcw}>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={resolutionTimeData}>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      name="Resolution Time"
                      stroke={appPalette.primaryAccent}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.primaryAccent, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="Module Breakdown" title="Alert Sources" icon={Workflow}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={moduleBreakdownData}>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="module"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Alerts" fill={appPalette.primaryAccent} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="Queue Correlation" title="Queue vs Alerts" icon={Layers3}>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={queueCorrelationData}>
                    <defs>
                      <linearGradient id="queueCorrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.warning} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={appPalette.warning} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="queue"
                      name="Queue"
                      stroke={appPalette.warning}
                      strokeWidth={3}
                      fill="url(#queueCorrGrad)"
                    />
                    <Line
                      type="monotone"
                      dataKey="alerts"
                      name="Alerts"
                      stroke={appPalette.error}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.error, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <AlertDrawer
              alert={selectedAlert}
              onClose={() => setSelectedAlert(null)}
              onResolve={handleResolve}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}