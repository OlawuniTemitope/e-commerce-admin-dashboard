import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { SettingsForm } from './components/settings-form'
import { ModelProvider } from '@/provider/model.provider'

interface SettingsProps {
    params:{
        storeId:string
    }
}

const SettingsPage =async ({params}:SettingsProps) => {
    const {userId}= auth()
    if(!userId){
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where : {
            id:params.storeId,
            userId
        } 
       })
       if(!store) {
        redirect("/")
       }
  return (
<div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  
  )
}

export default SettingsPage