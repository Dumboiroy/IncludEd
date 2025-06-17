import axios from 'axios'

const GEMINI_API_URL =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export async function askGemini(
	apiKey: string,
	prompt: string
): Promise<string> {
	try {
		const response = await axios.post(
			`${GEMINI_API_URL}?key=${apiKey}`,
			{
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
			},
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)

		const candidates = response.data.candidates
		if (!candidates || candidates.length === 0)
			return 'No response from Gemini.'

		return candidates[0].content.parts[0].text || 'Empty response.'
	} catch (err: any) {
		console.error('Gemini API Error:', err?.response?.data || err.message)
		return 'Failed to fetch response from Gemini.'
	}
}
