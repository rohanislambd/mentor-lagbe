"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateTuitionDetails } from "@/lib/actions api/tuition";
import { Switch } from "@/components/ui/switch";

interface TuitionStatusToggleProps {
  tuitionId: string;
  initialIsActive: boolean;
}

export function TuitionStatusToggle({
  tuitionId,
  initialIsActive,
}: TuitionStatusToggleProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialIsActive);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    // Optimistic UI update
    setIsActive(checked);
    setLoading(true);

    try {
      const res = await updateTuitionDetails(tuitionId, { isActive: checked });
      console.log("Toggle status response:", res);

      if (res?.success === false || res?.error) {
        // Revert on failure
        setIsActive(!checked);
        const errorMsg =
          res?.message || res?.error || "Failed to update tuition status";
        toast.error(errorMsg);
        return;
      }

      toast.success(
        res?.message || `Tuition is now ${checked ? "Active" : "Closed"}`
      );
      router.refresh();
    } catch (err: unknown) {
      // Revert on catch
      setIsActive(!checked);
      const error = err as Error;
      toast.error(error?.message || "Error updating tuition status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={loading}
        className="cursor-pointer"
      />
      <span
        className={`text-[11px] font-semibold flex items-center gap-1 ${
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-muted-foreground"
        }`}
      >
        {loading && <Loader2 className="w-3 h-3 animate-spin text-amber-500" />}
        {isActive ? "Active" : "Closed"}
      </span>
    </div>
  );
}
