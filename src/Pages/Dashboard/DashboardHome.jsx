import { Suspense } from 'react';
import IncomeCard from '../../Components/Dashboard/IncomeCard';
import IncomeOverView from '../../Components/Dashboard/IncomeOverView';
import AppointmentsOverview from '../../Components/Dashboard/AppointmentsOverview';
import { Link } from 'react-router-dom';
import { useGetDashboardDataQuery } from '../../Redux/Apis/dashboardApi';
import Loading from '../../Components/Shared/Loading';
import icon1 from '../../assets/icons/icon1.png';
import icon2 from '../../assets/icons/icon2.png';
import icon3 from '../../assets/icons/icon3.png';
import icon4 from '../../assets/icons/icon4.png';
import icon5 from '../../assets/icons/icon5.png';
import icon6 from '../../assets/icons/icon6.png';
import icon7 from '../../assets/icons/team.png';
import RedeemRequest from '../../Components/Dashboard/RedeemRequest ';
const DashboardHome = () => {
  const { data, isLoading } = useGetDashboardDataQuery();
  console.log(data);

  const formatData = [
    {
      name: 'Total Users',
      icon: <img className="w-20 h-20 object-cover" src={icon1} alt="user" />,
      total: `${new Intl.NumberFormat('en-US').format(
        data?.data?.totalUser || 0
      )}`,
    },
    {
      name: 'Total Leagues',
      icon: <img className="w-20 h-20 object-cover" src={icon2} alt="Leagues" />,
      total:
        new Intl.NumberFormat('en-US').format(data?.data?.totalLeague) || 0,
    },
    {
      name: 'Total Teams',
      icon: <img className="w-20 h-20 object-cover" src={icon3} alt="" />,
      total: new Intl.NumberFormat('en-US').format(data?.data?.totalTeam) || 0,
    },
    {
      name: 'Total Players',
      icon: <img className="w-20 h-20 object-cover" src={icon4} alt="teams" />,
      total:
        new Intl.NumberFormat('en-US').format(data?.data?.totalPlayer) || 0,
    },
    {
      name: 'Team Sign In',
      icon: <img className="w-20 h-20 object-cover" src={icon7} alt="teams" />,
      total:
        new Intl.NumberFormat('en-US').format(data?.data?.totalTeamSignIn) || 0,
    },
    {
      name: 'Player Sign In',
      icon: <img className="w-20 h-20 object-cover" src={icon6} alt="teams" />,
      total:
        new Intl.NumberFormat('en-US').format(data?.data?.totalPlayerSignIn) ||
        0,
    },
    {
      name: 'Total Tip',
      icon: <img className="w-16" src={icon5} alt="total tip" />,
      total: `$ ${
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(data?.data?.totalTip) || 0
      }`,
    },
  ];
  return (
    <div className=" bg-[var(--bg-gray-20)] p-4 rounded-md">
      {isLoading && <Loading />}
      <div className="grid-7 gap-3">
        {formatData?.map((item, i) => (
          <div
            key={i}
            className="w-full h-full rounded-md p-4 py-6 bg-[var(--bg-white)]"
          >
            <IncomeCard item={item} />
          </div>
        ))}
      </div>
      <div className="grid-2 gap-3 mt-5">
        <Suspense fallback={''}>
          <IncomeOverView />
        </Suspense>
        <Suspense fallback={''}>
          <AppointmentsOverview />
        </Suspense>
      </div>
      <div className="bg-[var(--bg-white)] p-4 rounded-md mt-5">
        <div className="between-center mb-3">
          <p className="heading">Reward Redeem Request </p>
          <Link className="text-[var(--color-blue)]" to={`/redeem-request`}>
            View all
          </Link>
        </div>
        <Suspense fallback={''}>
          <RedeemRequest />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardHome;
