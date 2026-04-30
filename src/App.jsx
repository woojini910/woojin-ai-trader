import React, { useState } from 'react'

function App() {
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState(null)
  const [news, setNews] = useState([])
  const [signal, setSignal] = useState('')

  // 🔥 1️⃣ 주가 가져오기 (야후 API 우회)
  const getStockPrice = async (symbol) => {
    try {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
      )
      const data = await res.json()
      return data.quoteResponse.result[0]?.regularMarketPrice
    } catch (e) {
      return null
    }
  }

  // 🔥 2️⃣ 뉴스 가져오기 (간단 RSS)
  const getNews = async (keyword) => {
    try {
      const res = await fetch(
        `https://api.allorigins.win/raw?url=https://news.google.com/rss/search?q=${keyword}`
      )
      const text = await res.text()
      return text.slice(0, 300) // 간단 표시용
    } catch {
      return '뉴스 불러오기 실패'
    }
  }

  // 🔥 3️⃣ 분석
  const analyze = async () => {
    if (!stock) return

    // 종목 코드 간단 매핑
    let symbol = 'AAPL'
    if (stock.includes('삼성')) symbol = '005930.KS'
    if (stock.includes('현대')) symbol = '005380.KS'

    const p = await getStockPrice(symbol)
    setPrice(p)

    const n = await getNews(stock)
    setNews(n)

    // 🔥 간단 AI 느낌 분석
    if (p > 70000) {
      setSignal('📈 매수 우세')
    } else if (p > 50000) {
      setSignal('⚖️ 중립')
    } else {
      setSignal('📉 매도 우세')
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        placeholder="종목 입력 (삼성전자)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={analyze}>분석</button>

      <div style={{ marginTop: '20px' }}>
        <p>💰 현재가: {price || '-'}</p>
        <p>🧠 AI 신호: {signal}</p>
        <p>📰 뉴스 요약:</p>
        <div style={{ fontSize: '12px' }}>{news}</div>
      </div>
    </div>
  )
}

export default App
