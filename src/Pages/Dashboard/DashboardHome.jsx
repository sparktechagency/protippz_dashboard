import { Suspense } from 'react'
import { FaCircleUser, FaUserDoctor } from 'react-icons/fa6'
import { GrMoney } from 'react-icons/gr'
import { SlCalender } from 'react-icons/sl'
import IncomeCard from '../../Components/Dashboard/IncomeCard'
import IncomeOverView from '../../Components/Dashboard/IncomeOverView'
import AppointmentsOverview from '../../Components/Dashboard/AppointmentsOverview'
import { Link } from 'react-router-dom'
import { useGetDashboardDataQuery } from '../../Redux/Apis/dashboardApi'
import Loading from '../../Components/Shared/Loading'
import icon1 from '../../assets/icons/icon1.png'
import icon2 from '../../assets/icons/icon2.png'
import icon3 from '../../assets/icons/icon3.png'
import icon4 from '../../assets/icons/icon4.png'
import RedeemRequest from '../../Components/Dashboard/RedeemRequest '
const DashboardHome = () => {
    const { data, isLoading } = useGetDashboardDataQuery()
    const formatData = [
        {
            name: 'Total Users',
            icon: <img src={icon1} alt="" srcset="" />,
            total: `$${data?.data?.totalUser || 0}`
        },
        {
            name: 'Total Leagues',
            icon: <img src={icon2} alt="" srcset="" />,
            total: data?.data?.totalLeague || 0
        },
        {
            name: 'Total Teams',
            icon: <img src={icon3} alt="" srcset="" />,
            total: data?.data?.totalTeam || 0
        },
        {
            name: 'Total Players',
            icon: <img src={icon4} alt="" srcset="" />,
            total: data?.data?.totalPlayer || 0
        },
    ]
    return (
        <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
            {
                isLoading && <Loading />
            }
            <div className='grid-4 gap-3'>
                {
                    formatData?.map((item, i) => <div key={i} className='w-full h-full rounded-md p-4 py-6 bg-[var(--bg-white)]'>
                        <IncomeCard item={item} />
                    </div>)
                }
            </div>
            <div className='grid-2 gap-3 mt-5'>
                <Suspense fallback={''}>
                    <IncomeOverView />
                </Suspense>
                <Suspense fallback={''}>
                    <AppointmentsOverview />
                </Suspense>
            </div>
            <div className='bg-[var(--bg-white)] p-4 rounded-md mt-5'>
                <div className='between-center mb-3'>
                    <p className='heading'>Reward Redeem Request </p>
                    <Link className='text-[var(--color-blue)]' to={`/redeem-request`}>
                        View all
                    </Link>
                </div>
                <Suspense fallback={''}>
                    <RedeemRequest />
                </Suspense>
            </div>
        </div>
    )
}

export default DashboardHome
