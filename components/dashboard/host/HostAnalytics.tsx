"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react"

// Mock data for analytics
const earningsData = [
  { month: "Ene", earnings: 1200 },
  { month: "Feb", earnings: 1500 },
  { month: "Mar", earnings: 1800 },
  { month: "Abr", earnings: 2100 },
  { month: "May", earnings: 2400 },
  { month: "Jun", earnings: 2700 },
  { month: "Jul", earnings: 3000 },
  { month: "Ago", earnings: 2800 },
  { month: "Sep", earnings: 2600 },
  { month: "Oct", earnings: 2400 },
  { month: "Nov", earnings: 2200 },
  { month: "Dic", earnings: 2000 },
]

const occupancyData = [
  { month: "Ene", occupancy: 65 },
  { month: "Feb", occupancy: 70 },
  { month: "Mar", occupancy: 75 },
  { month: "Abr", occupancy: 80 },
  { month: "May", occupancy: 85 },
  { month: "Jun", occupancy: 90 },
  { month: "Jul", occupancy: 95 },
  { month: "Ago", occupancy: 90 },
  { month: "Sep", occupancy: 85 },
  { month: "Oct", occupancy: 80 },
  { month: "Nov", occupancy: 75 },
  { month: "Dic", occupancy: 70 },
]

const reservationsData = [
  { month: "Ene", reservations: 5 },
  { month: "Feb", reservations: 7 },
  { month: "Mar", reservations: 9 },
  { month: "Abr", reservations: 11 },
  { month: "May", reservations: 13 },
  { month: "Jun", reservations: 15 },
  { month: "Jul", reservations: 17 },
  { month: "Ago", reservations: 15 },
  { month: "Sep", reservations: 13 },
  { month: "Oct", reservations: 11 },
  { month: "Nov", reservations: 9 },
  { month: "Dic", reservations: 7 },
]

const propertiesPerformanceData = [
  { name: "Villa con vista al mar", value: 35 },
  { name: "Cabaña en la montaña", value: 25 },
  { name: "Apartamento de lujo", value: 20 },
  { name: "Casa de playa", value: 15 },
  { name: "Penthouse con vista panorámica", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function HostAnalytics() {
  const [timeRange, setTimeRange] = useState('year')
  
  // Mock stats for the dashboard
  const stats = [
    { 
      label: 'Ingresos totales', 
      value: '$28,450', 
      change: '+12%', 
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    },
    { 
      label: 'Tasa de ocupación', 
      value: '78%', 
      change: '+5%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    { 
      label: 'Total de reservas', 
      value: '124', 
      change: '+8%', 
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-500'
    },
    { 
      label: 'Huéspedes recibidos', 
      value: '356', 
      change: '+15%', 
      trend: 'up',
      icon: Users,
      color: 'text-amber-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Analíticas</h2>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Último mes</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="year">Último año</SelectItem>
            <SelectItem value="all">Todo el tiempo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color.replace('text', 'bg').replace('500', '100')}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-2 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{stat.change} vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Ingresos mensuales</CardTitle>
            <CardDescription>Ingresos generados por tus propiedades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={earningsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Ingresos']}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="earnings" name="Ingresos ($)" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Tasa de ocupación</CardTitle>
            <CardDescription>Porcentaje de días ocupados por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={occupancyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Ocupación']}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="occupancy" 
                    name="Ocupación (%)" 
                    stroke="#10B981" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Reservas mensuales</CardTitle>
            <CardDescription>Número de reservas por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reservationsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'Reservas']}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="reservations" name="Reservas" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Rendimiento por propiedad</CardTitle>
            <CardDescription>Distribución de ingresos por propiedad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="
\

