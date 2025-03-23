"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { formatPrice } from "@/lib/utils"

interface RevenueChartProps {
  data: {
    month: string
    revenue: number
  }[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}€`}
        />
        <Tooltip
          formatter={(value: number) => [formatPrice(value), "Ingresos"]}
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        />
        <Bar dataKey="revenue" fill={theme === "dark" ? "#7c3aed" : "#4f46e5"} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

