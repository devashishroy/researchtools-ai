export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const {
      objective = "",
      audience = "",
      questionCount = 10,
      researchType = "Quantitative",
      style = "Professional"
    } = body;

    if (!objective.trim()) {
      return Response.json(
        { error: "Research objective is required." },
        { status: 400 }
      );
    }

    if (objective.length > 2000 || audience.length > 1000) {
      return Response.json(
        { error: "Input is too long." },
        { status: 400 }
      );
    }

    const prompt = `
Create a professional market research questionnaire.

Research Objective:
${objective}

Target Audience:
${audience || "General target audience"}

Number of Questions:
${Math.min(Math.max(Number(questionCount) || 10, 5), 30)}

Research Type:
${researchType}

Style:
${style}

Requirements:
- Create clear, unbiased research questions.
- Avoid leading or double-barrelled questions.
- Use appropriate response options.
- Include screening questions where useful.
- Include demographic questions only when relevant.
- Organize the questionnaire into logical sections.
- Clearly label question type.
- Provide response options for closed-ended questions.
- Make the questionnaire practical for professional market research.
- Do not invent research findings.
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${context.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          input: prompt,
          max_output_tokens: 5000
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return Response.json(
        {
          error: "AI service request failed.",
          details: errorText.substring(0, 500)
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    return Response.json({
      success: true,
      result: data.output_text || "No questionnaire was generated."
    });

  } catch (error) {
    return Response.json(
      {
        error: "Unable to generate questionnaire."
      },
      { status: 500 }
    );
  }
}
