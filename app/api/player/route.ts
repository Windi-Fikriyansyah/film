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
        // Build VIP player URL sesuai doc
        const playerUrl = new URL('https://multiembed.mov/directstream.php')
        playerUrl.searchParams.append('video_id', videoId)

        if (tmdb === '1') {
            playerUrl.searchParams.append('tmdb', '1')
        }

        if (season) {
            playerUrl.searchParams.append('s', season)
        }

        if (episode) {
            playerUrl.searchParams.append('e', episode)
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
