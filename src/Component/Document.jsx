import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ScanLine,
  FolderOpen,
  Activity,
} from "lucide-react";

/* ================= PALETTE ================= */

const appPalette = {
  background: "#FFFDFC",
  softBackground: "#F4EEE6",
  mutedBeige: "#E8DCCF",

  textPrimary: "#151112",
  textSecondary: "#675A55",

  primaryAccent: "#7A1F2D",
  secondaryAccent: "#B4535F",
  primaryGlow: "rgba(122, 31, 45, 0.18)",
  cardShadow: "rgba(122, 31, 45, 0.08)",

  success: "#2E8B57",
  warning: "#E59E0B",
  error: "#DC2626",
  info: "#2563EB",

  successGlow: "rgba(46, 139, 87, 0.2)",
  warningGlow: "rgba(229, 158, 11, 0.2)",
  errorGlow: "rgba(220, 38, 38, 0.2)",
  infoGlow: "rgba(37, 99, 235, 0.2)",

  whiteGlass: "rgba(255, 255, 255, 0.75)",
  strongGlass: "rgba(255, 255, 255, 0.9)",
  darkOverlay: "rgba(21, 17, 18, 0.35)",

  border: "#D9B8B5",
  softBorder: "rgba(217, 184, 181, 0.45)",
  mutedBorder: "rgba(217, 184, 181, 0.25)",
  strongBorder: "rgba(217, 184, 181, 0.6)",

  hoverPrimary: "#5F1723",
  hoverSuccess: "#28784C",
  hoverError: "#B91C1C",
};

const gradients = {
  primary: ["rgba(122,31,45,0.95)", "rgba(180,83,95,0.72)"],
  success: ["rgba(46,139,87,0.95)", "rgba(46,139,87,0.55)"],
  warning: ["rgba(229,158,11,0.95)", "rgba(229,158,11,0.55)"],
  error: ["rgba(220,38,38,0.95)", "rgba(220,38,38,0.55)"],
  info: ["rgba(37,99,235,0.95)", "rgba(37,99,235,0.55)"],
  glass: ["rgba(255,255,255,0.82)", "rgba(244,238,230,0.58)"],
};

function getGradientByColor(color) {
  switch (color) {
    case appPalette.primaryAccent:
      return gradients.primary;
    case appPalette.secondaryAccent:
      return gradients.primary;
    case appPalette.success:
      return gradients.success;
    case appPalette.warning:
      return gradients.warning;
    case appPalette.error:
      return gradients.error;
    case appPalette.info:
      return gradients.info;
    default:
      return gradients.primary;
  }
}

function getGlowByColor(color) {
  switch (color) {
    case appPalette.primaryAccent:
    case appPalette.secondaryAccent:
      return appPalette.primaryGlow;
    case appPalette.success:
      return appPalette.successGlow;
    case appPalette.warning:
      return appPalette.warningGlow;
    case appPalette.error:
      return appPalette.errorGlow;
    case appPalette.info:
      return appPalette.infoGlow;
    default:
      return appPalette.primaryGlow;
  }
}

/* ================= DATA ================= */

const documentStats = [
  {
    title: "Total Documents",
    value: 24389,
    icon: FileText,
    subtitle: "All uploaded files",
    color: appPalette.primaryAccent,
  },
  {
    title: "Processed Today",
    value: 8721,
    icon: FolderOpen,
    subtitle: "Completed in last 24 hrs",
    color: appPalette.secondaryAccent,
  },
  {
    title: "Success Rate",
    value: 97,
    icon: CheckCircle2,
    subtitle: "Processing accuracy",
    suffix: "%",
    color: appPalette.success,
  },
  {
    title: "Pending Review",
    value: 1253,
    icon: Clock3,
    subtitle: "Awaiting manual check",
    color: appPalette.warning,
  },
  {
    title: "OCR Scanned",
    value: 18240,
    icon: ScanLine,
    subtitle: "Text extracted successfully",
    color: appPalette.info,
  },
  {
    title: "Failed Today",
    value: 112,
    icon: AlertTriangle,
    subtitle: "Needs attention",
    color: appPalette.error,
  },
];

/* ================= HELPERS ================= */

