import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
  }

  _initialize() {
    if (!this.genAI) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
      }
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });
    }
  }

  async analyzeCode(code, filename = "code.js") {
    this._initialize();
    const prompt = `You are a security expert analyzing code for vulnerabilities. Analyze the following code for:
1. Security vulnerabilities (SQL injection, XSS, CSRF, insecure authentication, hardcoded secrets, etc.)
2. OWASP Top 10 issues
3. Performance issues
4. Code quality problems

Code file: ${filename}

\`\`\`
${code}
\`\`\`

Return ONLY a valid JSON array with the following structure (no markdown, no code blocks, just raw JSON):
[
  {
    "severity": "critical|high|medium|low|info",
    "line_number": <number or null>,
    "issue_type": "brief category like SQL Injection, XSS, etc.",
    "description": "detailed description of the issue",
    "fix_suggestion": "how to fix this issue"
  }
]

If no issues are found, return an empty array [].`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Clean up the response - remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "");
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/```\n?/g, "");
      }

      // Parse JSON
      const vulnerabilities = JSON.parse(cleanedText);

      // Validate structure
      if (!Array.isArray(vulnerabilities)) {
        throw new Error("Invalid response format: expected array");
      }

      return vulnerabilities;
    } catch (error) {
      console.error("Error analyzing code with Gemini:", error);
      throw new Error(`Failed to analyze code: ${error.message}`);
    }
  }

  async chatAboutVulnerability(question, context) {
    this._initialize();
    const prompt = `You are a security expert helping developers understand and fix security vulnerabilities.

Context:
${JSON.stringify(context, null, 2)}

User question: ${question}

Provide a clear, helpful answer focused on security best practices and how to fix the issue. Format your response using markdown with proper headings, bullet points, code blocks, and emphasis where appropriate. Use **bold** for important terms, *italics* for emphasis, and \`code\` for code snippets.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error in chat:", error);
      throw new Error(`Failed to get response: ${error.message}`);
    }
  }
}

export default new GeminiService();
