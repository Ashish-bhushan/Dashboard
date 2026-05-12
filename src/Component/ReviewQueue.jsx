import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import {
  ClipboardList,
  Clock3,
  BadgeCheck,
  XCircle,
  UserRound,
  AlertTriangle,
  BrainCircuit,
  Eye,
  ScanLine,
  ShieldCheck,
  Flame,
  Activity,
  Search,
  Filter,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  Sparkles,
  Timer,
  History,
  Layers3,
} from "lucide-react";

const reviewQueueStats = [
  {
    title: "Pending Reviews",
    value: 1253,
    change: "+12%",
    icon: Clock3,
    color: "#E59E0B",
  },
  {
    title: "Approved Today",
    value: 8421,
    change: "+18%",
    icon: BadgeCheck,
    color: "#2E8B57",
  },
  {
    title: "Rejected Documents",
    value: 112,
    change: "-4%",
    icon: XCircle,
    color: "#DC2626",
  },
  {
    title: "AI Confidence",
    value: 94,
    suffix: "%",
    change: "+2%",
    icon: BrainCircuit,
    color: "#2563EB",
  },
];

const reviewDocuments = [
  {
    id: "INV-1021",
    type: "Invoice",
    confidence: 72,
    priority: "High",
    reviewer: "Sarah Johnson",
    status: "Pending",
    uploadedAt: "2 mins ago",
    sla: "14m left",
    amount: "$12,480.00",
    suggestion: "Review vendor tax ID and invoice total.",
  },
  {
    id: "BANK-2044",
    type: "Bank Statement",
    confidence: 84,
    priority: "Medium",
    reviewer: "Alex Chen",
    status: "Reviewing",
    uploadedAt: "8 mins ago",
    sla: "32m left",
    amount: "$8,920.40",
    suggestion: "AI detected missing transaction category.",
  },
  {
    id: "ID-8872",
    type: "Identity Document",
    confidence: 91,
    priority: "Low",
    reviewer: "Emma Davis",
    status: "Approved",
    uploadedAt: "15 mins ago",
    sla: "Completed",
    amount: "N/A",
    suggestion: "Document passed OCR and identity validation.",
  },
  {
    id: "POL-5338",
    type: "Insurance Policy",
    confidence: 68,
    priority: "High",
    reviewer: "Michael Lee",
    status: "Pending",
    uploadedAt: "21 mins ago",
    sla: "9m left",
    amount: "$42,100.00",
    suggestion: "Low confidence on policy holder address.",
  },
  {
    id: "LOAN-7712",
    type: "Loan Application",
    confidence: 79,
    priority: "Medium",
    reviewer: "Nina Patel",
    status: "Escalated",
    uploadedAt: "29 mins ago",
    sla: "Overdue",
    amount: "$180,000.00",
    suggestion: "Escalate income verification mismatch.",
  },
  {
    id: "TAX-4490",
    type: "Tax Form",
    confidence: 88,
    priority: "Low",
    reviewer: "Daniel Kim",
    status: "Reviewing",
    uploadedAt: "34 mins ago",
    sla: "51m left",
    amount: "$4,780.00",
    suggestion: "Validate extracted employer identifier.",
  },
];

const reviewStatusData = [
  { name: "Pending", value: 1253, color: "#E59E0B" },
  { name: "Reviewing", value: 684, color: "#2563EB" },
  { name: "Approved", value: 8421, color: "#2E8B57" },
  { name: "Rejected", value: 112, color: "#DC2626" },
  { name: "Escalated", value: 73, color: "#7A1F2D" },
];

const throughputData = [
  { time: "09:00", reviewed: 320, approved: 284 },
  { time: "10:00", reviewed: 520, approved: 462 },
  { time: "11:00", reviewed: 740, approved: 698 },
  { time: "12:00", reviewed: 680, approved: 621 },
  { time: "13:00", reviewed: 910, approved: 842 },
  { time: "14:00", reviewed: 1180, approved: 1094 },
  { time: "15:00", reviewed: 1340, approved: 1268 },
];

const confidenceTrendData = [
  { label: "Mon", confidence: 88 },
  { label: "Tue", confidence: 91 },
  { label: "Wed", confidence: 89 },
  { label: "Thu", confidence: 93 },
  { label: "Fri", confidence: 94 },
  { label: "Sat", confidence: 92 },
  { label: "Sun", confidence: 96 },
];

