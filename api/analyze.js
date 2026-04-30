export default async function handler(req, res) {
  try {
    const { stock } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `${stock} 주식 전망 분석해줘. 매수/매도 포함`
          }
        ]
      })
    });

    const text = await response.text(); // 🔥 핵심

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        result: "OpenAI 응답 에러: " + text
      });
    }

    if (!response.ok) {
      return res.status(500).json({
        result: "OpenAI 오류: " + JSON.stringify(data)
      });
    }

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "분석 실패"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "서버 에러 발생" });
  }
}
