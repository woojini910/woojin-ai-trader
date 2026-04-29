import { useState, useEffect } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [stocks, setStocks] = useState([
    { name: "삼성전자", grade: "S", buy: 1500000000 },
    { name: "현대차", grade: "A", buy: 800000000 },
    { name: "두산로보틱스", grade: "B", buy: 420000000 },
    { name: "대원전선", grade: "C", buy: 180000000 }
  ]);

  useEffect(() => {
    if (localStorage.getItem("woojin-login") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    if (password === "kimwoom910") {
      localStorage.setItem("woojin-login", "true");
      setLoggedIn(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const logout = () => {
    localStorage.removeItem("woojin-login");
    setLoggedIn(false);
  };

  const gradeColor = (grade) => {
    if (grade === "S") return "#ff0000";
    if (grade === "A") return "#ff9900";
    if (grade === "B") return "#3399ff";
    return "#999999";
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>우진 AI 트레이더</h1>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, fontSize: 18 }}
        />
        <br /><br />
        <button onClick={login} style={{ padding: 12, fontSize: 18 }}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>📈 우진 AI 트레이더</h1>
      <button onClick={logout}>로그아웃</button>

      <h2 style={{ marginTop: 30 }}>실시간 매집 종목</h2>

      {stocks.map((stock, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 15,
            borderRadius: 10
          }}>
          <h3>{stock.name}</h3>
          <p style={{ color: gradeColor(stock.grade), fontWeight: "bold" }}>
            등급: {stock.grade}
          </p>
          <p>순매수 금액: {stock.buy.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
}
