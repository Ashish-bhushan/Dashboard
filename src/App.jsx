import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Document from "./Component/Document";
import DocumentProcessingPipeline from "./Component/processingPipeline";
import ReviewQueue from "./Component/ReviewQueue";
import AlertsNotificationsDashboard from "./Component/Alert";
import ReportsInsightsDashboard from "./Component/ReportsInsights";
import DocumentAnalyticsDashboard from "./Component/Analytics";

const routes = [
  {
    path: "/processing-pipeline",
    label: "Processing Pipeline",
    element: <DocumentProcessingPipeline />,
  },
  {
    path: "/documents",
    label: "Documents",
    element: <Document />,
  },
  {
    path: "/review-queue",
    label: "Review Queue",
    element: <ReviewQueue />,
  },
  {
    path: "/alerts",
    label: "Alerts",
    element: <AlertsNotificationsDashboard />,
  },
  {
    path: "/reports-insights",
    label: "Reports & Insights",
    element: <ReportsInsightsDashboard />,
  },
  {
    path: "/analytics",
    label: "Analytics",
    element: <DocumentAnalyticsDashboard />,
  },
];

function AppNavigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#D9B8B5] bg-[#FFFDFC]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              [
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-[#7A1F2D] bg-[#7A1F2D] text-white"
                  : "border-[#D9B8B5] bg-[#FFFDFC] text-[#675A55] hover:bg-[#F4EEE6]",
              ].join(" ")
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4EEE6]">
      <AppNavigation />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/processing-pipeline" replace />}
        />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
