"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { Search, Calendar, ChevronDown, CheckCircle, XCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Application = {
    id: string
    created_at: string
    first_name: string
    last_name: string
    age: number
    phone: string
    post_code: string
    image_url: string
    status: string
}

export default function Dashboard() {
    const [leads, setLeads] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const fetchLeads = async () => {
        setLoading(true)
        let query = supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false })

        if (dateFrom) {
            query = query.gte('created_at', new Date(dateFrom).toISOString())
        }
        if (dateTo) {
            // Add one day to include the end date fully
            const endDate = new Date(dateTo)
            endDate.setDate(endDate.getDate() + 1)
            query = query.lt('created_at', endDate.toISOString())
        }

        const { data, error } = await query

        if (error) {
            console.error('Error fetching leads:', error)
        } else {
            setLeads(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchLeads()
    }, [dateFrom, dateTo]) // Re-fetch when dates change

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Leads Dashboard</h1>
                        <p className="text-gray-500 font-medium">Manage and view incoming talent applications.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Filter Date</span>
                            <input
                                type="date"
                                className="text-sm border-none focus:ring-0 text-gray-700 font-medium bg-transparent"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                            <span className="text-gray-300">-</span>
                            <input
                                type="date"
                                className="text-sm border-none focus:ring-0 text-gray-700 font-medium bg-transparent"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                        <Button onClick={fetchLeads} variant="outline" className="h-full">Refresh</Button>
                    </div>
                </div>

                {/* Stats Row (Optional Placeholder) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase">Total Leads</p>
                        <p className="text-3xl font-black text-brand-blue">{leads.length}</p>
                    </div>
                </div>

                {/* Table / List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Applicant</th>
                                    <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Age</th>
                                    <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Submitted</th>
                                    <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Image</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">Loading leads...</td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No leads found for this period.</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-900">{lead.first_name} {lead.last_name}</div>
                                                <div className="text-xs text-gray-400 font-mono">{lead.id.slice(0, 8)}...</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                                    {lead.age} Years
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-gray-700">{lead.phone}</div>
                                                <div className="text-xs text-gray-400">{lead.post_code}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {format(new Date(lead.created_at), 'HH:mm')}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {lead.image_url ? (
                                                    <a href={lead.image_url} target="_blank" rel="noreferrer" className="block w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200 group-hover:scale-105 transition-transform">
                                                        <Image
                                                            src={lead.image_url}
                                                            alt="Lead"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">No image</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
