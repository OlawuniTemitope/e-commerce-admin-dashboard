"use client"
import {Bar, BarChart, ResponsiveContainer, XAxis} from "recharts"

interface OverveiwProps{
    data:any[]
}

import React from 'react'

export const Overveiw = ({data}:OverveiwProps) => {
  return (
    <ResponsiveContainer width="100%"  height={350}>
        <BarChart data={data}>
            <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}/>
            <XAxis
            stroke="#888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value)=>`$${value}`}/>
            <Bar dataKey="total" fill="#3498db" radius={[4,4,0,0]}/>
        </BarChart>
    </ResponsiveContainer>
  )
}
