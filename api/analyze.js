export default async function handler(req, res) {
  const { stock } = req.query

  // 🔥 간단 종목 매핑
  let symbol = 'AAPL'
  if (stock.includes('삼성')) symbol = '005930.KS'
  if (stock.toLowerCase().includes('tesla')) symbol = 'TSLA'

  // 1️⃣ 주가
  const priceRes = await fetch(
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
  )
  const priceData = await priceRes.json()
  const price =
    priceData.quoteResponse.result[0]?.regularMarketPrice || 0

  // 2️⃣ 뉴스 (간단)
  const news = [
    `${stock} 관련 뉴스1`,
    `${stock} 관련 뉴스2`,
    `${stock} 관련 뉴스3`
  ]

  // 3️⃣ 점수 계산
  let score = 50
  if (price > 100) score = 80
  if (price < 50) score = 30

  // 4️⃣ AI 분석 (간단 버전)
  let ai = '중립'
  if (score > 70) ai = '매수 유망'
  if (score < 40) ai = '매도 주의'

  res.status(200).json({
    price,
    score,
    ai,
    news
  })
}
