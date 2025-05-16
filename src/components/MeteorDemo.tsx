import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { ROUTE_NAMES } from "@/lib/constants";

interface GridItemProps {
    id: string, 
    summary: string,
    date: string
}

export const GridItem = ({ id, date, summary }: GridItemProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <p>
              {summary}
            </p>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                DATE: {date}
              </h3>
              <div className="flex gap-5">
            <Link href={`${ROUTE_NAMES.CREATERESUME}/${id}`}>
            <button className="cursor-pointer rounded-lg border border-gray-500 px-4 py-1 text-gray-300">
            Edit Resume
            </button>
            </Link>

            <Link href={`${ROUTE_NAMES.EDITRESUME}/${id}`}>
            <button className="cursor-pointer rounded-lg border border-gray-500 px-4 py-1 text-gray-300">
            View Resume
            </button>
            </Link>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


