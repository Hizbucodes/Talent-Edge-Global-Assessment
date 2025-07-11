import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const getCourseSuggestions = async (req, res) => {
  const { prompt } = req.body;

  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ message: "Your not authorized to access this feature" });
  }

  if (!prompt) {
    return res.status(400).json({ message: "Please enter a valid prompt." });
  }

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5",
      messages: [
        {
          role: "user",
          content: `Suggest a list of online courses for this user prompt: "${prompt}". List them clearly.`,
        },
      ],
      max_tokens: 250,
    });

    const message = gptResponse.choices[0].message.content;

    return res.status(200).json({ suggestions: message });
  } catch (error) {
    console.error("GPT Error:", error);
    if (error.response?.status === 401) {
      return res.status(401).json({
        message: "Invalid or expired API key.",
      });
    }
    return res
      .status(500)
      .json({ message: "Failed to get suggestions from AI" });
  }
};
