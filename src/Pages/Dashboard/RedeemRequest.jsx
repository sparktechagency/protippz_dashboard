import React, { useState } from 'react'
import RewardTable from '../../Components/Shared/RewardTable';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { useGetAllRedeemRequestQuery } from '../../Redux/Apis/redeemApis';

const RedeemRequest = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const { data,isLoading,isFetching } = useGetAllRedeemRequestQuery({ page, searchTerm })
    return (
        <div className=' rounded-md'>
            {
                //  && <Loading />
            }
            <div className='flex mb-6 mt-2 justify-between items-center gap-2'>
                <div className='flex justify-start items-center gap-2'>
                    <Link className='text-[--color-green]' to={-1}>
                        <FaArrowLeft />
                    </Link>
                    <p className='text-2xl'>Reward Redeem Request </p>
                </div>
                <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-48 h-[42px]' prefix={<FaSearch />} />
            </div>
            <div className='mb-10'>
                <RewardTable pagination={{
                    limit: data?.data?.meta?.limit,
                    total: data?.data?.meta?.total,
                    current: page,
                    handler: (page) => {
                        setPage(page);
                    }
                }}
                    data={data?.data?.result || []}
                />
            </div>
        </div>
    )
}

export default RedeemRequest
