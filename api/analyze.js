export default async function handler(req, res) {
  const { stock } = req.query

  // 🔹 종목 코드 자동 매핑 (확장 가능)
  let symbol = 'AAPL'
  if (stock.includes('삼성')) symbol = '005930.KS'
  if (stock.toLowerCase().includes('tesla')) symbol = 'TSLA'

  // 🔹 1️⃣ 주가
  const priceRes = await fetch(
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
  )
  const priceData = await priceRes.json()
  const price =
    priceData.quoteResponse.result[0]?.regularMarketPrice || 0

  // 🔹 2️⃣ 뉴스 (무료 RSS)
  const newsRes = await fetch(
    `https://api.allorigins.win/raw?url=https://news.google.com/rss/search?q=${stock}`
  )
  const newsText = await newsRes.text()

  const news = newsText
    .split('<title>')
    .slice(2, 5)
    .map((n) => n.split('</title>')[0])

  // 🔹 3️⃣ 점수 로직
  let score = 50
  if (price > 70000) score = 80
  if (price < 50000) score = 30

  // 🔹 4️⃣ GPT 분석 (환경변수 사용 🔐)
  let ai = '분석 불가'

  try {
    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `${stock} 주식 분석해줘. 매수/매도 의견`
          }
        ]
      })
    })

    const gptData = await gptRes.json()
    ai = gptData.choices?.[0]?.message?.content || ai
  } catch (e) {}

  // 🔹 5️⃣ 차트 (간단 이미지)
  const chart = `https://quickchart.io/chart?c={
    type:'line',
    data:{labels:['1','2','3','4'],datasets:[{data:[10,20,15,30]}]}
  }`

  res.status(200).json({
    price,
    score,
    ai,
    news,
    chart
  })
}
