const fs = require('fs');

async function getNews() {
    console.log("🔍 ChartSniper AI: Fetching latest BTC news...");
    try {
        // Using the free community aggregator
        const response = await fetch('https://free-crypto-news.vercel.app/api/news?q=bitcoin&limit=3', {
            headers: { 'User-Agent': 'ChartSniperAI/1.0' }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Map the data to your specific backend format
        const news = data.articles.map(a => ({
            title: a.title,
            source: a.source || "Crypto News",
            publishedAt: a.timeAgo || "Just Now"
        }));

        // Save to a temporary file for the YAML to read
        fs.writeFileSync('btc_news.json', JSON.stringify(news));
        console.log("✅ News saved to btc_news.json");
    } catch (error) {
        console.error("❌ News fetch failed:", error.message);
        // Save an empty array so JQ doesn't crash the pumper
        fs.writeFileSync('btc_news.json', '[]');
    }
}

getNews();