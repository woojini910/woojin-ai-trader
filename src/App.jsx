import { useState } from "react";

function App() {
  const [stock, setStock] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
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

    } catch (e) {
      setResult("API 에러");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>📊 우진 AI 트레이더</h1>

      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="종목 입력"
      />

      <button onClick={analyze}>분석</button>

      <p>{result}</p>
    </div>
  );
}

export default App;
