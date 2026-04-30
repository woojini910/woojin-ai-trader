import React, { useState } from 'react'

function App() {
  const [stock, setStock] = useState('')
  const [result, setResult] = useState('')

  const analyzeStock = () => {
    if (!stock) {
      setResult('종목명을 입력하세요')
      return
    }

    // 🔥 임시 AI 분석 로직 (나중에 API로 교체)
    if (stock.includes('삼성')) {
      setResult('📈 상승 가능성 높음 (AI 분석)')
    } else if (stock.includes('현대')) {
      setResult('⚖️ 횡보 예상')
    } else {
      setResult('📉 변동성 높음 (주의)')
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        type="text"
        placeholder="종목 입력 (예: 삼성전자)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '250px',
          marginRight: '10px'
        }}
      />

      <button
        onClick={analyzeStock}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        분석하기
      </button>

      <div style={{ marginTop: '30px', fontSize: '20px' }}>
        {result}
      </div>
    </div>
  )
}

export default App
