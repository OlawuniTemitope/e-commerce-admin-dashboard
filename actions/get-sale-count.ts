import { db } from '@/lib/db'

export const GetSalesCount =async (storeId:string) => {
    const salesCount = await db.order.count({
        where:{
            storeId,
            isPaid:true
        },
        
    })
    return salesCount
    }
