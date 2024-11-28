import React from 'react'
import RewardTable from '../../Components/Shared/RewardTable';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { FaSearch } from 'react-icons/fa';
const sampleData = [
    {
        id: '12333',
        userName: 'Kathryn Murphy',
        userImage: null, // Replace with actual image URL if available
        contactNumber: '(201) 555-0124',
        rewardName: 'VIP Tickets',
        category: 'Tickets',
        redeemedPoints: 150,
        status: 'Pending',
        deliveryOption: 'Online',
        email: 'kathryn@example.com',
        description: 'VIP tickets for an exclusive event with seating and snacks included.',
        rewardImage: 'https://i.ibb.co.com/C9NYT30/pngegg-8-1.png' // Replace with actual image URL
    },
    {
        id: '12334',
        userName: 'Devon Lane',
        userImage: null,
        contactNumber: '(316) 555-0116',
        rewardName: 'Jersey',
        category: 'Clothing',
        redeemedPoints: 200,
        status: 'Completed',
        deliveryOption: 'Offline', // Offline delivery option
        email: 'devon@example.com',
        address: '467 Washington Ave, Manhattan, New York, 10013',
        rewardImage: 'https://i.ibb.co.com/ZdQYDWb/pngwing-com-1-1.png' // Replace with actual image URL
    },
    {
        id: '12335',
        userName: 'Devon Lane',
        userImage: null,
        contactNumber: '(907) 555-0101',
        rewardName: 'Discount Coupon',
        category: 'Vouchers',
        redeemedPoints: 120,
        status: 'Pending',
        deliveryOption: 'Online', // Online delivery option
        email: 'devon@example.com',
        description: 'Discount coupon for 20% off on next purchase.',
        rewardImage: 'https://i.ibb.co.com/C9NYT30/pngegg-8-1.png' // Replace with actual image URL
    },
    {
        id: '12336',
        userName: 'Hari Danang',
        userImage: null,
        contactNumber: '(505) 555-0125',
        rewardName: 'T-shirt',
        category: 'Team Merchandise',
        redeemedPoints: 100,
        status: 'Completed',
        deliveryOption: 'Offline', // Offline delivery option
        email: 'hari@example.com',
        address: '1234 Elm St, Brooklyn, New York, 11201',
        rewardImage: 'https://i.ibb.co.com/C9NYT30/pngegg-8-1.png' // Replace with actual image URL
    }
];
const RedeemRequest = () => {
    return (
        <div className='bg-[var(--bg-gray-20)] h-screen p-3 rounded-md'>
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
                <Input className='max-w-48 h-[42px]' prefix={<FaSearch />} />
            </div>
            <RewardTable pagination={{
                limit: 10,
                total: sampleData.length,
                current: 1,
                handler: (page) => {
                    console.log('Page:', page);
                }
            }} data={sampleData} />
        </div>
    )
}

export default RedeemRequest
