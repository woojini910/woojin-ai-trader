console.log("KEY:", process.env.OPENAI_API_KEY);
export default async function handler(req, res) {
  try {
    const { stock } = req.body;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "user", content: stock + " 주식 분석해줘" }
        ]
      })
    });

    const data = await r.json();

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "결과 없음"
    });

  } catch (e) {
    res.status(500).json({ result: "에러 발생" });
  }
}
