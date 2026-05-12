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
  FileBarChart,
  BarChart3,
  ScanLine,
  BrainCircuit,
  Workflow,
  ShieldCheck,
  Gauge,
  AlertTriangle,
  Wallet,
  Download,
  CalendarClock,
  BadgeCheck,
  Search,
  Filter,
  Sparkles,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Share2,
  CheckCircle2,
  Activity,
  Database,
  Users,
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

const reportsStats = [
  {
    title: "Generated Reports",
    value: 842,
    change: "+18%",
    icon: FileBarChart,
    color: appPalette.primaryAccent,
  },
  {
    title: "OCR Accuracy",
    value: 97,
    suffix: "%",
    change: "+2.4%",
    icon: ScanLine,
    color: appPalette.success,
  },
  {
    title: "AI Confidence",
    value: 94,
    suffix: "%",
    change: "+1.8%",
    icon: BrainCircuit,
    color: appPalette.info,
  },
  {
    title: "Workflow Efficiency",
    value: 91,
    suffix: "%",
    change: "+4%",
    icon: Workflow,
    color: appPalette.secondaryAccent,
  },
  {
    title: "Audit Compliance",
    value: 99,
    suffix: "%",
    change: "+0.6%",
    icon: ShieldCheck,
    color: appPalette.warning,
  },
  {
    title: "System Failures",
    value: 12,
    change: "-14%",
    icon: AlertTriangle,
    color: appPalette.error,
  },
];

const executiveSummary = [
  {
    title: "Total Documents Processed",
    value: 24389,
    icon: FileText,
    color: appPalette.primaryAccent,
  },
  {
    title: "Monthly Growth Rate",
    value: 18.4,
    suffix: "%",
    icon: ArrowUpRight,
    color: appPalette.success,
  },
  {
    title: "OCR Performance Score",
    value: 97,
    suffix: "%",
    icon: ScanLine,
    color: appPalette.success,
  },
  {
    title: "AI Automation Rate",
    value: 94,
    suffix: "%",
    icon: BrainCircuit,
    color: appPalette.info,
  },
  {
    title: "Average Processing Time",
    value: 2.4,
    suffix: "m",
    decimals: 1,
    icon: Clock3,
    color: appPalette.secondaryAccent,
  },
  {
    title: "Human Review Reduction",
    value: 14,
    suffix: "%",
    icon: Users,
    color: appPalette.warning,
  },
  {
    title: "Revenue Impact",
    value: 184000,
    prefix: "$",
    icon: Wallet,
    color: appPalette.primaryAccent,
  },
  {
    title: "Cost Savings",
    value: 52400,
    prefix: "$",
    icon: BadgeCheck,
    color: appPalette.success,
  },
];

const processingTrendData = [
  { month: "Jan", processed: 12400, forecast: 13000, failed: 210 },
  { month: "Feb", processed: 13800, forecast: 14250, failed: 195 },
  { month: "Mar", processed: 15200, forecast: 15600, failed: 182 },
  { month: "Apr", processed: 17100, forecast: 17650, failed: 165 },
  { month: "May", processed: 19600, forecast: 20200, failed: 144 },
  { month: "Jun", processed: 22300, forecast: 22900, failed: 126 },
  { month: "Jul", processed: 24389, forecast: 24800, failed: 112 },
];

const workflowDistribution = [
  { name: "Invoices", value: 8420, color: appPalette.primaryAccent },
  { name: "KYC", value: 3920, color: appPalette.info },
  { name: "Contracts", value: 2180, color: appPalette.secondaryAccent },
  { name: "Claims", value: 1630, color: appPalette.warning },
  { name: "Tax Forms", value: 1240, color: appPalette.success },
  { name: "Other", value: 999, color: appPalette.error },
];

const documentTypeVolume = [
  { day: "Mon", invoices: 4100, bank: 1900, ids: 1300 },
  { day: "Tue", invoices: 4600, bank: 2200, ids: 1450 },
  { day: "Wed", invoices: 5300, bank: 2500, ids: 1700 },
  { day: "Thu", invoices: 5900, bank: 2800, ids: 1860 },
  { day: "Fri", invoices: 6400, bank: 3000, ids: 2050 },
  { day: "Sat", invoices: 4900, bank: 2100, ids: 1620 },
  { day: "Sun", invoices: 4300, bank: 1800, ids: 1410 },
];

