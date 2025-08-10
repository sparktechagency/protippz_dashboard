import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/Otp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Profile from "../Pages/Dashboard/Profile";
import Notification from "../Pages/Dashboard/Notification";
import FAQ from "../Pages/Dashboard/FAQ";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsCondition from "../Pages/Dashboard/TermsCondition";
import AdminRoutes from "../PrivetRoutes/AdminRoutes";
import RedeemRequest from "../Pages/Dashboard/RedeemRequest";
import TipManagement from "../Pages/Dashboard/TipManagement";
import UserManagement from "../Pages/Dashboard/UserManagement";
import LeagueManagement from "../Pages/Dashboard/LeagueManagement";
import TeamManagement from "../Pages/Dashboard/TeamManagement";
import PlayerManagement from "../Pages/Dashboard/PlayerManagement";
import Transaction from "../Pages/Dashboard/Transaction";
import RewardManagement from "../Pages/Dashboard/RewardManagement";
import WithdrawalRequest from "../Pages/Dashboard/WithdrawalRequest";
import Partner from "../Pages/Dashboard/Partner";
import Leaguelayout from "../Pages/League_Owner/Leaguelayout";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <AdminRoutes><Dashboard /></AdminRoutes>,
        children: [
            {
                path: '/',
                element: <DashboardHome />
            },
            {
                path: '/league-dashboard',
                element: <Leaguelayout />
            },
            {
                path: '/redeem-request',
                element: <RedeemRequest />
            },
            {
                path: '/tip-management',
                element: <TipManagement />
            },
            {
                path: '/player-management',
                element: <PlayerManagement />
            },
            {
                path: '/reward-management',
                element: <RewardManagement />
            },
            {
                path: '/withdrawal-request',
                element: <WithdrawalRequest />
            },
            {
                path: '/transaction',
                element: <Transaction />
            },
            {
                path: '/partner',
                element: <Partner />
            },
            {
                path: '/user-management',
                element: <UserManagement />
            },
            {
                path: '/league-management',
                element: <LeagueManagement />
            },
            {
                path: '/team-management',
                element: <TeamManagement />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/notification',
                element: <Notification />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/terms-&-condition',
                element: <TermsCondition />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/otp',
        element: <Otp />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
])