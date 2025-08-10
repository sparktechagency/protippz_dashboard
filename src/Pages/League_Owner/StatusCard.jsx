import React from 'react'

function StatusCard({ title, count, icon }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center bg-[#2FC191] p-2">
                <div className='flex-1 flex items-center justify-center'>
                    {icon}
                </div>
                <div className="flex flex-1 flex-col items-start h-full p-2">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <p className="text-white">{count}</p>
                </div>
            </div>
        </div>
    )
}

export default StatusCard