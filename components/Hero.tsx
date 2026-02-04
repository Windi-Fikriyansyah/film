import { Play, Info, Star } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative h-[75vh] md:h-[85vh] w-full pt-16">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://picsum.photos/seed/heromovie/1920/1080')` }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
                    <div className="max-w-xl">
                        {/* Trending Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-red-600 px-2 py-0.5 text-xs font-bold rounded">TOP 10</span>
                            <span className="text-sm text-gray-300">#1 in Movies Today</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
                            Kingdom of the<br />Lost Souls
                        </h1>

                        {/* Rating & Info */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-4 h-4 fill-yellow-400" />
                                <span className="font-semibold">8.7</span>
                            </div>
                            <span className="text-gray-400">2024</span>
                            <span className="border border-gray-500 px-1.5 py-0.5 text-xs text-white">HD</span>
                            <span className="text-gray-400">2h 18m</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
                            In a world consumed by shadows, one warrior must rise to reclaim the lost throne
                            and restore balance to the realms. An epic journey of courage, sacrifice, and destiny.
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition">
                                <Play className="w-5 h-5 fill-black" />
                                Play
                            </button>
                            <button className="flex items-center gap-2 bg-gray-600/90 text-white px-6 py-3 rounded font-semibold hover:bg-gray-600 transition">
                                <Info className="w-5 h-5" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
