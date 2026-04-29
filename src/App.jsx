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
        />
        <button onClick={login}>로그인</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>우진 AI 트레이더</h1>
      <h2>실시간 매집 종목</h2>

      <div>
        <h3>대원전선</h3>
        <p>등급: A+</p>
      </div>

      <div>
        <h3>현대차</h3>
        <p>등급: A</p>
      </div>
    </div>
  );
}
