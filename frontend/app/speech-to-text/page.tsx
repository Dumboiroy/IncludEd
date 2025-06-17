'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Page() {
	const [finalTranscript, setFinalTranscript] = useState('')
	const [liveCaption, setLiveCaption] = useState('')
	const [captionMode, setCaptionMode] = useState(true)
	const [reset, setReset] = useState(false)

	const didStart = useRef(false)

	const router = useRouter()

	useEffect(() => {
		if (didStart.current) return
		didStart.current = true

		if (window.electron && window.electron.makeWindowOverlay) {
			window.electron.makeWindowOverlay()
		}

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

	useEffect(() => {
		if (reset && window.electron?.resetOverlay) {
			window.electron.resetOverlay()
			console.log('Reset triggered')
			setReset(false)
			router.replace('/')
		}
	}, [reset])

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === 'e') {
				setReset(true)
			}
		}

		window.addEventListener('keydown', handleKeyPress)

		// Cleanup to prevent memory leaks
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
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
