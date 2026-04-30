import { useState } from "react";

function App() {
  const [stock, setStock] = useState("");
  const [result, setResult] = useState("");

  const analyzeStock = async () => {
    setResult("분석중...");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ stock })
      });

      const data = await res.json();
      setResult(data.result);

    } catch (error) {
      setResult("에러 발생");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="종목 입력 (예: 삼성전자)"
      />

      <button onClick={analyzeStock}>분석</button>

      <p>{result}</p>
    </div>
  );
}

export default App;
