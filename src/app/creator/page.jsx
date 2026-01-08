"use client";
import CreatorLayout from "./CreatorLayout";
import DashboardTab from "./tabs/DashboardTab";
import AssignmentsTab from "./tabs/AssignmentsTab";
import EarningsTab from "./tabs/EarningsTab";
import PerformanceTab from "./tabs/PerformanceTab";
import ProfileTab from "./tabs/ProfileTab";
import SubmitTab from "./tabs/SubmitTab";
import { useSearchParams } from "next/navigation";

export default function CreatorPage() {
  const tab = useSearchParams().get("tab") || "dashboard";

  return (
    <CreatorLayout>
      {tab==="dashboard" && <DashboardTab />}
      {tab==="assign" && <AssignmentsTab />}
      {tab==="earnings" && <EarningsTab />}
      {tab==="performance" && <PerformanceTab />}
      {tab==="profile" && <ProfileTab />}
      {tab==="submit" && <SubmitTab />}
    </CreatorLayout>
  );
}
