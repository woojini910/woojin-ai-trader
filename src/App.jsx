import React, { useState } from 'react'

function App() {
  const [stock, setStock] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!stock) return
    setLoading(true)

    try {
      const res = await fetch(`/api/analyze?stock=${stock}`)
      const result = await res.json()
      setData(result)
    } catch (e) {
      alert('에러 발생')
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        placeholder="종목 입력 (삼성전자, Tesla 등)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={analyze}>
        분석
      </button>

      {loading && <p>분석중...</p>}

      {data && (
        <div style={{ marginTop: '20px' }}>
          <p>💰 가격: {data.price}</p>
          <p>📊 점수: {data.score}/100</p>
          <p>🧠 AI 분석: {data.ai}</p>
          <p>📰 뉴스:</p>
          <ul>
            {data.news.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
