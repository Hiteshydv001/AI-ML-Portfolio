import { NextRequest, NextResponse } from 'next/server';

// Gemini API endpoint and key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Use gemini-1.5-flash for faster responses
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Gemini prompt for shape/object recognition
    const prompt = "What object or shape is drawn in this image? Respond with a single word label. If it's not clear, say 'unknown'.";

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/png", data: image } } // Pass raw base64 string (no data URL prefix)
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.1 // Lower temperature for more consistent responses
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

      if (!response.ok) {
        const err = await response.text();
        console.error("Gemini API error:", err);
        return NextResponse.json({ error: `Gemini API error: ${err}` }, { status: 500 });
    }

    const result = await response.json();
      console.log("Gemini API result:", JSON.stringify(result));
    // Parse Gemini response
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "unknown";
    
    // Clean and process the response text
    const cleanText = text.toLowerCase().trim();
    let predictions = [];
    
    // If the response contains multiple words/guesses (e.g., "looks like a circle or maybe a sun")
    const possibleLabels = cleanText.split(/(?:,|\sor\s|\sand\s|\sit\'s\s(?:a\s)?|\slooks\s(?:like\s(?:a\s)?)?)/i)
      .map((label: string) => label.trim())
      .filter((label: string) => label.length > 0)
      .slice(0, 3); // Take up to 3 guesses

    // Convert to predictions with decreasing confidence
    predictions = possibleLabels.map((label: string, index: number) => ({
      label,
      confidence: Math.max(0.1, 1 - (index * 0.3)) // 1.0, 0.7, 0.4 for consecutive guesses
    }));

    // If no valid predictions, return unknown
    if (predictions.length === 0) {
      predictions = [{ label: "unknown", confidence: 0.1 }];
    }

    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Error processing drawing:', error);
    return NextResponse.json({ error: "Failed to analyze drawing" }, { status: 500 });
  }
}
