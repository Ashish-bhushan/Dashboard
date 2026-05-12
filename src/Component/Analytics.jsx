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
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import {
  BarChart3,
  ScanLine,
  FileText,
  BrainCircuit,
  Layers3,
  Database,
  BadgeCheck,
  AlertTriangle,
  Activity,
  Gauge,
  ClipboardList,
  TrendingUp,
  Server,
  Cpu,
  Clock3,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  HardDrive,
  Workflow,
} from "lucide-react";

/* ================= COLOR PALETTE ================= */

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

const analyticsStats = [
  {
    title: "Documents Processed",
    value: 24389,
    change: "+18.4%",
    icon: FileText,
    color: appPalette.primaryAccent,
  },
  {
    title: "OCR Accuracy",
    value: 97,
    suffix: "%",
    change: "+2.1%",
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
    title: "Processing Speed",
    value: 860,
    suffix: "/min",
    change: "+12%",
    icon: Gauge,
    color: appPalette.secondaryAccent,
  },
  {
    title: "Pending Queue",
    value: 1253,
    change: "-6%",
    icon: Layers3,
    color: appPalette.warning,
  },
  {
    title: "Failed Documents",
    value: 112,
    change: "-14%",
    icon: AlertTriangle,
    color: appPalette.error,
  },
];

const throughputData = [
  { time: "08:00", processed: 2800, predicted: 3000, failed: 42 },
  { time: "09:00", processed: 3900, predicted: 4100, failed: 38 },
  { time: "10:00", processed: 5200, predicted: 5450, failed: 51 },
  { time: "11:00", processed: 4800, predicted: 5100, failed: 36 },
  { time: "12:00", processed: 6100, predicted: 6350, failed: 47 },
  { time: "13:00", processed: 7400, predicted: 7700, failed: 55 },
  { time: "14:00", processed: 6900, predicted: 7200, failed: 43 },
  { time: "15:00", processed: 8721, predicted: 9000, failed: 61 },
];

const statusDistribution = [
  { name: "Processed", value: 14980, color: appPalette.success },
  { name: "Processing", value: 6280, color: appPalette.info },
  { name: "Queued", value: 1253, color: appPalette.warning },
  { name: "Review", value: 764, color: appPalette.secondaryAccent },
  { name: "Failed", value: 112, color: appPalette.error },
];

const dailyVolumeData = [
  { day: "Mon", invoices: 4200, contracts: 1800, ids: 1200 },
  { day: "Tue", invoices: 5100, contracts: 2200, ids: 1400 },
  { day: "Wed", invoices: 4700, contracts: 2600, ids: 1650 },
  { day: "Thu", invoices: 6200, contracts: 3100, ids: 1900 },
  { day: "Fri", invoices: 7400, contracts: 3600, ids: 2300 },
  { day: "Sat", invoices: 5600, contracts: 2500, ids: 1700 },
  { day: "Sun", invoices: 4900, contracts: 2100, ids: 1500 },
];

const confidenceTrend = [
  { label: "Mon", confidence: 88, ocr: 93 },
  { label: "Tue", confidence: 90, ocr: 94 },
  { label: "Wed", confidence: 91, ocr: 95 },
  { label: "Thu", confidence: 89, ocr: 94 },
  { label: "Fri", confidence: 94, ocr: 97 },
  { label: "Sat", confidence: 92, ocr: 96 },
  { label: "Sun", confidence: 95, ocr: 98 },
];

const documentTypes = [
  { name: "Invoices", value: 8420, color: appPalette.primaryAccent },
  { name: "Bank Statements", value: 4910, color: appPalette.secondaryAccent },
  { name: "Identity Documents", value: 3240, color: appPalette.info },
  { name: "Contracts", value: 2890, color: appPalette.success },
  { name: "Receipts", value: 2140, color: appPalette.warning },
  { name: "Tax Forms", value: 1320, color: "#8B5CF6" },
  { name: "Insurance Claims", value: 960, color: "#0F766E" },
  { name: "Legal Documents", value: 509, color: appPalette.error },
];

