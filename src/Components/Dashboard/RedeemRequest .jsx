import React from 'react'
import Loading from '../Shared/Loading'
import RewardTable from '../Shared/RewardTable'
import { useGetAllRedeemRequestQuery } from '../../Redux/Apis/redeemApis';


const RedeemRequest = () => {
    const { data } = useGetAllRedeemRequestQuery({})
    console.log(data)
    return (
        <>
            {
                //  && <Loading />
            }
            <RewardTable pagination={false} data={data?.data?.result?.slice(0,6) || []} />
        </>
    )
}

export default RedeemRequest
