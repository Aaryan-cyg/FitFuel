const API_KEY = "AIzaSyCqf5uLqFhoJPf8DGkk-jWyc8LdUMu041k"; 

export async function generateMealPlan(data) {
  const prompt = `Create a detailed 7-day meal plan.

User Requirements:
Calories: ${data.calories}
Protein: ${data.protein}g
Carbs: ${data.carbs}g
Fats: ${data.fats}g
Goal: ${data.goal}
Activity: ${data.activity}

IMPORTANT:
- Each day MUST include breakfast, lunch, dinner, snacks
- Each meal MUST have actual food items (not empty)
- Use realistic meals (like oats, eggs, chicken, rice, etc.)

Return ONLY valid JSON (no markdown, no explanation):

{
  "day1": {
    "breakfast": "meal",
    "lunch": "meal",
    "dinner": "meal",
    "snacks": "meal"
  },
  "day2": {
    "breakfast": "meal",
    "lunch": "meal",
    "dinner": "meal",
    "snacks": "meal"
  }
}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: "application/json" // Ensures the output is pure JSON
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("HTTP Error:", response.status, errorData);
      return null;
    }

    const dataRes = await response.json();
    const text = dataRes.candidates[0].content.parts[0].text;
    console.log("AI TEXT:", text);
    return JSON.parse(text);

  } catch (err) {
    console.error("Gemini Fetch ERROR:", err);
    return null;
  }
}