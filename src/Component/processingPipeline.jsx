import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Layers3,
  ScanLine,
  BrainCircuit,
  FileSearch,
  ShieldCheck,
  UserRound,
  Send,
  PieChart,
  Activity,
  Clock3,
  AlertTriangle,
  Gauge,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ================= COLOR PALETTE ================= */

const reviewQueuePalette = {
  background: "#FFFDFC",
  primaryAccent: "#7A1F2D",
  secondaryAccent: "#B4535F",
  border: "#D9B8B5",
  softBackground: "#F4EEE6",
  textPrimary: "#151112",
  textSecondary: "#675A55",

  success: "#2E8B57",
  warning: "#E59E0B",
  error: "#DC2626",
  info: "#2563EB",

  white: "#FFFFFF",
  whiteGlass: "rgba(255, 255, 255, 0.75)",
  whiteGlassStrong: "rgba(255, 255, 255, 0.9)",
  darkOverlay: "rgba(21, 17, 18, 0.35)",

  borderSoft: "rgba(217, 184, 181, 0.45)",
  borderMuted: "rgba(217, 184, 181, 0.25)",
  borderStrong: "rgba(217, 184, 181, 0.6)",

  mutedBeige: "#E8DCCF",
  cardShadow: "rgba(122, 31, 45, 0.08)",
  glowPrimary: "rgba(122, 31, 45, 0.18)",
  glowSuccess: "rgba(46, 139, 87, 0.2)",
  glowWarning: "rgba(229, 158, 11, 0.2)",
  glowError: "rgba(220, 38, 38, 0.2)",
  glowInfo: "rgba(37, 99, 235, 0.2)",
};

const reviewStatusColors = {
  Pending: reviewQueuePalette.warning,
  Reviewing: reviewQueuePalette.info,
  Approved: reviewQueuePalette.success,
  Rejected: reviewQueuePalette.error,
  Escalated: reviewQueuePalette.primaryAccent,
};

const reviewPriorityColors = {
  High: reviewQueuePalette.error,
  Medium: reviewQueuePalette.warning,
  Low: reviewQueuePalette.success,
};

const reviewChartColors = {
  pending: reviewQueuePalette.warning,
  reviewing: reviewQueuePalette.info,
  approved: reviewQueuePalette.success,
  rejected: reviewQueuePalette.error,
  escalated: reviewQueuePalette.primaryAccent,

  primaryLine: reviewQueuePalette.primaryAccent,
  approvedLine: reviewQueuePalette.success,
  confidenceLine: reviewQueuePalette.info,
  productivityBar: reviewQueuePalette.primaryAccent,
};

const reviewQueueGradients = {
  primary:
    "linear-gradient(135deg, rgba(122,31,45,0.95), rgba(180,83,95,0.72))",
  success:
    "linear-gradient(135deg, rgba(46,139,87,0.95), rgba(46,139,87,0.55))",
  warning:
    "linear-gradient(135deg, rgba(229,158,11,0.95), rgba(229,158,11,0.55))",
  error:
    "linear-gradient(135deg, rgba(220,38,38,0.95), rgba(220,38,38,0.55))",
  info:
    "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(37,99,235,0.55))",
  glass:
    "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(244,238,230,0.58))",
};

const reviewQueueTailwindClasses = {
  pageBackground: "bg-[#FFFDFC]",
  softBackground: "bg-[#F4EEE6]",
  card: "border border-[#D9B8B5]/45 bg-white/75 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl",
  primaryText: "text-[#151112]",
  secondaryText: "text-[#675A55]",
  primaryAccentText: "text-[#7A1F2D]",
  primaryButton:
    "bg-[#7A1F2D] text-white shadow-md shadow-[#7A1F2D]/20 hover:bg-[#5F1723]",
  successButton:
    "bg-[#2E8B57] text-white shadow-md shadow-[#2E8B57]/20 hover:bg-[#28784C]",
  errorButton:
    "bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/20 hover:bg-[#B91C1C]",
};

/* ================= DATA ================= */