const workerUtilization = [
  { worker: "OCR-1", usage: 86 },
  { worker: "OCR-2", usage: 74 },
  { worker: "OCR-3", usage: 92 },
  { worker: "AI-1", usage: 81 },
  { worker: "AI-2", usage: 68 },
  { worker: "VAL-1", usage: 77 },
];

const queueLoadData = [
  { time: "08:00", queue: 980, latency: 210 },
  { time: "09:00", queue: 1180, latency: 240 },
  { time: "10:00", queue: 1320, latency: 270 },
  { time: "11:00", queue: 1260, latency: 252 },
  { time: "12:00", queue: 1490, latency: 310 },
  { time: "13:00", queue: 1350, latency: 286 },
  { time: "14:00", queue: 1290, latency: 260 },
  { time: "15:00", queue: 1253, latency: 238 },
];

const storageGrowthData = [
  { month: "Jan", storage: 180 },
  { month: "Feb", storage: 245 },
  { month: "Mar", storage: 315 },
  { month: "Apr", storage: 420 },
  { month: "May", storage: 548 },
  { month: "Jun", storage: 690 },
];

const reviewCompletionData = [
  { day: "Mon", pending: 720, approved: 620 },
  { day: "Tue", pending: 810, approved: 750 },
  { day: "Wed", pending: 690, approved: 710 },
  { day: "Thu", pending: 760, approved: 840 },
  { day: "Fri", pending: 620, approved: 910 },
  { day: "Sat", pending: 540, approved: 690 },
  { day: "Sun", pending: 410, approved: 580 },
];

const heatmapData = [
  [94, 96, 91, 89, 95, 97, 93],
  [92, 95, 96, 94, 90, 88, 91],
  [97, 98, 95, 93, 94, 96, 99],
  [86, 89, 92, 91, 88, 90, 93],
  [91, 94, 95, 96, 92, 93, 94],
];

const activityFeed = [
  {
    title: "Invoice batch processed",
    description: "1,284 invoices completed with 96% confidence",
    time: "24 sec ago",
    color: appPalette.success,
  },
  {
    title: "Peak throughput detected",
    description: "Processing speed reached 912 documents/min",
    time: "2 min ago",
    color: appPalette.primaryAccent,
  },
  {
    title: "Queue latency normalized",
    description: "Worker autoscaling reduced latency by 18%",
    time: "5 min ago",
    color: appPalette.info,
  },
  {
    title: "Anomaly detected",
    description: "3 insurance claims require validation review",
    time: "9 min ago",
    color: appPalette.warning,
  },
];

const aiInsights = [
  {
    title: "OCR accuracy improved by 2.1% today",
    description: "New field correction model reduced extraction drift.",
    icon: ScanLine,
    color: appPalette.success,
  },
  {
    title: "Peak processing detected at 2:30 PM",
    description: "Throughput exceeded forecast by 14.8%.",
    icon: TrendingUp,
    color: appPalette.primaryAccent,
  },
  {
    title: "Invoice extraction confidence increased",
    description: "Average invoice confidence is now 95.4%.",
    icon: BrainCircuit,
    color: appPalette.info,
  },
  {
    title: "3 workers require optimization",
    description: "OCR-3, AI-1, and VAL-1 are above optimal load.",
    icon: Server,
    color: appPalette.warning,
  },
  {
    title: "Manual review queue reduced by 14%",
    description: "Reviewer throughput increased during current shift.",
    icon: ClipboardList,
    color: appPalette.secondaryAccent,
  },
];

const systemHealth = [
  { label: "CPU Usage", value: 68, icon: Cpu, color: appPalette.info },
  { label: "OCR Worker Health", value: 94, icon: ScanLine, color: appPalette.success },
  { label: "Queue Latency", value: 42, suffix: "ms", icon: Clock3, color: appPalette.warning },
  { label: "API Response", value: 128, suffix: "ms", icon: Zap, color: appPalette.primaryAccent },
  { label: "Storage Usage", value: 69, suffix: "%", icon: HardDrive, color: appPalette.secondaryAccent },
  { label: "Active Workers", value: 32, icon: Workflow, color: appPalette.success },
];

