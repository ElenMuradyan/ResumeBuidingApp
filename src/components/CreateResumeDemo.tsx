import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { data } from "@/lib/constants";

export function TimelineDemo() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