const reviewerProductivityData = [
  { name: "Sarah", reviews: 142 },
  { name: "Alex", reviews: 128 },
  { name: "Emma", reviews: 116 },
  { name: "Michael", reviews: 104 },
  { name: "Nina", reviews: 98 },
];

const reviewerActivity = [
  {
    user: "Sarah Johnson",
    action: "approved INV-1019",
    time: "28 seconds ago",
    color: "#2E8B57",
  },
  {
    user: "Alex Chen",
    action: "started review on BANK-2044",
    time: "1 minute ago",
    color: "#2563EB",
  },
  {
    user: "Michael Lee",
    action: "escalated POL-5338",
    time: "3 minutes ago",
    color: "#DC2626",
  },
  {
    user: "Emma Davis",
    action: "completed ID-8872 validation",
    time: "6 minutes ago",
    color: "#7A1F2D",
  },
];

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

function LoadingSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-[#D9B8B5]/40 bg-white/60"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="h-[420px] animate-pulse rounded-[2rem] border border-[#D9B8B5]/40 bg-white/60 xl:col-span-2" />
        <div className="h-[420px] animate-pulse rounded-[2rem] border border-[#D9B8B5]/40 bg-white/60" />
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-2xl border border-[#D9B8B5]/60 bg-white/90 px-4 py-3 shadow-2xl backdrop-blur-xl"
    >
      {label && (
        <p className="mb-1 text-xs font-semibold text-[#675A55]">{label}</p>
      )}

      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color || entry.payload?.color }}
          />
          <p className="text-sm font-bold text-[#151112]">
            {entry.name}: {Number(entry.value).toLocaleString()}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

function getPriorityClasses(priority) {
  switch (priority) {
    case "High":
      return "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";
    case "Medium":
      return "bg-[#E59E0B]/10 text-[#E59E0B] border-[#E59E0B]/20";
    default:
      return "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20";
  }
}