const pipelineStages = [
  {
    title: "Upload",
    count: 24389,
    speed: "1.2k/min",
    success: 99,
    status: "active",
    color: reviewQueuePalette.primaryAccent,
    icon: UploadCloud,
  },
  {
    title: "Queue",
    count: 22140,
    speed: "980/min",
    success: 98,
    status: "active",
    color: reviewQueuePalette.secondaryAccent,
    icon: Layers3,
  },
  {
    title: "OCR Scan",
    count: 18240,
    speed: "860/min",
    success: 97,
    status: "processing",
    color: reviewQueuePalette.info,
    icon: ScanLine,
  },
  {
    title: "Classification",
    count: 17120,
    speed: "710/min",
    success: 95,
    status: "active",
    color: reviewQueuePalette.success,
    icon: BrainCircuit,
  },
  {
    title: "Extraction",
    count: 16510,
    speed: "650/min",
    success: 94,
    status: "active",
    color: reviewQueuePalette.warning,
    icon: FileSearch,
  },
  {
    title: "Validation",
    count: 15890,
    speed: "590/min",
    success: 92,
    status: "warning",
    color: reviewQueuePalette.warning,
    icon: ShieldCheck,
  },
  {
    title: "Human Review",
    count: 1253,
    speed: "120/min",
    success: 89,
    status: "pending",
    color: reviewQueuePalette.error,
    icon: UserRound,
  },
  {
    title: "Export",
    count: 14980,
    speed: "540/min",
    success: 96,
    status: "active",
    color: reviewQueuePalette.primaryAccent,
    icon: Send,
  },
];

const throughputData = [
  { time: "08:00", documents: 2800 },
  { time: "09:00", documents: 3900 },
  { time: "10:00", documents: 5200 },
  { time: "11:00", documents: 4800 },
  { time: "12:00", documents: 6100 },
  { time: "13:00", documents: 7400 },
  { time: "14:00", documents: 6900 },
  { time: "15:00", documents: 8721 },
];

const statusData = [
  {
    name: "Processed",
    value: 14980,
    color: reviewQueuePalette.success,
  },
  {
    name: "Processing",
    value: 18240,
    color: reviewQueuePalette.info,
  },
  {
    name: "Queued",
    value: 22140,
    color: reviewQueuePalette.secondaryAccent,
  },
  {
    name: "Review",
    value: 1253,
    color: reviewQueuePalette.warning,
  },
  {
    name: "Failed",
    value: 112,
    color: reviewQueuePalette.error,
  },
];

const sparklineData = [
  { value: 35 },
  { value: 42 },
  { value: 38 },
  { value: 56 },
  { value: 64 },
  { value: 58 },
  { value: 72 },
  { value: 81 },
];

const summaryMetrics = [
  {
    title: "Total Processed",
    value: 24389,
    suffix: "",
    change: "+18.4%",
    icon: Activity,
    color: reviewQueuePalette.primaryAccent,
    description: "Documents completed",
  },
  {
    title: "OCR Accuracy",
    value: 97,
    suffix: "%",
    change: "+2.1%",
    icon: ScanLine,
    color: reviewQueuePalette.info,
    description: "Recognition quality",
  },
  {
    title: "Avg. Time",
    value: 42,
    suffix: "s",
    change: "-8.6%",
    icon: Clock3,
    color: reviewQueuePalette.success,
    description: "Per document",
  },
  {
    title: "Queue Load",
    value: 68,
    suffix: "%",
    change: "+4.3%",
    icon: Layers3,
    color: reviewQueuePalette.warning,
    description: "Current capacity",
  },
  {
    title: "Failed Docs",
    value: 112,
    suffix: "",
    change: "-12.2%",
    icon: AlertTriangle,
    color: reviewQueuePalette.error,
    description: "Needs attention",
  },
  {
    title: "AI Confidence",
    value: 94,
    suffix: "%",
    change: "+3.8%",
    icon: Gauge,
    color: reviewQueuePalette.secondaryAccent,
    description: "Model certainty",
  },
];

/* ================= REUSABLE COMPONENTS ================= */

