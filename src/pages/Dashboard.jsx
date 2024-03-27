import React from 'react'
import TimeCard from '../components/TimeCard'
import HourlyChart from '../components/HourlyChart'
import MonthlyChart from '../components/MonthlyChart'
import DetailsCard from '../components/DetailsCard'

export default function Dashboard() {
    return (
        <>
            <div className='grid lg:grid-cols-3 grid-rows-3 grid-cols-1 gap-4 p-4 h-screen'>
                <div className='grid col-span-2 gap-4'>
                    <div className='col-span-2'>
                        <TimeCard />
                    </div>
                    <div className='col-span-2'>
                        <MonthlyChart />
                    </div>
                    <div className='col-span-2'>
                        <HourlyChart />
                    </div>
                </div>
                <div className='col-span-1 row-span-3'>
                    <DetailsCard />
                </div>

            </div>

        </>
    )
}