function getStatusClasses(status) {
  switch (status) {
    case "Approved":
      return "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20";
    case "Rejected":
      return "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20";
    case "Reviewing":
      return "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20";
    case "Escalated":
      return "bg-[#7A1F2D]/10 text-[#7A1F2D] border-[#7A1F2D]/20";
    default:
      return "bg-[#E59E0B]/10 text-[#E59E0B] border-[#E59E0B]/20";
  }
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;

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
      className="group relative overflow-hidden rounded-2xl border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_16px_50px_rgba(122,31,45,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-[#7A1F2D]/30 hover:shadow-[0_24px_70px_rgba(122,31,45,0.14)]"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: stat.color }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${stat.color}14`,
            color: stat.color,
          }}
        >
          <Icon className="h-5 w-5 stroke-[2.4]" />
        </div>

        <span
          className="rounded-full px-2.5 py-1 text-xs font-black"
          style={{
            backgroundColor: `${stat.color}14`,
            color: stat.color,
          }}
        >
          {stat.change}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#675A55]">
          {stat.title}
        </p>

        <h3 className="mt-2 text-3xl font-black tracking-tight text-[#151112]">
          <CountUp end={stat.value} suffix={stat.suffix || ""} />
        </h3>
      </div>
    </motion.div>
  );
}

function ConfidenceRadial({ value }) {
  const color =
    value >= 90 ? "#2E8B57" : value >= 80 ? "#2563EB" : value >= 70 ? "#E59E0B" : "#DC2626";

  return (
    <div className="relative h-14 w-14">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          barSize={6}
          data={[{ value, fill: color }]}
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
            background={{ fill: "rgba(217,184,181,0.25)" }}
            animationDuration={1200}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-black text-[#151112]">{value}%</span>
      </div>
    </div>
  );
}

function ReviewTable({
  documents,
  selectedDocument,
  onPreview,
  onApprove,
  onReject,
  selectedIds,
  setSelectedIds,
}) {
  const toggleRow = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds((current) =>
      current.length === documents.length ? [] : documents.map((doc) => doc.id)
    );
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 border-b border-[#D9B8B5]/40 p-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Manual Verification
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-[#151112]">
            Pending Documents
          </h2>
          <p className="mt-1 text-sm text-[#675A55]">
            Review low-confidence extractions, escalations, and SLA-sensitive documents.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9B8B5] bg-[#FFFDFC] px-4 text-xs font-bold text-[#675A55] transition hover:bg-[#F4EEE6]">
            <Filter className="h-4 w-4 text-[#7A1F2D]" />
            Filter
          </button>

          <button
            disabled={selectedIds.length === 0}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2E8B57] px-4 text-xs font-bold text-white shadow-md shadow-[#2E8B57]/20 transition hover:bg-[#28784C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check className="h-4 w-4" />
            Bulk Approve
          </button>

          <button
            disabled={selectedIds.length === 0}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-4 text-xs font-bold text-white shadow-md shadow-[#DC2626]/20 transition hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" />
            Bulk Reject
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#D9B8B5]/35 bg-[#F4EEE6]/55">
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.length === documents.length}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-[#D9B8B5] accent-[#7A1F2D]"
                />
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Document
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Type
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                AI Confidence
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Priority
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Reviewer
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                SLA
              </th>
              <th className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#675A55]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc, index) => (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`group border-b border-[#D9B8B5]/25 transition ${
                  selectedDocument?.id === doc.id
                    ? "bg-[#F4EEE6]/80"
                    : "hover:bg-[#F4EEE6]/50"
                }`}
              >
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(doc.id)}
                    onChange={() => toggleRow(doc.id)}
                    className="h-4 w-4 rounded border-[#D9B8B5] accent-[#7A1F2D]"
                  />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7A1F2D]/10 text-[#7A1F2D]">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-[#151112]">{doc.id}</p>
                      <p className="text-xs text-[#675A55]">{doc.uploadedAt}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-[#675A55]">
                  {doc.type}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <ConfidenceRadial value={doc.confidence} />
                    <div className="min-w-[90px]">
                      <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${doc.confidence}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              doc.confidence >= 90
                                ? "#2E8B57"
                                : doc.confidence >= 80
                                ? "#2563EB"
                                : doc.confidence >= 70
                                ? "#E59E0B"
                                : "#DC2626",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-black ${getPriorityClasses(
                      doc.priority
                    )}`}
                  >
                    {doc.priority === "High" && (
                      <Flame className="h-3.5 w-3.5" />
                    )}
                    {doc.priority}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8DCCF] text-[10px] font-black text-[#7A1F2D]">
                      {doc.reviewer
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-semibold text-[#151112]">
                      {doc.reviewer}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-black ${getStatusClasses(
                      doc.status
                    )}`}
                  >
                    {doc.status === "Pending" && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E59E0B] opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E59E0B]" />
                      </span>
                    )}
                    {doc.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                      doc.sla === "Overdue" ? "text-[#DC2626]" : "text-[#675A55]"
                    }`}
                  >
                    <Timer className="h-3.5 w-3.5" />
                    {doc.sla}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPreview(doc)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#7A1F2D] transition hover:bg-[#F4EEE6]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onApprove(doc)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2E8B57] text-white shadow-sm transition hover:bg-[#28784C]"
                    >
                      <Check className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onReject(doc)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DC2626] text-white shadow-sm transition hover:bg-[#B91C1C]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-[#D9B8B5]/35 p-4 sm:flex-row sm:items-center">
        <p className="text-xs font-semibold text-[#675A55]">
          Showing 1-6 of 1,253 review items
        </p>

        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#675A55] hover:bg-[#F4EEE6]">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-[#7A1F2D] px-3 text-xs font-black text-white">
            1
          </button>

          <button className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white px-3 text-xs font-black text-[#675A55] hover:bg-[#F4EEE6]">
            2
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#675A55] hover:bg-[#F4EEE6]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentPreviewDrawer({ document, onClose, onApprove, onReject }) {
  return (
    <AnimatePresence>
      {document && (
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
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
                  Document Preview
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#151112]">
                  {document.id}
                </h3>
                <p className="mt-1 text-sm text-[#675A55]">
                  {document.type} • Uploaded {document.uploadedAt}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9B8B5] bg-white text-[#675A55] hover:bg-[#F4EEE6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-5 rounded-[2rem] border border-[#D9B8B5]/55 bg-white/75 p-4 shadow-sm">
              <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed border-[#D9B8B5] bg-[#F4EEE6]/50">
                <div className="text-center">
                  <Eye className="mx-auto h-10 w-10 text-[#7A1F2D]" />
                  <p className="mt-3 text-sm font-black text-[#151112]">
                    Secure Document Preview
                  </p>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-[#675A55]">
                    OCR zones, extracted fields, and confidence highlights would
                    appear here in production.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#D9B8B5]/50 bg-white/75 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                  Confidence
                </p>
                <p className="mt-2 text-2xl font-black text-[#151112]">
                  {document.confidence}%
                </p>
              </div>

              <div className="rounded-2xl border border-[#D9B8B5]/50 bg-white/75 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                  SLA Timer
                </p>
                <p
                  className={`mt-2 text-2xl font-black ${
                    document.sla === "Overdue"
                      ? "text-[#DC2626]"
                      : "text-[#151112]"
                  }`}
                >
                  {document.sla}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-[#D9B8B5]/50 bg-white/75 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#7A1F2D]" />
                <h4 className="text-sm font-black text-[#151112]">
                  AI Suggestion Panel
                </h4>
              </div>

              <p className="text-sm leading-6 text-[#675A55]">
                {document.suggestion}
              </p>

              <div className="mt-4 rounded-2xl bg-[#F4EEE6]/80 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#675A55]">
                  Extracted Amount
                </p>
                <p className="mt-1 text-lg font-black text-[#151112]">
                  {document.amount}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-[#D9B8B5]/50 bg-white/75 p-5">
              <div className="mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-[#7A1F2D]" />
                <h4 className="text-sm font-black text-[#151112]">
                  Audit Trail
                </h4>
              </div>

              <div className="space-y-4">
                {[
                  "Document uploaded",
                  "OCR scan completed",
                  "AI extraction finished",
                  "Manual review requested",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7A1F2D]" />
                    <div>
                      <p className="text-sm font-bold text-[#151112]">{item}</p>
                      <p className="text-xs text-[#675A55]">
                        {index + 2} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 mt-6 flex gap-3 border-t border-[#D9B8B5]/50 bg-[#FFFDFC]/90 py-4 backdrop-blur-xl">
              <button
                onClick={() => onReject(document)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#DC2626] text-sm font-black text-white shadow-lg shadow-[#DC2626]/20 transition hover:bg-[#B91C1C]"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>

              <button
                onClick={() => onApprove(document)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2E8B57] text-sm font-black text-white shadow-lg shadow-[#2E8B57]/20 transition hover:bg-[#28784C]"
              >
                <BadgeCheck className="h-4 w-4" />
                Approve
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function StatusDistributionChart() {
  const total = reviewStatusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Review Status
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Queue Distribution
          </h3>
        </div>

        <ClipboardList className="h-5 w-5 text-[#7A1F2D]" />
      </div>

      <div className="relative h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {reviewStatusData.map((item, index) => (
                <linearGradient
                  key={item.name}
                  id={`reviewGradient-${index}`}
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
              data={reviewStatusData}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={102}
              paddingAngle={3}
              cornerRadius={10}
              animationDuration={1200}
            >
              {reviewStatusData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={`url(#reviewGradient-${index})`}
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={3}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#675A55]">
            Total
          </p>
          <p className="mt-1 text-2xl font-black text-[#151112]">
            <CountUp end={total} />
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {reviewStatusData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-xl border border-[#D9B8B5]/30 bg-[#FFFDFC]/70 px-3 py-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-semibold text-[#675A55]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThroughputChart() {
  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl xl:col-span-2">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Throughput
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Review Throughput
          </h3>
          <p className="mt-1 text-sm text-[#675A55]">
            Pending vs approved documents across reviewer shifts.
          </p>
        </div>

        <div className="rounded-full border border-[#D9B8B5]/50 bg-[#FFFDFC]/70 px-3 py-1.5 text-xs font-black text-[#2E8B57]">
          +24.8% capacity
        </div>
      </div>

      <div className="h-[310px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={throughputData}>
            <defs>
              <linearGradient id="reviewedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7A1F2D" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#7A1F2D" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E8B57" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#2E8B57" stopOpacity={0.02} />
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
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="reviewed"
              name="Reviewed"
              stroke="#7A1F2D"
              strokeWidth={3}
              fill="url(#reviewedGradient)"
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="approved"
              name="Approved"
              stroke="#2E8B57"
              strokeWidth={3}
              fill="url(#approvedGradient)"
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReviewerActivityPanel() {
  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Activity
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Reviewer Feed
          </h3>
        </div>

        <Activity className="h-5 w-5 text-[#7A1F2D]" />
      </div>

      <div className="space-y-4">
        {reviewerActivity.map((item, index) => (
          <motion.div
            key={`${item.user}-${item.action}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="flex gap-3 rounded-2xl border border-[#D9B8B5]/35 bg-[#FFFDFC]/75 p-3"
          >
            <div
              className="mt-1 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-sm font-black text-[#151112]">{item.user}</p>
              <p className="mt-0.5 text-xs text-[#675A55]">{item.action}</p>
              <p className="mt-1 text-[11px] font-semibold text-[#675A55]/80">
                {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConfidenceAnalytics() {
  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            AI Quality
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Confidence Trend
          </h3>
        </div>

        <BrainCircuit className="h-5 w-5 text-[#7A1F2D]" />
      </div>

      <div className="h-[210px]">
        <ResponsiveContainer width="100%" height="100%">
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
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              domain={[80, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="confidence"
              name="Confidence"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563EB", stroke: "#FFFDFC", strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: "#2563EB",
                stroke: "#FFFDFC",
                strokeWidth: 3,
              }}
              animationDuration={1300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ProductivityChart() {
  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Workload
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Reviewer Productivity
          </h3>
        </div>

        <UserRound className="h-5 w-5 text-[#7A1F2D]" />
      </div>

      <div className="h-[210px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reviewerProductivityData}>
            <CartesianGrid
              stroke="rgba(217,184,181,0.32)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#675A55", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="reviews"
              name="Reviews"
              fill="#7A1F2D"
              radius={[10, 10, 0, 0]}
              animationDuration={1300}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PriorityQueueSection({ documents, onPreview }) {
  const highPriority = documents.filter((doc) => doc.priority === "High");

  return (
    <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
            Priority Queue
          </p>
          <h3 className="mt-2 text-lg font-black text-[#151112]">
            Escalation Watchlist
          </h3>
        </div>

        <Flame className="h-5 w-5 text-[#DC2626]" />
      </div>

      <div className="space-y-3">
        {highPriority.map((doc, index) => (
          <motion.button
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={() => onPreview(doc)}
            className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-[#DC2626]/20 bg-[#DC2626]/5 p-4 text-left transition hover:border-[#DC2626]/40 hover:bg-[#DC2626]/10"
          >
            <div>
              <p className="text-sm font-black text-[#151112]">{doc.id}</p>
              <p className="mt-1 text-xs text-[#675A55]">
                {doc.type} • {doc.sla}
              </p>
            </div>

            <ChevronRight className="h-4 w-4 text-[#DC2626] transition group-hover:translate-x-1" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewQueue() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [documents, setDocuments] = useState(reviewDocuments);
  const [workflowMessage, setWorkflowMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("review-search")?.focus();
      }

      if (event.key === "Escape") {
        setSelectedDocument(null);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesQuery =
        doc.id.toLowerCase().includes(query.toLowerCase()) ||
        doc.type.toLowerCase().includes(query.toLowerCase()) ||
        doc.reviewer.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : doc.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [documents, query, statusFilter]);

  const handleApprove = (doc) => {
    setDocuments((current) =>
      current.map((item) =>
        item.id === doc.id ? { ...item, status: "Approved" } : item
      )
    );
    setWorkflowMessage(`${doc.id} approved successfully`);
    setSelectedDocument(null);
    window.setTimeout(() => setWorkflowMessage(""), 2200);
  };

  const handleReject = (doc) => {
    setDocuments((current) =>
      current.map((item) =>
        item.id === doc.id ? { ...item, status: "Rejected" } : item
      )
    );
    setWorkflowMessage(`${doc.id} rejected and routed to exception handling`);
    setSelectedDocument(null);
    window.setTimeout(() => setWorkflowMessage(""), 2200);
  };

  return (
    <section className="min-h-screen w-full bg-[#FFFDFC] p-4 text-[#151112] sm:p-6">
      <AnimatePresence>
        {workflowMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="fixed right-5 top-5 z-[70] rounded-2xl border border-[#D9B8B5] bg-white/90 px-4 py-3 text-sm font-black text-[#151112] shadow-2xl backdrop-blur-xl"
          >
            {workflowMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[1600px]"
      >
        <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-[#D9B8B5]/35 bg-[#FFFDFC]/85 px-4 py-4 backdrop-blur-2xl sm:-mx-6 sm:px-6">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B8B5]/60 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#7A1F2D] shadow-sm backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E59E0B] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E59E0B]" />
                </span>
                Live manual verification queue
              </div>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-[#151112] sm:text-3xl lg:text-4xl">
                Review Queue
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#675A55]">
                Validate low-confidence OCR results, approve extracted fields,
                monitor reviewer performance, and resolve escalations in real time.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex h-11 items-center gap-2 rounded-xl border border-[#D9B8B5] bg-white/75 px-3 shadow-sm backdrop-blur-xl focus-within:border-[#7A1F2D] focus-within:ring-4 focus-within:ring-[#D9B8B5]/40">
                <Search className="h-4 w-4 text-[#7A1F2D]" />
                <input
                  id="review-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search documents, reviewers..."
                  className="w-full min-w-[240px] bg-transparent text-sm text-[#151112] outline-none placeholder:text-[#675A55]"
                />
                <kbd className="hidden rounded border border-[#D9B8B5] bg-[#F4EEE6] px-1.5 py-0.5 text-[10px] font-bold text-[#675A55] sm:inline">
                  Ctrl K
                </kbd>
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-[#D9B8B5] bg-white/75 px-3 text-sm font-bold text-[#675A55] shadow-sm outline-none transition focus:border-[#7A1F2D] focus:ring-4 focus:ring-[#D9B8B5]/40"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Reviewing</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Escalated</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {reviewQueueStats.map((stat, index) => (
                <StatCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ThroughputChart />
              <StatusDistributionChart />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ConfidenceAnalytics />
              <ProductivityChart />
              <ReviewerActivityPanel />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <PriorityQueueSection
                documents={documents}
                onPreview={setSelectedDocument}
              />

              <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
                      Validation
                    </p>
                    <h3 className="mt-2 text-lg font-black text-[#151112]">
                      AI Suggestion Health
                    </h3>
                  </div>

                  <ShieldCheck className="h-5 w-5 text-[#2E8B57]" />
                </div>

                <div className="space-y-4">
                  {[
                    ["OCR Field Match", 94, "#2E8B57"],
                    ["Entity Extraction", 88, "#2563EB"],
                    ["Fraud Signal Check", 76, "#E59E0B"],
                    ["Policy Compliance", 91, "#7A1F2D"],
                  ].map(([label, value, color]) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#151112]">
                          {label}
                        </span>
                        <span className="text-xs font-black text-[#675A55]">
                          {value}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#D9B8B5]/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-5 shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A1F2D]">
                      Escalations
                    </p>
                    <h3 className="mt-2 text-lg font-black text-[#151112]">
                      Real-Time Alerts
                    </h3>
                  </div>

                  <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
                </div>

                <div className="space-y-3">
                  {[
                    "3 documents approaching SLA breach",
                    "1 overdue escalation requires manager approval",
                    "Low AI confidence detected in invoice batch",
                    "Reviewer workload imbalance detected",
                  ].map((alert, index) => (
                    <motion.div
                      key={alert}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="rounded-2xl border border-[#DC2626]/20 bg-[#DC2626]/5 p-3"
                    >
                      <p className="text-sm font-bold text-[#151112]">{alert}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {filteredDocuments.length > 0 ? (
              <ReviewTable
                documents={filteredDocuments}
                selectedDocument={selectedDocument}
                onPreview={setSelectedDocument}
                onApprove={handleApprove}
                onReject={handleReject}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            ) : (
              <div className="rounded-[2rem] border border-[#D9B8B5]/45 bg-white/75 p-12 text-center shadow-[0_20px_70px_rgba(122,31,45,0.08)] backdrop-blur-xl">
                <Layers3 className="mx-auto h-10 w-10 text-[#7A1F2D]" />
                <h3 className="mt-4 text-xl font-black text-[#151112]">
                  No review items found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#675A55]">
                  Try adjusting your search query or status filter. New review
                  items will appear here automatically.
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>

      <DocumentPreviewDrawer
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </section>
  );
}