const confidenceTrendData = [
  { label: "Mon", confidence: 88, ocr: 93, workflow: 86 },
  { label: "Tue", confidence: 91, ocr: 94, workflow: 88 },
  { label: "Wed", confidence: 90, ocr: 95, workflow: 89 },
  { label: "Thu", confidence: 92, ocr: 96, workflow: 90 },
  { label: "Fri", confidence: 94, ocr: 97, workflow: 91 },
  { label: "Sat", confidence: 93, ocr: 96, workflow: 90 },
  { label: "Sun", confidence: 95, ocr: 98, workflow: 92 },
];

const heatmapData = [
  [92, 94, 91, 89, 95, 96, 94],
  [96, 97, 95, 93, 94, 98, 99],
  [91, 92, 90, 88, 89, 91, 92],
  [94, 95, 96, 95, 97, 98, 97],
  [89, 91, 92, 90, 93, 94, 95],
];

const reviewCompletionData = [
  { week: "W1", reviewed: 620, completed: 540 },
  { week: "W2", reviewed: 710, completed: 648 },
  { week: "W3", reviewed: 790, completed: 720 },
  { week: "W4", reviewed: 840, completed: 792 },
  { week: "W5", reviewed: 910, completed: 861 },
];

const failureAnalysisData = [
  { label: "OCR", failures: 28 },
  { label: "Validation", failures: 19 },
  { label: "Extraction", failures: 14 },
  { label: "Workflow", failures: 9 },
  { label: "Export", failures: 5 },
];

const slaTrendData = [
  { month: "Jan", compliance: 93 },
  { month: "Feb", compliance: 95 },
  { month: "Mar", compliance: 96 },
  { month: "Apr", compliance: 97 },
  { month: "May", compliance: 98 },
  { month: "Jun", compliance: 99 },
];

const costThroughputData = [
  { month: "Jan", cost: 18200, throughput: 12400 },
  { month: "Feb", cost: 19100, throughput: 13800 },
  { month: "Mar", cost: 20400, throughput: 15200 },
  { month: "Apr", cost: 22100, throughput: 17100 },
  { month: "May", cost: 23800, throughput: 19600 },
  { month: "Jun", cost: 25400, throughput: 22300 },
  { month: "Jul", cost: 26800, throughput: 24389 },
];

const storageGrowthData = [
  { month: "Jan", storage: 180 },
  { month: "Feb", storage: 240 },
  { month: "Mar", storage: 318 },
  { month: "Apr", storage: 406 },
  { month: "May", storage: 498 },
  { month: "Jun", storage: 612 },
  { month: "Jul", storage: 701 },
];

const reportHistory = [
  {
    name: "Daily Processing Report",
    status: "Completed",
    version: "v2.3",
    team: "Operations",
    generatedAt: "Today, 3:12 PM",
  },
  {
    name: "OCR Accuracy Report",
    status: "Scheduled",
    version: "v1.9",
    team: "AI Quality",
    generatedAt: "Today, 6:00 PM",
  },
  {
    name: "SLA Compliance Report",
    status: "Completed",
    version: "v3.1",
    team: "Compliance",
    generatedAt: "Today, 1:24 PM",
  },
  {
    name: "Financial Cost Analysis",
    status: "Review",
    version: "v1.4",
    team: "Finance",
    generatedAt: "Yesterday, 8:48 PM",
  },
  {
    name: "Audit & Compliance Summary",
    status: "Completed",
    version: "v4.0",
    team: "Security",
    generatedAt: "Yesterday, 5:09 PM",
  },
];

const aiInsights = [
  {
    title: "OCR performance improved by 2.4% this week",
    description: "Confidence gain was strongest in invoice and tax workflows.",
    color: appPalette.success,
    icon: ScanLine,
  },
  {
    title: "Invoice workflows processed 18% faster",
    description: "Automation rules reduced validation bottlenecks during peak hours.",
    color: appPalette.primaryAccent,
    icon: Workflow,
  },
  {
    title: "Manual review queue reduced significantly",
    description: "Reviewer escalations dropped across KYC and banking documents.",
    color: appPalette.info,
    icon: Users,
  },
  {
    title: "Peak system load detected at 3 PM",
    description: "Throughput spiked above monthly forecast by 11.2%.",
    color: appPalette.warning,
    icon: Activity,
  },
  {
    title: "AI confidence increased for KYC documents",
    description: "Document structure detection improved with latest extraction model.",
    color: appPalette.secondaryAccent,
    icon: BrainCircuit,
  },
];

const auditTimeline = [
  {
    title: "Compliance policy version updated",
    time: "2 hours ago",
    tone: appPalette.primaryAccent,
  },
  {
    title: "Role-based report access reviewed",
    time: "4 hours ago",
    tone: appPalette.success,
  },
  {
    title: "Reviewer activity audit exported",
    time: "Yesterday",
    tone: appPalette.info,
  },
  {
    title: "Security anomaly acknowledged",
    time: "Yesterday",
    tone: appPalette.warning,
  },
];

/* ================= HELPERS ================= */

function CountUp({
  end,
  duration = 1300,
  suffix = "",
  prefix = "",
  decimals = 0,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

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

  const value =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}
      {value}
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
      {label && (
        <p className="mb-1 text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
          {label}
        </p>
      )}
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

function statusTone(status) {
  if (status === "Completed") {
    return "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20";
  }
  if (status === "Scheduled" || status === "Review") {
    return "bg-[#E59E0B]/10 text-[#E59E0B] border-[#E59E0B]/20";
  }
  return "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20";
}

function heatmapClass(value) {
  if (value >= 96) return "bg-[#2E8B57]";
  if (value >= 93) return "bg-[#2563EB]";
  if (value >= 90) return "bg-[#E59E0B]";
  return "bg-[#DC2626]";
}

/* ================= UI COMPONENTS ================= */

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
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

function SummaryMiniCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/75 p-4"
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${item.color}14`, color: item.color }}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="text-xs font-semibold text-[#675A55]">{item.title}</p>
      <p className="mt-1 text-xl font-black text-[#151112]">
        <CountUp
          end={item.value}
          suffix={item.suffix || ""}
          prefix={item.prefix || ""}
          decimals={item.decimals || 0}
        />
      </p>
    </motion.div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function ReportsInsightsDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const totalReports = useMemo(() => reportsStats[0].value, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#FFFDFC] p-4 text-[#151112] transition-colors duration-300 dark:bg-[#110D0E] dark:text-white sm:p-6">
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
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E8B57] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
                    </span>
                    Executive reporting center
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight text-[#151112] dark:text-white sm:text-3xl lg:text-4xl">
                    Reports & Insights Dashboard
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675A55] dark:text-[#D9B8B5]">
                    Analyze performance, compliance, OCR quality, AI confidence,
                    costs, workflow efficiency, and audit readiness across your
                    AI-powered document processing system.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white/75 px-4 text-sm font-bold text-[#675A55] shadow-sm backdrop-blur-xl hover:bg-[#F4EEE6]">
                    <Search className="h-4 w-4 text-[#7A1F2D]" />
                    Search reports
                  </button>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white/75 px-4 text-sm font-bold text-[#675A55] shadow-sm backdrop-blur-xl hover:bg-[#F4EEE6]">
                    <Filter className="h-4 w-4 text-[#7A1F2D]" />
                    Filters
                  </button>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#7A1F2D] px-4 text-sm font-bold text-white shadow-md shadow-[#7A1F2D]/20 hover:bg-[#5F1723]">
                    <Download className="h-4 w-4" />
                    Export Center
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              {reportsStats.map((item, index) => (
                <MetricCard key={item.title} item={item} index={index} />
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Executive Summary" title="Business Snapshot" icon={BarChart3} className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {executiveSummary.map((item, index) => (
                    <SummaryMiniCard key={item.title} item={item} index={index} />
                  ))}
                </div>

                <div className="mt-6 h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processingTrendData}>
                      <defs>
                        <linearGradient id="processingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={appPalette.primaryAccent} stopOpacity={0.34} />
                          <stop offset="100%" stopColor={appPalette.primaryAccent} stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={appPalette.info} stopOpacity={0.18} />
                          <stop offset="100%" stopColor={appPalette.info} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="rgba(217,184,181,0.32)"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
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
                        dataKey="forecast"
                        name="Forecast"
                        stroke={appPalette.info}
                        strokeWidth={2.5}
                        strokeDasharray="6 6"
                        fill="url(#forecastGradient)"
                        animationDuration={1300}
                      />
                      <Area
                        type="monotone"
                        dataKey="processed"
                        name="Processed"
                        stroke={appPalette.primaryAccent}
                        strokeWidth={3.5}
                        fill="url(#processingGradient)"
                        animationDuration={1100}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card eyebrow="Export & Scheduled Reports" title="Report Actions" icon={Download}>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/75 p-4">
                    <p className="text-sm font-black text-[#151112]">Generated Reports</p>
                    <p className="mt-1 text-2xl font-black text-[#7A1F2D]">
                      <CountUp end={totalReports} />
                    </p>
                  </div>

                  <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#7A1F2D] text-sm font-black text-white shadow-md shadow-[#7A1F2D]/20 hover:bg-[#5F1723]">
                    <Download className="h-4 w-4" />
                    Export PDF / CSV / Excel
                  </button>

                  <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white text-sm font-black text-[#675A55] hover:bg-[#F4EEE6]">
                    <CalendarClock className="h-4 w-4 text-[#7A1F2D]" />
                    Schedule Automated Report
                  </button>

                  <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-white text-sm font-black text-[#675A55] hover:bg-[#F4EEE6]">
                    <Share2 className="h-4 w-4 text-[#7A1F2D]" />
                    Share with Team
                  </button>
                </div>
              </Card>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Workflow Distribution" title="Workflow Mix" icon={Workflow}>
                <div className="relative h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {workflowDistribution.map((item, index) => (
                          <linearGradient
                            key={item.name}
                            id={`workflowGrad-${index}`}
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
                        data={workflowDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={76}
                        outerRadius={112}
                        paddingAngle={3}
                        cornerRadius={10}
                        animationDuration={1200}
                      >
                        {workflowDistribution.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={`url(#workflowGrad-${index})`}
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
                      Workflows
                    </p>
                    <p className="mt-1 text-2xl font-black">19,389</p>
                  </div>
                </div>
              </Card>

              <Card eyebrow="Usage & Volume Reports" title="Document Type Volume" icon={Database} className="xl:col-span-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={documentTypeVolume}>
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
                    <Bar dataKey="invoices" name="Invoices" stackId="a" fill={appPalette.primaryAccent} radius={[8, 8, 0, 0]} />
                    <Bar dataKey="bank" name="Bank Statements" stackId="a" fill={appPalette.secondaryAccent} />
                    <Bar dataKey="ids" name="Identity Docs" stackId="a" fill={appPalette.info} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="AI Confidence Reports" title="Confidence & OCR Trend" icon={BrainCircuit}>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={confidenceTrendData}>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      domain={[80, 100]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      name="AI Confidence"
                      stroke={appPalette.info}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.info, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ocr"
                      name="OCR"
                      stroke={appPalette.success}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.success, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="workflow"
                      name="Workflow Efficiency"
                      stroke={appPalette.secondaryAccent}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.secondaryAccent, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="OCR Accuracy Reports" title="Processing Activity Heatmap" icon={ScanLine}>
                <div className="space-y-3">
                  <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2">
                    <div />
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center text-[11px] font-bold text-[#675A55]">
                        {day}
                      </div>
                    ))}
                  </div>

                  {heatmapData.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-[80px_repeat(7,1fr)] gap-2">
                      <div className="flex items-center text-xs font-bold text-[#675A55]">
                        {["OCR", "AI", "Review", "SLA", "Audit"][rowIndex]}
                      </div>
                      {row.map((value, index) => (
                        <div
                          key={`${rowIndex}-${index}`}
                          className={`flex h-10 items-center justify-center rounded-xl text-xs font-black text-white ${heatmapClass(
                            value
                          )}`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>

              <Card eyebrow="Manual Review Reports" title="Review Completion Analytics" icon={Users}>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={reviewCompletionData}>
                    <defs>
                      <linearGradient id="reviewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.warning} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={appPalette.warning} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="completeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.success} stopOpacity={0.26} />
                        <stop offset="100%" stopColor={appPalette.success} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
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
                      dataKey="reviewed"
                      name="Reviewed"
                      stroke={appPalette.warning}
                      strokeWidth={3}
                      fill="url(#reviewGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      name="Completed"
                      stroke={appPalette.success}
                      strokeWidth={3}
                      fill="url(#completeGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Failure & Error Analysis" title="Failure Breakdown" icon={AlertTriangle}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={failureAnalysisData}>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
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
                    <Bar dataKey="failures" name="Failures" fill={appPalette.error} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="SLA Performance Reports" title="Compliance Trend" icon={Gauge}>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={slaTrendData}>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      domain={[90, 100]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="compliance"
                      name="Compliance"
                      stroke={appPalette.success}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.success, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="Financial & Cost Reports" title="Cost vs Throughput" icon={Wallet}>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={costThroughputData}>
                    <defs>
                      <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.secondaryAccent} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={appPalette.secondaryAccent} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
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
                      dataKey="cost"
                      name="Cost"
                      stroke={appPalette.secondaryAccent}
                      strokeWidth={3}
                      fill="url(#costGrad)"
                    />
                    <Line
                      type="monotone"
                      dataKey="throughput"
                      name="Throughput"
                      stroke={appPalette.primaryAccent}
                      strokeWidth={3}
                      dot={{ r: 4, fill: appPalette.primaryAccent, stroke: appPalette.background, strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Storage Usage Reports" title="Storage Growth" icon={Database}>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={storageGrowthData}>
                    <defs>
                      <linearGradient id="storageGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={appPalette.info} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={appPalette.info} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(217,184,181,0.32)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
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
                      dataKey="storage"
                      name="Storage GB"
                      stroke={appPalette.info}
                      strokeWidth={3}
                      fill="url(#storageGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card eyebrow="AI Insights Panel" title="Smart Insights" icon={Sparkles}>
                <div className="space-y-3">
                  {aiInsights.map((item, index) => {
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

              <Card eyebrow="Compliance & Audit Reports" title="Audit Timeline" icon={ShieldCheck}>
                <div className="space-y-4">
                  {auditTimeline.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="flex gap-3"
                    >
                      <div className="mt-1">
                        <span
                          className="block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.tone }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#151112]">{item.title}</p>
                        <p className="mt-1 text-xs text-[#675A55]">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-4 rounded-2xl border border-[#2E8B57]/20 bg-[#2E8B57]/8 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2E8B57]" />
                      <p className="text-sm font-black text-[#151112]">
                        Regulatory compliance status healthy
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card eyebrow="Report History" title="Generated Reports Table" icon={FileBarChart} className="xl:col-span-2">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#D9B8B5]/35 bg-[#F4EEE6]/55">
                        {["Report", "Status", "Version", "Team", "Generated", "Actions"].map(
                          (head) => (
                            <th
                              key={head}
                              className="px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]"
                            >
                              {head}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {reportHistory.map((item, index) => (
                        <motion.tr
                          key={item.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          className="border-b border-[#D9B8B5]/25 hover:bg-[#F4EEE6]/45"
                        >
                          <td className="px-4 py-4">
                            <p className="text-sm font-black text-[#151112]">{item.name}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusTone(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-[#675A55]">
                            {item.version}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-[#675A55]">
                            {item.team}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-[#675A55]">
                            {item.generatedAt}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#7A1F2D] hover:bg-[#F4EEE6]">
                                <Download className="h-4 w-4" />
                              </button>
                              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#7A1F2D] hover:bg-[#F4EEE6]">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card eyebrow="Scheduled Reports" title="Automation Center" icon={CalendarClock}>
                <div className="space-y-3">
                  {[
                    {
                      title: "Daily Processing Report",
                      time: "Every day at 6:00 PM",
                      status: "Scheduled",
                    },
                    {
                      title: "Weekly OCR Accuracy Report",
                      time: "Mondays at 9:00 AM",
                      status: "Scheduled",
                    },
                    {
                      title: "Monthly Cost Analysis",
                      time: "1st of each month",
                      status: "Review",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-[#151112]">{item.title}</p>
                          <p className="mt-1 text-xs text-[#675A55]">{item.time}</p>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusTone(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}