export default async function handler(req, res) {
  try {
    const { stock } = req.body;

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `${stock} 주식 분석해줘`
      })
    });

    const data = await r.json();

    res.status(200).json({
      result: data.output?.[0]?.content?.[0]?.text || "결과 없음"
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ result: "서버 에러" });
  }
}
