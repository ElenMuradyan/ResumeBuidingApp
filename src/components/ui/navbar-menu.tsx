"use client";
import React from "react";

export const MenuItem = ({
  item,
  onClick,
}: {
  item: string;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
        {item}
    </div>
)};

export const Menu = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <nav
        className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 "
      >
        {children}
      </nav>
    );
};  