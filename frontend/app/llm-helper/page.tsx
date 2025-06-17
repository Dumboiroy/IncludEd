'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './page.module.css'

export default function GeminiOverlayPage() {
	const [prompt, setPrompt] = useState('')
	const [response, setResponse] = useState('')

	useEffect(() => {
		if (window.electron?.makeWindowOverlay) {
			window.electron.makeWindowOverlay()
		}
	}, [])

	const handleAsk = async () => {
		if (!prompt.trim()) return
		const result = await window.GeminiAPI.ask(prompt)
		setResponse(result)
	}

	return (
		<main className={styles.container} onDoubleClick={handleAsk}>
			<textarea
				className={styles.captionContainer}
				placeholder="Ask Gemini something..."
				value={prompt}
				onChange={e => setPrompt(e.target.value)}
			/>
			<button onClick={handleAsk} className={styles.button}>
				Ask
			</button>
			{response && (
				<div className={styles.finalTranscript}>
					<ReactMarkdown>{response}</ReactMarkdown>
				</div>
			)}
		</main>
	)
}
