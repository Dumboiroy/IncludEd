'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function Page() {
	const [finalTranscript, setFinalTranscript] = useState('')
	const [liveCaption, setLiveCaption] = useState('')
	const [captionMode, setCaptionMode] = useState(true)

	const didStart = useRef(false)

	useEffect(() => {
		if (didStart.current) return
		didStart.current = true

		window.BloopAPI.onTranscriptionResult(async data => {
			if (
				data.text &&
				!data.text.toLowerCase().includes('ready for transcription')
			) {
				setFinalTranscript(prev => (prev + ' ' + data.text).trim())
				await new Promise(f => setTimeout(f, 500))
				setLiveCaption('') // Always clear live caption after final
			} else if (data.partial) {
				setLiveCaption(data.partial)
			}
		})

		window.BloopAPI.startTranscription()
	}, [])

	return (
		<main
			className={styles.container}
			onDoubleClick={() => setCaptionMode(prev => !prev)}
		>
			<div className={styles.captionContainer}>
				<p className={styles.liveCaption}>{liveCaption}</p>
				{!captionMode && (
					<p className={styles.finalTranscript}>{finalTranscript}</p>
				)}
			</div>
		</main>
	)
}
