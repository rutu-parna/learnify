"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent
} from "../../../components/ui/sidebar";
import { Button } from "../../../components/ui/button";
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from '../_components/AddNewCourseDialog'

const SideBArOPtions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/explore",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: '/ai-tools'
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    title: 'Profile',
    icon: UserCircle2Icon,
    path: "/profile",
  }
];

const AppSidebar = () => {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className={"p-4"}>
        <Image src={"/Learnlogo.svg"} alt="logo" width={150} height={120} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
              <Button>Create New Course</Button>
          </AddNewCourseDialog>

        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBArOPtions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5'}>
                    <Link href={item.path} className={`text-[17px]
                      ${path.includes(item.path) && 'text-primary bg-purple-50'}`}>
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
