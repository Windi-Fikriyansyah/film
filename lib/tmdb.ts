const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

export async function getTMDBData(endpoint: string, params: string = '') {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
        console.warn('TMDB_API_KEY is missing or using placeholder in .env.local');
        return null;
    }

    // Detect if it's a v4 token (JWT) or v3 API Key
    const isJWT = TMDB_API_KEY.startsWith('eyJ');

    const baseUrl = `${TMDB_BASE_URL}${endpoint}`;
    const queryParams = `?language=id-ID${params}${!isJWT ? `&api_key=${TMDB_API_KEY}` : ''}`;
    const url = `${baseUrl}${queryParams}`;

    const headers: HeadersInit = {
        accept: 'application/json',
    };

    if (isJWT) {
        headers['Authorization'] = `Bearer ${TMDB_API_KEY}`;
    }

    try {
        const response = await fetch(url, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`TMDB Error: ${response.status} ${response.statusText}`, errorData);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('TMDB Network/Fetch Error:', error);
        return null;
    }
}

export function getTMDBImageUrl(path: string | null) {
    if (!path) return 'https://via.placeholder.com/400x600?text=No+Poster';
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}${path}`;
}
