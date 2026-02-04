import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MovieCard from '@/components/MovieCard'
import Pagination from '@/components/Pagination'
import { getTMDBData } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

export default async function CategoryPage({
    params,
    searchParams
}: {
    params: { category: string },
    searchParams: { page?: string }
}) {
    const resolvedParams = await params
    const resolvedSearchParams = await searchParams
    const { category } = resolvedParams
    const page = resolvedSearchParams.page || '1'

    // Map slugs to TMDB endpoints
    const categoryMap: { [key: string]: any } = {
        'cinema-xxi': { title: 'Cinema XXI', endpoint: '/movie/now_playing', region: '&region=ID' },
        'film-terbaru': { title: 'Film Terbaru', endpoint: '/movie/popular', region: '' },
    }

    const categoryInfo = categoryMap[category]
    if (!categoryInfo) notFound()

    // Fetch data from TMDB
    // Fetch data from TMDB (Combine two pages to get 24 items)
    const p1 = await getTMDBData(categoryInfo.endpoint, `&page=${page}${categoryInfo.region}`)
    const p2 = await getTMDBData(categoryInfo.endpoint, `&page=${Number(page) + 1}${categoryInfo.region}`)

    const allMovies = [...(p1?.results || []), ...(p2?.results || [])]

    // Ensure unique movies by ID to avoid React key errors
    const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values())
    const movies = uniqueMovies.slice(0, 24)
    const totalPages = p1?.total_pages > 500 ? 500 : p1?.total_pages || 1

    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />

            <div className="pt-24 pb-12 text-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-2xl font-extrabold uppercase tracking-tight">
                            {categoryInfo.title}
                        </h1>
                    </div>

                    {/* 8 Column Grid */}
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {movies.map((movie: any) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            Gagal memuat film. Silakan periksa koneksi atau API Key TMDB Anda.
                        </div>
                    )}

                    {/* Custom Pagination */}
                    <Pagination currentPage={parseInt(page)} totalPages={totalPages} category={category} />
                </div>
            </div>

            <Footer />
        </main>
    )
}
