'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Page() {
	const [finalTranscript, setFinalTranscript] = useState('')
	const [liveCaption, setLiveCaption] = useState('')

	useEffect(() => {
		window.BloopAPI.onTranscriptionResult(data => {
			if (data.text) {
				// Final result — append it
				setFinalTranscript(prev => (prev + ' ' + data.text).trim())
				setLiveCaption('') // Clear caption
			} else if (data.partial) {
				// Update live caption
				setLiveCaption(data.partial)
			}
		})
	}, [])

	return (
		<main className={styles.container}>
			<button
				onClick={() => window.BloopAPI.startTranscription()}
				className={styles.button}
			>
				Start Transcription
			</button>

			<div className={styles.captionContainer}>
				<p className={styles.liveCaption}>{liveCaption}</p>
				<p className={styles.finalTranscript}>{finalTranscript}</p>
			</div>
		</main>
	)
}
