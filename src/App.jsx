import React, { useState } from 'react'

function App() {
  const [stock, setStock] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!stock) return
    setLoading(true)

    const res = await fetch(`/api/analyze?stock=${stock}`)
    const result = await res.json()

    setData(result)
    setLoading(false)
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        placeholder="종목 입력"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button onClick={analyze}>분석</button>

      {loading && <p>분석중...</p>}

      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>{stock}</h2>
          <p>💰 가격: {data.price}</p>
          <p>📊 점수: {data.score}/100</p>
          <p>🧠 AI 분석: {data.ai}</p>

          <h3>📰 뉴스</h3>
          <ul>
            {data.news.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>

          <h3>📈 차트</h3>
          <img src={data.chart} width="400" />
        </div>
      )}
    </div>
  )
}

export default App