function CountUp({ end, duration = 1400, suffix = "", prefix = "" }) {
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

/* ================= LOADING ================= */

function LoadingSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <div
          className="h-6 w-40 animate-pulse rounded-full"
          style={{ backgroundColor: appPalette.softBackground }}
        />
        <div
          className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-full"
          style={{ backgroundColor: appPalette.softBackground }}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div
          className="overflow-hidden rounded-[2rem] border p-5 backdrop-blur-xl xl:col-span-2"
          style={{
            borderColor: appPalette.softBorder,
            backgroundColor: appPalette.whiteGlass,
            boxShadow: `0 20px 70px ${appPalette.cardShadow}`,
          }}
        >
          <div
            className="h-[320px] animate-pulse rounded-3xl"
            style={{
              background: `linear-gradient(90deg, ${appPalette.softBackground}, ${appPalette.strongGlass}, ${appPalette.softBackground})`,
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border p-4 backdrop-blur-xl"
              style={{
                borderColor: appPalette.softBorder,
                backgroundColor: appPalette.whiteGlass,
                boxShadow: `0 18px 50px ${appPalette.cardShadow}`,
              }}
            >
              <div
                className="h-28 animate-pulse rounded-2xl"
                style={{
                  background: `linear-gradient(90deg, ${appPalette.softBackground}, ${appPalette.strongGlass}, ${appPalette.softBackground})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= CHART UI ================= */

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#181313]/90"
      style={{
        borderColor: appPalette.softBorder,
        backgroundColor: appPalette.strongGlass,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <p
          className="text-sm font-semibold dark:text-white"
          style={{ color: appPalette.textPrimary }}
        >
          {item.title}
        </p>
      </div>

      <p
        className="mt-1 text-xs dark:text-[#D9B8B5]"
        style={{ color: appPalette.textSecondary }}
      >
        {item.value.toLocaleString()}
        {item.suffix || ""}
      </p>
    </motion.div>
  );
}

function GradientDefs({ data }) {
  return (
    <defs>
      {data.map((item, index) => {
        const [start, end] = getGradientByColor(item.color);

        return (
          <linearGradient
            key={item.title}
            id={`chartGradient-${index}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        );
      })}
    </defs>
  );
}

