import Link from 'next/link'
import MovieCard from './MovieCard'

interface MovieGridSectionProps {
    title: string
    slug: string
    movies: any[]
    maxItems?: number
}

export default function MovieGridSection({ title, slug, movies, maxItems = 8 }: MovieGridSectionProps) {
    const displayMovies = movies.slice(0, maxItems)

    if (movies.length === 0) {
        return (
            <section className="py-8">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center text-gray-500">
                    Gagal memuat data {title}. Pastikan API Key TMDB sudah benar di .env.local
                </div>
            </section>
        )
    }

    return (
        <section className="py-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        {title}
                    </h2>
                    <Link
                        href={`/${slug}`}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-bold transition flex items-center gap-2 uppercase"
                    >
                        Lihat Lebih »
                    </Link>
                </div>

                {/* 8 Column Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
                    {displayMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    )
}
