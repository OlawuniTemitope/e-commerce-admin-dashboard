import { db } from '@/lib/db'

export const GetTotalRevenue =async (storeId:string) => {
    const paidOrder = await db.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })

    const totalRevenue = paidOrder.reduce((total,order)=>{
        // console.log(order)
        const orderTotal = order.orderItems.reduce((orderSum,items)=>{
            console.log(items.product)
            return orderSum + items.product.price.toNumber()
        },0)
        return total + orderTotal
    },0)
    return totalRevenue
  
}