function MainDonutChart({ data, totalDocuments }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
      style={{
        borderColor: appPalette.softBorder,
        backgroundColor: appPalette.whiteGlass,
        boxShadow: `0 24px 80px ${appPalette.cardShadow}`,
      }}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(217,184,181,0.30)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(244,238,230,0.90)" }}
      />

      <div className="relative mb-4 flex items-start justify-between gap-4">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] dark:text-[#D9B8B5]"
            style={{ color: appPalette.primaryAccent }}
          >
            Distribution
          </p>
          <h3
            className="mt-2 text-xl font-black tracking-tight dark:text-white"
            style={{ color: appPalette.textPrimary }}
          >
            Document Analytics
          </h3>
          <p
            className="mt-1 text-sm dark:text-[#D9B8B5]"
            style={{ color: appPalette.textSecondary }}
          >
            Live breakdown across processing states.
          </p>
        </div>

        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${gradients.primary[0]}, ${gradients.primary[1]})`,
            boxShadow: `0 10px 28px ${appPalette.primaryGlow}`,
          }}
        >
          <Activity className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="relative h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <GradientDefs data={data} />

            <Pie
              data={data}
              dataKey="value"
              nameKey="title"
              cx="50%"
              cy="50%"
              innerRadius={82}
              outerRadius={124}
              paddingAngle={3}
              cornerRadius={10}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={3}
              animationBegin={180}
              animationDuration={1300}
              animationEasing="ease-out"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.title}
                  fill={`url(#chartGradient-${index})`}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    filter:
                      activeIndex === index
                        ? `drop-shadow(0 10px 18px ${getGlowByColor(entry.color)})`
                        : "none",
                    transform:
                      activeIndex === index ? "scale(1.025)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] dark:text-[#D9B8B5]"
            style={{ color: appPalette.textSecondary }}
          >
            Total
          </p>
          <p
            className="mt-1 text-3xl font-black tracking-tight dark:text-white"
            style={{ color: appPalette.textPrimary }}
          >
            <CountUp end={totalDocuments} />
          </p>
          <p
            className="mt-1 text-xs dark:text-[#D9B8B5]"
            style={{ color: appPalette.textSecondary }}
          >
            documents
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="flex items-center gap-2 rounded-xl border px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]"
            style={{
              borderColor: appPalette.mutedBorder,
              backgroundColor: "rgba(255,253,252,0.70)",
            }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span
              className="text-xs font-semibold dark:text-[#D9B8B5]"
              style={{ color: appPalette.textSecondary }}
            >
              {item.title}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MetricRadialCard({ item, index, maxValue }) {
  const Icon = item.icon;

  const percentage =
    item.suffix === "%"
      ? item.value
      : Math.max(6, Math.round((item.value / maxValue) * 100));

  const radialData = [
    {
      name: item.title,
      value: percentage,
      fill: item.color,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        scale: 1.015,
      }}
      className="group relative overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#D9B8B5]/30"
      style={{
        borderColor: appPalette.softBorder,
        backgroundColor: appPalette.whiteGlass,
        boxShadow: `0 18px 50px ${appPalette.cardShadow}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: getGlowByColor(item.color) }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-white dark:bg-white/10"
              style={{ backgroundColor: appPalette.softBackground }}
            >
              <Icon
                className="h-4 w-4 stroke-[2.4]"
                style={{ color: item.color }}
              />
            </span>

            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] dark:text-[#D9B8B5]"
              style={{ color: appPalette.textSecondary }}
            >
              {item.title}
            </p>
          </div>

          <h3
            className="mt-4 text-2xl font-black tracking-tight dark:text-white"
            style={{ color: appPalette.textPrimary }}
          >
            <CountUp end={item.value} suffix={item.suffix || ""} />
          </h3>

          <p
            className="mt-1 text-xs leading-5 dark:text-[#D9B8B5]"
            style={{ color: appPalette.textSecondary }}
          >
            {item.subtitle}
          </p>
        </div>

        <div className="h-24 w-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="96%"
              barSize={8}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <defs>
                <linearGradient
                  id={`radialGradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={getGradientByColor(item.color)[0]} />
                  <stop offset="100%" stopColor={getGradientByColor(item.color)[1]} />
                </linearGradient>
              </defs>

              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={999}
                fill={`url(#radialGradient-${index})`}
                background={{
                  fill: appPalette.mutedBorder,
                }}
                animationBegin={200 + index * 80}
                animationDuration={1200}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#151112] text-[11px] font-bold dark:fill-white"
              >
                {percentage}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MAIN ================= */

export default function Document() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  const chartData = useMemo(
    () =>
      documentStats.map((item) => ({
        ...item,
        name: item.title,
      })),
    []
  );

  const totalDocuments = documentStats[0].value;

  const maxMetricValue = useMemo(() => {
    return Math.max(
      ...documentStats
        .filter((item) => item.suffix !== "%")
        .map((item) => item.value)
    );
  }, []);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: appPalette.background,
      }}
    >
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
            className="w-full"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-[#D9B8B5]"
                  style={{
                    borderColor: appPalette.softBorder,
                    backgroundColor: appPalette.whiteGlass,
                    color: appPalette.primaryAccent,
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                      style={{ backgroundColor: appPalette.success }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ backgroundColor: appPalette.success }}
                    />
                  </span>
                  Live processing insights
                </motion.div>

                <h2
                  className="mt-3 text-2xl font-black tracking-tight dark:text-white sm:text-3xl"
                  style={{ color: appPalette.textPrimary }}
                >
                  Documents
                </h2>

                <p
                  className="mt-1 max-w-2xl text-sm leading-6 dark:text-[#D9B8B5]"
                  style={{ color: appPalette.textSecondary }}
                >
                  Monitor document ingestion, OCR coverage, review queues, and
                  processing reliability from one clean analytics view.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                style={{
                  borderColor: appPalette.softBorder,
                  backgroundColor: appPalette.whiteGlass,
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl dark:bg-white/10"
                  style={{ backgroundColor: appPalette.softBackground }}
                >
                  <CheckCircle2
                    className="h-5 w-5 dark:text-[#D9B8B5]"
                    style={{ color: appPalette.primaryAccent }}
                  />
                </div>

                <div>
                  <p
                    className="text-xs font-medium dark:text-[#D9B8B5]"
                    style={{ color: appPalette.textSecondary }}
                  >
                    Success Rate
                  </p>
                  <p
                    className="text-lg font-black dark:text-white"
                    style={{ color: appPalette.textPrimary }}
                  >
                    <CountUp end={97} suffix="%" />
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
              <div className="xl:col-span-2">
                <MainDonutChart
                  data={chartData}
                  totalDocuments={totalDocuments}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-3">
                {documentStats.map((item, index) => (
                  <MetricRadialCard
                    key={item.title}
                    item={item}
                    index={index}
                    maxValue={maxMetricValue}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}