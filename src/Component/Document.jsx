import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ScanLine,
  FolderOpen,
} from "lucide-react";

function CountUp({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const documentStats = [
  {
    title: "Total Documents",
    value: 24389,
    icon: FileText,
    subtitle: "All uploaded files",
  },
  {
    title: "Processed Today",
    value: 8721,
    icon: FolderOpen,
    subtitle: "Completed in last 24 hrs",
  },
  {
    title: "Success Rate",
    value: 97,
    icon: CheckCircle2,
    subtitle: "Processing accuracy",
    suffix: "%",
  },
  {
    title: "Pending Review",
    value: 1253,
    icon: Clock3,
    subtitle: "Awaiting manual check",
  },
  {
    title: "OCR Scanned",
    value: 18240,
    icon: ScanLine,
    subtitle: "Text extracted successfully",
  },
  {
    title: "Failed Today",
    value: 112,
    icon: AlertTriangle,
    subtitle: "Needs attention",
  },
];

export default function Document() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#151112]">Documents</h2>
        <p className="text-xs text-[#675A55]">
          Monitor your document processing activity and live performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {documentStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-xl border border-[#D9B8B5] bg-[#FFFDFC] p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#675A55]">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#151112]">
                    <CountUp
                      end={item.value}
                      duration={2000}
                      suffix={item.suffix || ""}
                      prefix={item.prefix || ""}
                    />
                  </h3>

                  <p className="mt-1 text-xs text-[#675A55]">{item.subtitle}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4EEE6]">
                  <Icon className="h-5 w-5 stroke-[2.5] text-[#7A1F2D]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
