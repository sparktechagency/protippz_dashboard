import { FaBasketballBall } from "react-icons/fa";
import { FaMoneyBill, FaRegCircleUser, FaUserInjured } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { RiAlignTop, RiTeamFill } from "react-icons/ri";

export const LeagueSidebarLink = [
  {
    path: "/league-dashboard",
    label: "Dashboard",
    icon: <LuCalendarClock size={24} />,
  },
  {
    path: "/tip-management",
    label: "All Tip",
    icon: <FaMoneyBill size={24} />,
  },
  {
    path: "/top-fans-management",
    label: "Top Fans",
    icon: <RiAlignTop size={24} />,
  },
  {
    path: "/league-management",
    label: "All League",
    icon: <FaBasketballBall size={24} />,
  },
  {
    path: "/team-management",
    label: "All Team",
    icon: <RiTeamFill size={24} />,
  },
  {
    path: "/player-management",
    label: "All Player",
    icon: <FaUserInjured size={24} />,
  },
];
