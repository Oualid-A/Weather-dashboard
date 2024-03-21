import React from 'react'
import TimeCard from '../components/TimeCard'
import HourlyChart from '../components/HourlyChart'
import MonthlyChart from '../components/MonthlyChart'
import DetailsCard from '../components/DetailsCard'

export default function Dashboard() {
    return (
        <>
            <div className='grid md:grid-cols-3  grid-cols-1 gap-4 p-4'>
                <div className='grid col-span-2 gap-4'>
                    <div className='col-span-2'>
                        <TimeCard />
                    </div>
                    <div className='col-span-2'>
                        <HourlyChart />
                    </div>
                    <div className='col-span-2'>
                        <MonthlyChart />
                    </div>
                </div>
                <div>
                    <DetailsCard />
                </div>

            </div>

        </>
    )
}
