import { useState, useEffect } from "react";

export default function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [password, setPassword] = useState("");

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

if (!loggedIn) {
return (
<div style={{background:"#000",color:"#d4af37",minHeight:"100vh",padding:"30px"}}>
<h1>우진 AI 트레이더 PRO 🔒</h1>
<p>비밀번호를 입력하세요</p>
<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{padding:"10px",width:"220px"}}
/>
<br /><br />
<button onClick={login}>로그인</button>
</div>
);
}

return (
<div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:"20px"}}>
<h1 style={{color:"#d4af37"}}>우진 AI 트레이더 PRO</h1>
<p>실시간 분석 시스템</p>

  <div style={{border:"1px solid #d4af37",padding:"15px",marginTop:"20px"}}>
    <h3>오늘 강한 종목 TOP3</h3>
    <p>대원전선 🔴🔴🔴 SSS</p>
    <p>삼성전기 🔴🔴🔵 SSA</p>
    <p>현대차 🔴🔵🟢 SAB</p>
  </div>

  <div style={{border:"1px solid #d4af37",padding:"15px",marginTop:"20px"}}>
    <h3>종목 검색</h3>
    <input placeholder="종목명 또는 코드" style={{padding:"10px"}} />
    <button style={{marginLeft:"10px"}}>분석</button>
  </div>

  <div style={{marginTop:"20px"}}>
    <button onClick={logout}>로그아웃</button>
  </div>
</div>

);
}
