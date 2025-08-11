import React, { Suspense } from "react";
import { PageLayout, PageContent } from "./PageLayout";
import StatusCard from "./StatusCard";
import teamIcon from "../../assets/team.png";
import playerIcon from "../../assets/pleayer.png";
import tipIcon from "../../assets/tips.png";
import topFanIcon from "../../assets/top-fan.png";
import LeagueIncomeOverView from "./LeagueIncomeOverView";
import LeagueTopTable from "./LeagueTopTable";
const Leaguelayout = () => {
  const data = [
    {
      title: "Teams",
      count: 10,
      icon: (
        <img src={teamIcon} alt="Team" className="h-20 object-cover w-20" />
      ),
    },
    {
      title: "Players",
      count: 10,
      icon: (
        <img src={playerIcon} alt="Player" className="h-20 object-cover w-20" />
      ),
    },
    {
      title: "Tips",
      count: 10,
      icon: <img src={tipIcon} alt="Tip" className="h-20 object-cover w-20" />,
    },
    {
      title: "Top Fans",
      count: 10,
      icon: (
        <img
          src={topFanIcon}
          alt="Top Fan"
          className="h-20 object-cover w-20"
        />
      ),
    },
  ];
  return (
    <PageLayout>
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <StatusCard
              key={item.title}
              title={item.title}
              count={item.count}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 min-h-[400px] gap-3 mt-5">
          <Suspense fallback={""}>
            <LeagueIncomeOverView />
          </Suspense>
          <Suspense fallback={""}>
            <LeagueTopTable homePage={false} />
          </Suspense>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Leaguelayout;