function CountUp({ end, duration = 1300, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutQuart(progress);

      setCount(Math.floor(eased * end));

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

function StatusDot({ status, color }) {
  const isActive = status === "active" || status === "processing";

  return (
    <span className="relative flex h-2.5 w-2.5">
      {isActive && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ backgroundColor: color }}
        />
      )}
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full shadow-sm"
        style={{ backgroundColor: color }}
      />
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

function CircularSuccess({ value, color }) {
  const data = [{ value, fill: color }];

  return (
    <div className="relative h-16 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          barSize={6}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={999}
            background={{ fill: reviewQueuePalette.borderMuted }}
            animationDuration={1200}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-black text-[#151112] dark:text-white">
          {value}%
        </span>
      </div>
    </div>
  );
}

function PipelineConnector({ index, color }) {
  return (
    <div className="hidden flex-1 items-center px-2 xl:flex">
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[#D9B8B5]/30 dark:bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 0.9,
            delay: 0.45 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, rgba(180,83,95,0.35))`,
            boxShadow: `0 0 18px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

function PipelineStageCard({ stage, index }) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        scale: 1.025,
      }}
      className="group relative min-w-[240px] flex-1 overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-4 shadow-[0_18px_55px_rgba(122,31,45,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/35 hover:shadow-[0_28px_80px_rgba(122,31,45,0.16)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#D9B8B5]/30"
    >
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: stage.color }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${stage.color}14`,
              color: stage.color,
            }}
          >
            <Icon className="h-5 w-5 stroke-[2.35]" />
          </div>

          <div>
            <h3 className="text-sm font-black tracking-tight text-[#151112] dark:text-white">
              {stage.title}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <StatusDot status={stage.status} color={stage.color} />
              <span className="text-[11px] font-semibold capitalize text-[#675A55] dark:text-[#D9B8B5]">
                {stage.status}
              </span>
            </div>
          </div>
        </div>

        <CircularSuccess value={stage.success} color={stage.color} />
      </div>

      <div className="relative mt-5">
        <p className="text-2xl font-black tracking-tight text-[#151112] dark:text-white">
          <CountUp end={stage.count} />
        </p>
        <p className="mt-1 text-xs font-medium text-[#675A55] dark:text-[#D9B8B5]">
          Live processing count
        </p>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#675A55] dark:text-[#D9B8B5]">
            Speed
          </p>
          <p className="mt-1 text-sm font-black text-[#151112] dark:text-white">
            {stage.speed}
          </p>
        </div>

        <div className="rounded-xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/70 p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#675A55] dark:text-[#D9B8B5]">
            Success
          </p>
          <p className="mt-1 text-sm font-black text-[#151112] dark:text-white">
            {stage.success}%
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-[#D9B8B5]/25 dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${stage.success}%` }}
          transition={{
            duration: 1,
            delay: 0.25 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${stage.color}, ${stage.color}88)`,
            boxShadow: `0 0 18px ${stage.color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}

function SummaryCard({ metric, index }) {
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-4 shadow-[0_14px_45px_rgba(122,31,45,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_22px_65px_rgba(122,31,45,0.14)] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: metric.color }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${metric.color}14`,
            color: metric.color,
          }}
        >
          <Icon className="h-5 w-5 stroke-[2.35]" />
        </div>

        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-black"
          style={{
            backgroundColor: `${metric.color}14`,
            color: metric.color,
          }}
        >
          {metric.change}
        </span>
      </div>

      <div className="relative mt-4">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#675A55] dark:text-[#D9B8B5]">
          {metric.title}
        </p>

        <h3 className="mt-2 text-2xl font-black tracking-tight text-[#151112] dark:text-white">
          <CountUp end={metric.value} suffix={metric.suffix} />
        </h3>

        <p className="mt-1 text-xs text-[#675A55] dark:text-[#D9B8B5]">
          {metric.description}
        </p>
      </div>

      <div className="relative mt-4 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={metric.color}
              strokeWidth={2.5}
              dot={false}
              animationDuration={1100}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function ProcessingStatusChart() {
  const total = statusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="relative overflow-hidden rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
            Status Mix
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112] dark:text-white">
            Processing Status
          </h3>
        </div>

        <PieChart className="h-5 w-5 text-[#7A1F2D] dark:text-[#D9B8B5]" />
      </div>

      <div className="relative h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <defs>
              {statusData.map((item, index) => (
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
              data={statusData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={104}
              paddingAngle={3}
              cornerRadius={10}
              animationDuration={1200}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={`url(#statusGradient-${index})`}
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={3}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
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
        {statusData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-xl border border-[#D9B8B5]/30 bg-[#FFFDFC]/60 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]"
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

function ThroughputChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.22 }}
      className="relative overflow-hidden rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:col-span-2"
    >
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
            Throughput
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112] dark:text-white">
            Documents Processed Per Hour
          </h3>
          <p className="mt-1 text-sm text-[#675A55] dark:text-[#D9B8B5]">
            Real-time processing volume across the pipeline.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/50 bg-[#FFFDFC]/70 px-3 py-1.5 text-xs font-bold text-[#2E8B57] dark:border-white/10 dark:bg-white/5">
          <TrendingUp className="h-3.5 w-3.5" />
          +24.8% today
        </div>
      </div>

      <div className="h-[310px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={throughputData}>
            <defs>
              <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={reviewQueuePalette.primaryAccent}
                  stopOpacity={0.32}
                />
                <stop
                  offset="100%"
                  stopColor={reviewQueuePalette.primaryAccent}
                  stopOpacity={0.02}
                />
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
              tick={{
                fill: reviewQueuePalette.textSecondary,
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: reviewQueuePalette.textSecondary,
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="documents"
              name="Documents"
              stroke={reviewQueuePalette.primaryAccent}
              strokeWidth={3}
              fill="url(#throughputGradient)"
              animationDuration={1400}
              dot={{
                r: 4,
                fill: reviewQueuePalette.primaryAccent,
                stroke: reviewQueuePalette.background,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: reviewQueuePalette.primaryAccent,
                stroke: reviewQueuePalette.background,
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function DocumentProcessingPipeline() {
  const totalProcessed = useMemo(
    () => pipelineStages.reduce((sum, stage) => sum + stage.count, 0),
    []
  );

  const avgSuccess = useMemo(
    () =>
      Math.round(
        pipelineStages.reduce((sum, stage) => sum + stage.success, 0) /
          pipelineStages.length
      ),
    []
  );

  return (
    <section className="min-h-screen w-full bg-[#FFFDFC] p-4 text-[#151112] transition-colors duration-300 dark:bg-[#110D0E] dark:text-white sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[1600px]"
      >
        <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-[#D9B8B5]/35 bg-[#FFFDFC]/85 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-[#110D0E]/85 sm:-mx-6 sm:px-6">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/60 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#7A1F2D] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-[#D9B8B5]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E8B57] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
                </span>
                Live AI document pipeline
              </div>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-[#151112] dark:text-white sm:text-3xl lg:text-4xl">
                Document Processing Pipeline
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675A55] dark:text-[#D9B8B5]">
                Monitor ingestion, OCR, classification, extraction, validation,
                human review, and export performance in a real-time enterprise
                workflow view.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                  Pipeline Volume
                </p>
                <p className="mt-1 text-lg font-black">
                  <CountUp end={totalProcessed} />
                </p>
              </div>

              <div className="rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                  Avg. Success
                </p>
                <p className="mt-1 text-lg font-black">
                  <CountUp end={avgSuccess} suffix="%" />
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-[#D9B8B5]/45 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:col-span-1">
                <p className="text-xs font-semibold text-[#675A55] dark:text-[#D9B8B5]">
                  SLA Status
                </p>
                <p className="mt-1 flex items-center gap-2 text-lg font-black text-[#2E8B57]">
                  <Sparkles className="h-4 w-4" />
                  Healthy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {summaryMetrics.map((metric, index) => (
            <SummaryCard key={metric.title} metric={metric} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mb-6 overflow-hidden rounded-[2rem] border border-[#D9B8B5]/45 bg-white/65 p-5 shadow-[0_24px_80px_rgba(122,31,45,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
        >
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D] dark:text-[#D9B8B5]">
                Workflow
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[#151112] dark:text-white">
                Live Pipeline Flow
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/50 bg-[#FFFDFC]/70 px-3 py-1.5 text-xs font-bold text-[#675A55] dark:border-white/10 dark:bg-white/5 dark:text-[#D9B8B5]">
              <Zap className="h-3.5 w-3.5 text-[#7A1F2D] dark:text-[#D9B8B5]" />
              Animated connectors represent active processing flow
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch">
            {pipelineStages.map((stage, index) => (
              <div
                key={stage.title}
                className="flex flex-col gap-4 xl:flex-row xl:items-center"
              >
                <PipelineStageCard stage={stage} index={index} />

                {index < pipelineStages.length - 1 && (
                  <>
                    <PipelineConnector index={index} color={stage.color} />

                    <div className="mx-auto h-8 w-[3px] overflow-hidden rounded-full bg-[#D9B8B5]/30 dark:bg-white/10 xl:hidden">
                      <motion.div
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{
                          duration: 0.8,
                          delay: 0.4 + index * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full rounded-full"
                        style={{
                          background: `linear-gradient(180deg, ${stage.color}, rgba(180,83,95,0.35))`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProcessingStatusChart />
          <ThroughputChart />
        </div>
      </motion.div>
    </section>
  );
}