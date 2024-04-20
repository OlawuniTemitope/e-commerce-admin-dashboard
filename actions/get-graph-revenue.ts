import { db } from '@/lib/db'

interface graphData {
    name:string,
    total:number
}

export const GetGraphRevenue =async (storeId:string) => {
    const paidOders = await db.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{orderItems:{
            include:{
                product:true
            }
        }}
        
    });
    const montlyRevenue : {[Key:number]:number}={}
    for (const order of paidOders){
        const month = order.createdAt.getMonth()
        let revenueForOder = 0
        for (const items of order.orderItems){
            revenueForOder = items.product.price.toNumber()
        }
        montlyRevenue[month] = (montlyRevenue[month] || 0) + revenueForOder
    }
    const graphData:graphData[] = [
        {name:"Jan", total:0},
        {name:"Feb", total:0},
        {name:"Mar", total:0},
        {name:"Apr", total:0},
        {name:"May", total:0},
        {name:"Jun", total:0},
        {name:"Jul", total:0},
        {name:"Aug", total:0},
        {name:"Sep", total:0},
        {name:"Oct", total:0},
        {name:"Nov", total:0},
        {name:"Dec", total:0},
    ];
    for(const month in montlyRevenue){
        graphData[parseInt(month)].total = montlyRevenue[parseInt(month)]
    }
    return graphData
    }
