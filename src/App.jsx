import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "kimwoom910") {
      setLoggedIn(true);
    } else {
      alert("비밀번호 틀림");
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 30 }}>
        <h1>우진 AI 트레이더</h1>

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <button onClick={login} style={{ padding: 10 }}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>우진 AI 트레이더</h1>
      <h2>실시간 매집 종목</h2>

      <div style={{ border: "1px solid #ddd", padding: 15, marginTop: 10 }}>
        <h3>대원전선</h3>
        <p>등급: A+</p>
        <p>순매수 금액: 120억원</p>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 15, marginTop: 10 }}>
        <h3>현대차</h3>
        <p>등급: A</p>
        <p>순매수 금액: 95억원</p>
      </div>

      <div style={{ border: "1px solid #ddd", padding: 15, marginTop: 10 }}>
        <h3>삼성SDI</h3>
        <p>등급: B+</p>
        <p>순매수 금액: 61억원</p>
      </div>
    </div>
  );
}
