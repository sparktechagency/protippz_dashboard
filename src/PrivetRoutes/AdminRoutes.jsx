import { useGetProfileQuery } from '../Redux/Apis/authApi'
import Loading from '../Components/Shared/Loading'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
    const location = useLocation()

    // If no token, go to login
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    const { data, isLoading, isError, isFetching } = useGetProfileQuery()

    if (isLoading || isFetching) return <Loading />

    if (isError) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    const role = "leagueOwner"
    // const role = data?.data?.user?.role
    const path = location.pathname

    // Role access rules
    const superAdminRoutes = [
        '/', '/tip-management', '/user-management', '/league-management', '/league-owner-management',
        '/team-management', '/player-management', '/reward-management', '/redeem-request', '/withdrawal-request',
        '/transaction', '/profile', '/faq', '/partner', '/privacy-policy', '/terms-&-condition'
    ]

    const leagueOwnerRoutes = [
        '/league-dashboard', '/tip-management', '/league-management', '/team-management',
        '/profile', '/faq', '/partner', '/privacy-policy', '/terms-&-condition'
    ]

    // Check access
    if (role === 'superAdmin' && !superAdminRoutes.includes(path)) {
        return <Navigate to="/" replace />
    }
    if (role === 'leagueOwner' && !leagueOwnerRoutes.includes(path)) {
        return <Navigate to="/league-dashboard" replace />
    }

    return children
}

export default AdminRoutes
