import Link from 'next/link'

interface PaginationProps {
    currentPage: number
    totalPages: number
    category: string
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
    // Generate 3 page numbers to show dynamically based on current page
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);

    // Adjust start if we're near the end
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }

    const pages = Array.from({ length: Math.min(3, totalPages) }, (_, i) => startPage + i);

    return (
        <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            {/* Page Numbers */}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={`/${category}?page=${page}`}
                    className={`w-10 h-10 rounded shadow-sm border font-bold text-sm transition flex items-center justify-center ${currentPage === page
                        ? 'bg-[#181818] text-yellow-500 border-[#181818]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {page}
                </Link>
            ))}

            {/* Next Page */}
            {currentPage < totalPages && (
                <Link
                    href={`/${category}?page=${currentPage + 1}`}
                    className="h-10 px-4 rounded shadow-sm border border-gray-200 bg-white text-gray-800 font-bold text-sm hover:bg-gray-50 flex items-center gap-1 transition"
                >
                    Next Page »
                </Link>
            )}

            {/* Last Page */}
            <Link
                href={`/${category}?page=${totalPages}`}
                className="h-10 px-4 rounded shadow-sm border border-gray-200 bg-white text-gray-800 font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center"
            >
                Last
            </Link>
        </div>
    )
}
