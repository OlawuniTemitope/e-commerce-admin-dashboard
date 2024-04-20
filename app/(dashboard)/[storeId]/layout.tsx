import { Navbar } from '@/components/navbar';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
interface DashboardLayoutProps {
    children:React.ReactNode;
    params:{storeId:string}
}

const DashboardLayout = async ({children,params}:DashboardLayoutProps) => {
    const {userId} = auth()
    if(!userId){
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where :{
            id:params.storeId,
            userId
        }
    })

    if(!store){
        redirect("/")
    }

  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default DashboardLayout