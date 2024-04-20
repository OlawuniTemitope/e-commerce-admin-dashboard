import { db } from '@/lib/db'

export const GetStockCount =async (storeId:string) => {
    const stockCount = await db.product.count({
        where:{
            storeId,
            isArchived:false
        },
        
    })
    return stockCount
    }
