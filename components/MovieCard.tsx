import { Star } from 'lucide-react'
import { getTMDBImageUrl } from '@/lib/tmdb'
import Link from 'next/link'

export interface Movie {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    [key: string]: any
}

interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
    const rating = movie.vote_average?.toFixed(1) || '0.0'
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
    const poster = getTMDBImageUrl(movie.poster_path)

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="w-full cursor-pointer group transition-transform duration-300 hover:scale-105">
            {/* Poster Container */}
            <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg bg-gray-800 border border-white/5">
                <img
                    src={poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Rating Badge */}
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] sm:text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-white">{rating}</span>
                </div>

                {/* Quality Badge (Mocking HD for TMDB data) */}
                <div className="absolute top-1.5 right-1.5 bg-green-600 px-1.5 py-0.5 rounded text-[10px] font-extrabold text-white">
                    HD
                </div>
            </div>

            {/* Movie Info */}
            <div className="mt-2 text-center text-white">
                <h4 className="text-[11px] sm:text-xs font-semibold line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
                    {movie.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">{year}</p>
            </div>
            </div>
        </Link>
    )
}
