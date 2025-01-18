import { FaBasketballBall } from "react-icons/fa";
import { FaMoneyBill, FaRegCircleUser, FaUserInjured } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { LuCalendarClock, LuUser2 } from "react-icons/lu";
import { RiTeamFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";

export const SidebarLink = [
    {
        path: '/',
        label: 'Dashboard',
        icon: <LuCalendarClock size={24} />,
    },
    {
        path: '/tip-management',
        label: 'Tip Management',
        icon: <FaMoneyBill size={24} />,
    },
    {
        path: '/user-management',
        label: 'User Management',
        icon: <FaRegCircleUser size={24} />,
    },
    {
        path: '/league-management',
        label: 'League Management',
        icon: <FaBasketballBall size={24} />,
    },
    {
        path: '/team-management',
        label: 'Team Management',
        icon: <RiTeamFill size={24} />,
    },
    {
        path: '/player-management',
        label: 'Player Management',
        icon: <FaUserInjured size={24} />,
    },
    {
        path: '/reward-management',
        label: 'Reward Management',
        icon: <GiTrophyCup size={24} />,
    },
    {
        path: '/withdrawal-request',
        label: 'Withdrawal Request',
        icon: <TbReportMoney size={24} />,
    },
    {
        path: '/transaction',
        label: 'Transaction',
        icon: <HiMiniArrowTrendingUp size={24} />,
    },

]

export const SettingLinks = [
    {
        path: '/profile',
        label: 'Profile',
    },
    {
        path: '/faq',
        label: 'FAQ',
    },
    {
        path: '/partner',
        label: 'Partner',
    },
    {
        path: '/privacy-policy',
        label: 'Privacy Policy',
    },
    {
        path: '/terms-&-condition',
        label: 'Terms & Condition',
    },
]