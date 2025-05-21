"use client";
import React from "react";
import AuthProfileDropDown from "./dropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/store";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTE_NAMES } from "@/lib/Route_Names";

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
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    const { push } = useRouter();

    return (
      <nav
        className="relative rounded-full border border-transparent bg-[#00000074] shadow-input flex justify-center space-x-4 px-8 py-6 "
      >
        {children}
        {
          userData ? <AuthProfileDropDown /> : <div onClick={() => push(ROUTE_NAMES.LOGIN)} className="absolute rounded-4xl text-[15px] p-[10px] bg-[#000000b7] cursor-pointer right-[1.5rem] top-[1rem] border-[1px] border-[#00ffdd] text-[#00ffdd]"><UserOutlined/></div>
        }
      </nav>
    );
};  