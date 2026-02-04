'use client'

import { Star, Clock, Calendar, Users, Play } from 'lucide-react'
import { getTMDBImageUrl } from '@/lib/tmdb'
import { useState } from 'react'

interface Genre {
    id: number
    name: string
}

interface MovieDetailData {
    adult: boolean
    backdrop_path: string | null
    genres: Genre[]
    id: number
    imdb_id?: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    runtime: number
    status: string
    tagline: string
    title: string
    vote_average: number
    vote_count: number
}

interface MovieDetailProps {
    movie: MovieDetailData
}

export default function MovieDetail({ movie }: MovieDetailProps) {
    const [showPlayer, setShowPlayer] = useState(false)
    const [playerUrl, setPlayerUrl] = useState<string>('')
    const [playerError, setPlayerError] = useState<string>('')

    const poster = getTMDBImageUrl(movie.poster_path)
    const backdrop = getTMDBImageUrl(movie.backdrop_path)
    const rating = movie.vote_average?.toFixed(1) || '0.0'
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
    const hours = Math.floor(movie.runtime / 60)
    const minutes = movie.runtime % 60

    // Fetch player URL dari API route
    const handlePlayClick = async () => {
        try {
            setPlayerError('')
            const apiUrl = movie.imdb_id
                ? `/api/player?video_id=${movie.imdb_id}`
                : `/api/player?video_id=${movie.id}&tmdb=1`

            const response = await fetch(apiUrl)
            const data = await response.json()

            if (!response.ok || !data.url) {
                setPlayerError('Player tidak tersedia untuk film ini')
                return
            }

            setPlayerUrl(data.url)
            setShowPlayer(true)
        } catch (error) {
            console.error('Error fetching player:', error)
            setPlayerError('Gagal memuat player')
        }
    }

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Backdrop Image */}
            <div className="relative w-full h-screen max-h-[600px] overflow-hidden">
                <img
                    src={backdrop}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
            </div>

            {/* Content Container */}
            <div className="relative -mt-48 px-4 sm:px-6 md:px-8 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Poster */}
                        <div className="flex justify-center md:justify-start">
                            <div className="rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={poster}
                                    alt={movie.title}
                                    className="w-full h-auto aspect-[2/3] object-cover max-w-xs"
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2 text-white">
                            {/* Title & Tagline */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                                {movie.original_title && movie.original_title !== movie.title && (
                                    <p className="text-gray-400 text-sm mb-2">Original: {movie.original_title}</p>
                                )}
                                {movie.tagline && (
                                    <p className="text-lg text-gray-400 italic mb-4">"{movie.tagline}"</p>
                                )}
                            </div>

                            {/* Rating & Stats */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <span className="font-bold text-lg">{rating}</span>
                                    <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                                </div>
                                {movie.status && (
                                    <span className="px-4 py-2 bg-blue-500/20 rounded-lg text-sm font-medium">
                                        {movie.status}
                                    </span>
                                )}
                                {movie.adult && (
                                    <span className="px-4 py-2 bg-red-500/20 rounded-lg text-sm font-medium text-red-400">
                                        18+
                                    </span>
                                )}
                            </div>

                            {/* Release Date & Runtime & Popularity */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                {movie.release_date && (
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Tanggal Rilis</p>
                                            <span>{movie.release_date}</span>
                                        </div>
                                    </div>
                                )}
                                {movie.runtime > 0 && (
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Clock className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Durasi</p>
                                            <span>
                                                {hours}h {minutes}m
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {movie.popularity > 0 && (
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Users className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Popularitas</p>
                                            <span>{movie.popularity.toFixed(1)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Genres */}
                            {movie.genres && movie.genres.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Genre</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full text-sm hover:bg-red-600/50 transition-colors cursor-pointer"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Play Button */}
                            <div className="mb-6">
                                <button
                                    onClick={handlePlayClick}
                                    disabled={showPlayer}
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-default transition-colors px-6 py-3 rounded-lg font-semibold text-white"
                                >
                                    <Play className="w-5 h-5 fill-white" />
                                    {showPlayer ? 'Loading Player...' : 'Tonton Sekarang'}
                                </button>
                                {playerError && (
                                    <p className="text-red-400 text-sm mt-2">{playerError}</p>
                                )}
                            </div>

                            {/* Video Player */}
                            {showPlayer && playerUrl && (
                                <div className="mb-6 rounded-lg overflow-hidden">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-semibold text-white">Video Player</h3>
                                        <button
                                            onClick={() => {
                                                setShowPlayer(false)
                                                setPlayerUrl('')
                                            }}
                                            className="text-gray-400 hover:text-white text-sm"
                                        >
                                            ✕ Tutup
                                        </button>
                                    </div>
                                    <iframe
                                        src={playerUrl}
                                        allowFullScreen
                                        referrerPolicy="origin"
                                        className="w-full aspect-video bg-black rounded-lg"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                    />
                                </div>
                            )}

                            {/* Overview */}
                            {movie.overview && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
                                    <p className="text-gray-300 leading-relaxed text-justify">{movie.overview}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
