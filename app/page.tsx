import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MovieGridSection from '@/components/MovieGridSection'
import Footer from '@/components/Footer'
import { getTMDBData } from '@/lib/tmdb'

export default async function Home() {
    // Fetch multiple pages to get at least 24 items (TMDB returns 20 per page)
    const nowPlaying1 = await getTMDBData('/movie/now_playing', '&region=ID&page=1')
    const nowPlaying2 = await getTMDBData('/movie/now_playing', '&region=ID&page=2')

    const popular1 = await getTMDBData('/movie/popular', '&page=1')
    const popular2 = await getTMDBData('/movie/popular', '&page=2')

    const combinedNowPlaying = [...(nowPlaying1?.results || []), ...(nowPlaying2?.results || [])]
    const combinedPopular = [...(popular1?.results || []), ...(popular2?.results || [])]

    // Ensure unique movies by ID
    const nowPlayingResults = Array.from(new Map(combinedNowPlaying.map(m => [m.id, m])).values())
    const popularResults = Array.from(new Map(combinedPopular.map(m => [m.id, m])).values())

    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />
            <Hero />

            {/* Movie Content */}
            <div className="relative z-10 pt-4">
                <MovieGridSection
                    title="Cinema XXI"
                    slug="cinema-xxi"
                    movies={nowPlayingResults}
                    maxItems={24}
                />

                <MovieGridSection
                    title="Film Terbaru"
                    slug="film-terbaru"
                    movies={popularResults}
                    maxItems={24}
                />
            </div>

            <Footer />
        </main>
    )
}
