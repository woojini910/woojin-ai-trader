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
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: stock + " 주식 분석해줘" }
        ]
      })
    });

    const text = await r.text(); // 🔥 중요

    console.log("응답:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ result: "JSON 파싱 실패", raw: text });
    }

    if (!r.ok) {
      return res.status(500).json({ result: "API 에러", error: data });
    }

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "결과 없음"
    });

  } catch (e) {
    res.status(500).json({ result: "서버 에러", error: e.message });
  }
}
