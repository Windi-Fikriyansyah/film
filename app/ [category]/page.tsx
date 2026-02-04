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
    const { category } = params
    const page = searchParams.page || '1'

    // Map slugs to TMDB endpoints
    const categoryMap: { [key: string]: any } = {
        'cinema-xxi': { title: 'Cinema XXI', endpoint: '/movie/now_playing', region: '&region=ID' },
        'film-terbaru': { title: 'Film Terbaru', endpoint: '/movie/popular', region: '' },
    }

    const categoryInfo = categoryMap[category]
    if (!categoryInfo) notFound()

    // Fetch data from TMDB
    const data = await getTMDBData(categoryInfo.endpoint, `&page=${page}${categoryInfo.region}`)
    const movies = data?.results || []
    const totalPages = data?.total_pages > 500 ? 500 : data?.total_pages || 1 // TMDB limits to 500 pages

    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />

            <div className="pt-24 pb-12 text-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-2xl font-extrabold">
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
