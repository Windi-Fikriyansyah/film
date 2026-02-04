'use client'
import { useState, useEffect } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
            }`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-red-600 tracking-tight">REBAHIN</h1>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">Home</a>
                        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition">TV Shows</a>
                        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition">Movies</a>
                        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition">New & Popular</a>
                        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition">My List</a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition text-white">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition hidden sm:block text-white">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-sm font-bold text-white">
                            U
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition" />
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition md:hidden text-white">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    )
}
