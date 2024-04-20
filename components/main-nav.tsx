"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

export const MainNav = ({className, ...props}
    :React.HTMLAttributes<HTMLElement>) => {
      const pathName = usePathname()
      const params=useParams()
      const route = [
        {
        href:`/${params.storeId}`,
        label: "Dashboards",
        active: pathName === `/${params.storeId}`,
      },
        {
        href:`/${params.storeId}/billboards`,
        label: "Billboard",
        active: pathName === `/${params.storeId}/billboards`,
      },
        {
        href:`/${params.storeId}/categories`,
        label: "Categories",
        active: pathName === `/${params.storeId}/categories`,
      },
        {
        href:`/${params.storeId}/sizes`,
        label: "Sizes",
        active: pathName === `/${params.storeId}/sizes`,
      },
        {
        href:`/${params.storeId}/colors`,
        label: "Colors",
        active: pathName === `/${params.storeId}/colors`,
      },
        {
        href:`/${params.storeId}/products`,
        label: "Products",
        active: pathName === `/${params.storeId}/products`,
      },
        {
        href:`/${params.storeId}/orders`,
        label: "Orders",
        active: pathName === `/${params.storeId}/orders`,
      },
        {
        href:`/${params.storeId}/settings`,
        label: "settings",
        active: pathName === `/${params.storeId}/settings`,
      }
    ]
  return (
    <nav 
    className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
      {route.map((routes)=>(
        <Link key={routes.href} 
        href={routes.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        routes.active?"text-black dark:text-white":" text-muted-foreground")}>
          {routes.label}
        </Link>
      ))}
    </nav>
  )
}