/* ================= HELPERS ================= */

function CountUp({ end, duration = 1300, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
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

function getHeatmapColor(value) {
  if (value >= 96) return "bg-[#2E8B57]";
  if (value >= 92) return "bg-[#2563EB]";
  if (value >= 88) return "bg-[#E59E0B]";
  return "bg-[#DC2626]";
}

/* ================= COMPONENTS ================= */

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-[#D9B8B5]/40 bg-white/60"
          />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-[2rem] border border-[#D9B8B5]/40 bg-white/60" />
    </div>
  );
}

function MetricCard({ item, index }) {
  const Icon = item.icon;
  const isPositive = item.change.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_16px_50px_rgba(122,31,45,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_24px_70px_rgba(122,31,45,0.14)] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: item.color }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${item.color}14`,
            color: item.color,
          }}
        >
          <Icon className="h-5 w-5 stroke-[2.4]" />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
            isPositive ? "text-[#2E8B57]" : "text-[#DC2626]"
          }`}
          style={{
            backgroundColor: isPositive
              ? appPalette.successGlow
              : appPalette.errorGlow,
          }}
        >
          {isPositive ? (
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

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#D9B8B5]/25">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(item.value % 100 || 88, 96)}%` }}
            transition={{ duration: 1.1, delay: index * 0.08 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ThroughputPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] xl:col-span-2"
    >
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
            Throughput Forecasting
          </p>
          <h3 className="mt-2 text-xl font-black text-[#151112] dark:text-white">
            Processing Throughput
          </h3>
          <p className="mt-1 text-sm text-[#675A55] dark:text-[#D9B8B5]">
            Real-time document volume with predictive processing curve.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/50 bg-[#FFFDFC]/70 px-3 py-1.5 text-xs font-bold text-[#2E8B57] dark:border-white/10 dark:bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E8B57] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
          </span>
          Live updating
        </div>
      </div>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={throughputData}>
            <defs>
              <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={appPalette.primaryAccent} stopOpacity={0.34} />
                <stop offset="100%" stopColor={appPalette.primaryAccent} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={appPalette.info} stopOpacity={0.22} />
                <stop offset="100%" stopColor={appPalette.info} stopOpacity={0.01} />
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
              dataKey="predicted"
              name="Predicted"
              stroke={appPalette.info}
              strokeWidth={2.5}
              strokeDasharray="6 6"
              fill="url(#predictedGradient)"
              animationDuration={1400}
            />
            <Area
              type="monotone"
              dataKey="processed"
              name="Processed"
              stroke={appPalette.primaryAccent}
              strokeWidth={3.5}
              fill="url(#processedGradient)"
              animationDuration={1200}
              dot={{
                r: 4,
                fill: appPalette.primaryAccent,
                stroke: appPalette.background,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: appPalette.primaryAccent,
                stroke: appPalette.background,
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function StatusDonutPanel() {
  const total = statusDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
            Status Distribution
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112] dark:text-white">
            Document Status
          </h3>
        </div>

        <BarChart3 className="h-5 w-5 text-[#7A1F2D] dark:text-[#D9B8B5]" />
      </div>

      <div className="relative h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {statusDistribution.map((item, index) => (
                <linearGradient
                  key={item.name}
                  id={`statusGradient-${index}`}
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
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={108}
              paddingAngle={3}
              cornerRadius={10}
              animationDuration={1300}
            >
              {statusDistribution.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={`url(#statusGradient-${index})`}
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={3}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#675A55] dark:text-[#D9B8B5]">
            Total
          </p>
          <p className="mt-1 text-2xl font-black text-[#151112] dark:text-white">
            <CountUp end={total} />
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {statusDistribution.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-xl border border-[#D9B8B5]/30 bg-[#FFFDFC]/70 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DailyVolumePanel() {
  return (
    <ChartCard
      eyebrow="Volume Tracking"
      title="Daily Processing Volume"
      icon={TrendingUp}
      className="xl:col-span-2"
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dailyVolumeData}>
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
          <Bar
            dataKey="invoices"
            name="Invoices"
            stackId="a"
            fill={appPalette.primaryAccent}
            radius={[8, 8, 0, 0]}
            animationDuration={1100}
          />
          <Bar
            dataKey="contracts"
            name="Contracts"
            stackId="a"
            fill={appPalette.secondaryAccent}
            animationDuration={1300}
          />
          <Bar
            dataKey="ids"
            name="IDs"
            stackId="a"
            fill={appPalette.info}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ConfidencePanel() {
  return (
    <ChartCard eyebrow="AI Confidence" title="Confidence & OCR Trend" icon={BrainCircuit}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={confidenceTrend}>
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
            animationDuration={1300}
          />
          <Line
            type="monotone"
            dataKey="ocr"
            name="OCR Accuracy"
            stroke={appPalette.success}
            strokeWidth={3}
            dot={{ r: 4, fill: appPalette.success, stroke: appPalette.background, strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ eyebrow, title, icon: Icon, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
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

        <Icon className="h-5 w-5 text-[#7A1F2D] dark:text-[#D9B8B5]" />
      </div>

      {children}
    </motion.div>
  );
}

function HeatmapPanel() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = ["Invoices", "Banking", "Identity", "Legal", "Tax"];

  return (
    <ChartCard eyebrow="OCR Monitoring" title="OCR Accuracy Heatmap" icon={ScanLine}>
      <div className="space-y-3">
        <div className="grid grid-cols-[90px_repeat(7,1fr)] gap-2">
          <div />
          {days.map((day) => (
            <div
              key={day}
              className="text-center text-[11px] font-black uppercase tracking-wider text-[#675A55]"
            >
              {day}
            </div>
          ))}
        </div>

        {heatmapData.map((row, rowIndex) => (
          <div key={rows[rowIndex]} className="grid grid-cols-[90px_repeat(7,1fr)] gap-2">
            <div className="flex items-center text-xs font-bold text-[#675A55]">
              {rows[rowIndex]}
            </div>

            {row.map((value, index) => (
              <motion.div
                key={`${rowIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (rowIndex + index) * 0.025 }}
                className={`flex h-10 items-center justify-center rounded-xl text-xs font-black text-white shadow-sm ${getHeatmapColor(
                  value
                )}`}
                title={`${value}%`}
              >
                {value}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

function DocumentTypePanel() {
  return (
    <ChartCard eyebrow="Document Intelligence" title="Document Type Distribution" icon={FileText}>
      <div className="space-y-3">
        {documentTypes.map((item, index) => {
          const max = Math.max(...documentTypes.map((doc) => doc.value));
          const width = Math.round((item.value / max) * 100);

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-[#151112] dark:text-white">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-black text-[#675A55] dark:text-[#D9B8B5]">
                  {item.value.toLocaleString()}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/25">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.85, delay: index * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartCard>
  );
}

function WorkerUtilizationPanel() {
  return (
    <ChartCard eyebrow="Worker Monitoring" title="Worker Utilization" icon={Server}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={workerUtilization} layout="vertical">
          <CartesianGrid
            stroke="rgba(217,184,181,0.32)"
            strokeDasharray="3 3"
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            type="category"
            dataKey="worker"
            tickLine={false}
            axisLine={false}
            tick={{ fill: appPalette.textSecondary, fontSize: 12, fontWeight: 700 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="usage"
            name="Utilization"
            fill={appPalette.primaryAccent}
            radius={[0, 10, 10, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function QueueLoadPanel() {
  return (
    <ChartCard eyebrow="Queue Analytics" title="Queue Load & Latency" icon={Layers3}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={queueLoadData}>
          <defs>
            <linearGradient id="queueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={appPalette.warning} stopOpacity={0.3} />
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
            fill="url(#queueGradient)"
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function StoragePanel() {
  return (
    <ChartCard eyebrow="Storage Analytics" title="Storage Growth Timeline" icon={Database}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={storageGrowthData}>
          <defs>
            <linearGradient id="storageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={appPalette.secondaryAccent} stopOpacity={0.3} />
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
            dataKey="storage"
            name="Storage GB"
            stroke={appPalette.secondaryAccent}
            strokeWidth={3}
            fill="url(#storageGradient)"
            animationDuration={1300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ReviewWorkflowPanel() {
  return (
    <ChartCard eyebrow="Review Insights" title="Review Completion Analytics" icon={ClipboardList}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={reviewCompletionData}>
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
            dataKey="approved"
            name="Approved"
            stroke={appPalette.success}
            strokeWidth={3}
            dot={{ r: 4, fill: appPalette.success, stroke: appPalette.background, strokeWidth: 2 }}
            animationDuration={1200}
          />
          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke={appPalette.warning}
            strokeWidth={3}
            dot={{ r: 4, fill: appPalette.warning, stroke: appPalette.background, strokeWidth: 2 }}
            animationDuration={1400}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function AIInsightsPanel() {
  return (
    <ChartCard eyebrow="AI Insights" title="Recommendation Engine" icon={Sparkles}>
      <div className="space-y-3">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4 transition hover:border-[#7A1F2D]/30 hover:bg-[#F4EEE6]/60"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${insight.color}14`,
                    color: insight.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-sm font-black text-[#151112] dark:text-white">
                    {insight.title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#675A55] dark:text-[#D9B8B5]">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartCard>
  );
}

function ActivityFeedPanel() {
  return (
    <ChartCard eyebrow="Real-Time Activity" title="Live Processing Feed" icon={Activity}>
      <div className="space-y-4">
        {activityFeed.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="flex gap-3 rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/75 p-3"
          >
            <div className="relative mt-1">
              <span
                className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-50"
                style={{ backgroundColor: item.color }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>

            <div>
              <p className="text-sm font-black text-[#151112] dark:text-white">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-[#675A55] dark:text-[#D9B8B5]">
                {item.description}
              </p>
              <p className="mt-1 text-[11px] font-bold text-[#675A55]/80">
                {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

function SystemHealthPanel() {
  return (
    <ChartCard eyebrow="System Health" title="Infrastructure Monitoring" icon={ShieldCheck}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {systemHealth.map((item, index) => {
          const Icon = item.icon;
          const progress = item.suffix === "ms" ? Math.min(100, item.value / 2) : item.value;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${item.color}14`,
                    color: item.color,
                  }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <span className="text-sm font-black text-[#151112] dark:text-white">
                  <CountUp end={item.value} suffix={item.suffix || "%"} />
                </span>
              </div>

              <p className="mb-2 text-xs font-bold text-[#675A55] dark:text-[#D9B8B5]">
                {item.label}
              </p>

              <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/25">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, delay: index * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartCard>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function DocumentAnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const totalDocuments = useMemo(
    () => analyticsStats[0].value,
    []
  );

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
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
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
                    AI-powered document analytics
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight text-[#151112] dark:text-white sm:text-3xl lg:text-4xl">
                    Document Analytics Dashboard
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675A55] dark:text-[#D9B8B5]">
                    Monitor OCR quality, AI confidence, throughput, queue load,
                    failure trends, worker utilization, storage growth, and
                    review workflow performance in real time.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                      Total Volume
                    </p>
                    <p className="mt-1 text-lg font-black">
                      <CountUp end={totalDocuments} />
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                      SLA Status
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-lg font-black text-[#2E8B57]">
                      <ShieldCheck className="h-4 w-4" />
                      Healthy
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:col-span-1">
                    <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                      Forecast
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-lg font-black text-[#7A1F2D] dark:text-[#D9B8B5]">
                      <Sparkles className="h-4 w-4" />
                      +21.6%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
              {analyticsStats.map((item, index) => (
                <MetricCard key={item.title} item={item} index={index} />
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ThroughputPanel />
              <StatusDonutPanel />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <DailyVolumePanel />
              <ConfidencePanel />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <HeatmapPanel />
              <DocumentTypePanel />
              <AIInsightsPanel />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <WorkerUtilizationPanel />
              <QueueLoadPanel />
              <StoragePanel />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ReviewWorkflowPanel />
              <ActivityFeedPanel />
              <SystemHealthPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}