import React from 'react'
import { Filter, ChevronDown, ArrowUpRight, BarChart2, PieChart, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import { AnalyticsChart, SalesPerformanceChart } from '@/components/dashboard/DashboardCharts'

// Simulate async data fetching
async function getDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    productOverview: '$43,630',
    activeSales: '$27,064',
    productRevenue: '$16,568'
  }
}

export default async function HomePage() {
  // This will trigger loading.tsx
  const data = await getDashboardData()

  return (
    <div className="min-h-screen w-full border rounded-lg">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="px-10 pb-10 grid grid-cols-12 gap-6">
        {/* Product Overview Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-xs text-gray-400 font-semibold">Product overview</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                This month <ChevronDown className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold mb-1">{data.productOverview}</div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="text-green-500 font-semibold">+12%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20">
                  Cosmetics
                </Button>
                <Button variant="outline" size="sm" className="bg-primary/5 text-primary/80 border-primary/10">
                  Housewear
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-400 font-semibold">Active sales</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold mb-1">{data.activeSales}</div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="text-green-500 font-semibold">+12%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
              <BarChart2 className="w-8 h-8 text-primary/40 bg-primary/5 rounded-lg p-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-gray-400 font-semibold">Product Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold mb-1">{data.productRevenue}</div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="text-green-500 font-semibold">+7%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
              <PieChart className="w-8 h-8 text-primary/40 bg-primary/5 rounded-lg p-1" />
            </CardContent>
          </Card>
        </div>
        {/* Analytics Card */}
        <div className="col-span-12 md:col-span-8">
          <Card className="">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-xs text-gray-400 font-semibold">Analytics</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  This year <ChevronDown className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <AnalyticsChart />
            </CardContent>
          </Card>
        </div>
        {/* Sales Performance Card */}
        <div className="col-span-12 md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-xs text-gray-400 font-semibold">Sales Performance</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                See Details <ArrowUpRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <SalesPerformanceChart />
            </CardContent>
          </Card>
        </div>
        {/* Table & Top Products */}
        <div className="col-span-12 md:col-span-8">
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-xs text-gray-400 font-semibold">Top Products</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-primary border-primary/20">
                See Details <ArrowUpRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="py-2 px-3 text-left font-semibold">Product</th>
                      <th className="py-2 px-3 text-left font-semibold">Sales</th>
                      <th className="py-2 px-3 text-left font-semibold">Revenue</th>
                      <th className="py-2 px-3 text-left font-semibold">Stock</th>
                      <th className="py-2 px-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#f6f6f8]">
                      <td className="py-2 px-3 font-medium">Bid Shorts</td>
                      <td className="py-2 px-3">127 pcs</td>
                      <td className="py-2 px-3">$1,890</td>
                      <td className="py-2 px-3">120</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded bg-green-100 text-green-600 font-semibold text-xs">
                          In Stock
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-[#f6f6f8]">
                      <td className="py-2 px-3 font-medium">T Shirts_Mixi</td>
                      <td className="py-2 px-3">540 pcs</td>
                      <td className="py-2 px-3">$2,889</td>
                      <td className="py-2 px-3">100</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-600 font-semibold text-xs">
                          Out of stock
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Visits by Hourly Card */}
        <div className="col-span-12 md:col-span-4">
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-xs text-gray-400 font-semibold">Total visits by hourly</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold mb-1">288,822</div>
              <div className="flex items-center gap-2 text-xs mb-4">
                <span className="text-green-500 font-semibold">+4%</span>
                <span className="text-gray-400">vs last week</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                  <span className="w-8 h-4 bg-primary/20 rounded" />
                  <span className="w-8 h-4 bg-primary/30 rounded" />
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                  <span className="w-8 h-4 bg-primary/5 rounded" />
                </div>
                <div className="flex gap-1">
                  <span className="w-8 h-4 bg-primary/5 rounded" />
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                  <span className="w-8 h-4 bg-primary/20 rounded" />
                  <span className="w-8 h-4 bg-primary/30 rounded" />
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                </div>
                <div className="flex gap-1">
                  <span className="w-8 h-4 bg-primary/20 rounded" />
                  <span className="w-8 h-4 bg-primary/30 rounded" />
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                  <span className="w-8 h-4 bg-primary/5 rounded" />
                  <span className="w-8 h-4 bg-primary/10 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
