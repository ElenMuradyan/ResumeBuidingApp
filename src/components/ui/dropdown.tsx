'use client'

import handleLogout from "@/features/auth/authHandlers";
import { ROUTE_NAMES } from "@/lib/constants";
import { UserOutlined } from "@ant-design/icons";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";

export default function AuthProfileDropDown () {
    const { push } = useRouter();

    const items = [
        {
            label: 'Profile',
            key:'0',
            onClick:() => push(ROUTE_NAMES.PROFILE),
        },
        {
            label: 'Logout',
            key:'logout',
            onClick: () => handleLogout(),
        }
    ]

  return (
    <Dropdown>
      <DropdownTrigger>
      <Avatar style={{position: 'absolute', right: '1.5rem', backgroundColor: 'black'}} className="right-6">
          <UserOutlined />
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            className='w-[200px] flex items-center justify-center text-center p-[5px] bg-[#010101b2]'
            onClick={item.onClick}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}






