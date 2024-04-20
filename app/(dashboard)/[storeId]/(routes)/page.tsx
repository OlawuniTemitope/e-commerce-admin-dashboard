import { GetGraphRevenue } from '@/actions/get-graph-revenue'
import { GetSalesCount } from '@/actions/get-sale-count'
import { GetStockCount } from '@/actions/get-stock-count'
import { GetTotalRevenue } from '@/actions/get-total-revenue'
import { Overveiw } from '@/components/overveiw'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import React from 'react'

interface DashbordProps {
  params:{storeId:string}
}
const DashboardPage = async ({params}:DashbordProps) => {

  const totalRevenue = await GetTotalRevenue(params.storeId)
  const salesCount = await GetSalesCount(params.storeId)
  const stockCount = await GetStockCount(params.storeId)
  const graphRevenue = await GetGraphRevenue(params.storeId)
  
   return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overveiw of your store'/>
        <Separator/>
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex items-center justify-between flex-row gap-y-0 pb-2'>
              <CardTitle className='font-sm font-medium'>
              Total Revenue
              </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex items-center justify-between flex-row gap-y-0 pb-2'>
              <CardTitle className='font-sm font-medium'>
                Sale
              </CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                +{salesCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex items-center justify-between flex-row gap-y-0 pb-2'>
              <CardTitle className='font-sm font-medium'>
                Products In Stock
              </CardTitle>
            <Package className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
              {stockCount}  
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overveiw</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overveiw data={graphRevenue}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage