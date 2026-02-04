import Navbar from '@/components/Navbar'
import MovieDetail from '@/components/MovieDetail'
import Footer from '@/components/Footer'
import { getTMDBData } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: PageProps) {
    const { id: movieId } = await params
    const movie = await getTMDBData(`/movie/${movieId}`)

    if (!movie) {
        return {
            title: 'Film Tidak Ditemukan - REBAHIN',
        }
    }

    return {
        title: `${movie.title} - REBAHIN`,
        description: movie.overview,
    }
}

export default async function MoviePage({ params }: PageProps) {
    const { id: movieId } = await params
    const movie = await getTMDBData(`/movie/${movieId}`)

    if (!movie) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />
            <MovieDetail movie={movie} />
            <Footer />
        </main>
    )
}
