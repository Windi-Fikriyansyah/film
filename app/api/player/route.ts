export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('video_id')
    const tmdb = searchParams.get('tmdb')
    const season = searchParams.get('season')
    const episode = searchParams.get('episode')

    if (!videoId) {
        return new Response(JSON.stringify({ error: 'Missing video_id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    try {
        // Build VIP player URL sesuai doc
        let playerUrl: string

        if (season && episode) {
            // Series: https://godriveplayer.com/player.php?type=series&tmdb={id}&season={season}&episode={episode}
            playerUrl = `https://godriveplayer.com/player.php?type=series&tmdb=${videoId}&season=${season}&episode=${episode}`
        } else {
            // Movie: https://godriveplayer.com/player.php?imdb={id}
            // Note: Documentation requires IMDB ID (tt prefix).
            // If videoId is TMDB ID (tmdb=1), this implementation might fail if provider requires strict IMDB ID.
            if (tmdb === '1') {
                // Fallback attempt using tmdb param for movie if supported (undocumented but common)
                playerUrl = `https://godriveplayer.com/player.php?tmdb=${videoId}`
            } else {
                playerUrl = `https://godriveplayer.com/player.php?imdb=${videoId}`
            }
        }

        // Return URL untuk di-embed di iframe
        return new Response(JSON.stringify({
            url: playerUrl.toString()
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error('VIP Player API Error:', error)
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
