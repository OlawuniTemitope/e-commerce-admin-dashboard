import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST (req:Request) {
    try {
        const {userId} =  auth()
        const body = await req.json()
        const {name} = body
        if(!userId){
            return new NextResponse("unautorized",{status:401})
        }

        if(!name) {
            return new NextResponse("name is required",{status:400})
        }
        const  store = await db.store.create(
            {
              data:{
                userId,
                name
              }
            }
        )

        return NextResponse.json(store)
        
    } catch (error) {
        return new NextResponse("internal error",{status:500})
    }
}
