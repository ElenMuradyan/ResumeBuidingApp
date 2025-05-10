"use client";
import React from "react";
import { MenuItem, Menu } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { navbarItems, ROUTE_NAMES } from "@/lib/constants";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const { push } = useRouter();

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu>
        {
            navbarItems.map((item, i) => {
                return(
                    <MenuItem item={item} key={i} onClick={() => push(ROUTE_NAMES[item as keyof typeof ROUTE_NAMES])}/>
                )
            })
        }
      </Menu>
    </div>
  );
}