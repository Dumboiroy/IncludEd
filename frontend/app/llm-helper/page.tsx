'use client'

import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function GeminiOverlayPage() {
	const router = useRouter()
	const [prompt, setPrompt] = useState('')
	const [response, setResponse] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (window.electron?.makeGeminiWindowOverlay) {
			window.electron.makeGeminiWindowOverlay()
		}
	})
	useEffect(() => {
		if (loading) {
			// show loading
		}
	})

	const handleAsk = async () => {
		if (!prompt.trim()) return
		setLoading(true)
		const result = await window.GeminiAPI.ask(prompt)
		setResponse(result)
		console.log('Gemini response:', result)
		setLoading(false)
	}

	const handleExit = () => {
		window.electron.resetOverlay()
		router.replace('/')
	}

	return (
		<main className={styles.container} onDoubleClick={handleAsk}>
			<textarea
				className={styles.textarea}
				placeholder="Ask Gemini something..."
				value={prompt}
				onChange={e => setPrompt(e.target.value)}
			/>
			<div className={styles.buttonRow}>
				<button onClick={handleAsk} className={styles.button}>
					Ask Gemini
				</button>
				<button className={styles.button} onClick={handleExit}>
					Exit
				</button>
			</div>
			{response && (
				<div className={styles.responseContainer}>
					<Markdown>{response}</Markdown>
				</div>
			)}
		</main>
	)
}
