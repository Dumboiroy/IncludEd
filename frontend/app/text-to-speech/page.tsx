'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css' // Assume you have or will create appropriate CSS
import { useRouter } from 'next/navigation'
import '../globals.css'

export default function TextToSpeechPage() {
	const [text, setText] = useState('')
	const [voice, setVoice] = useState('af_heart')
	const [audioPath, setAudioPath] = useState<string | null>(null)
	const [status, setStatus] = useState<
		'idle' | 'generating' | 'done' | 'error'
	>('idle')
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		window.BloopAPI.onSpeechResult((data: any) => {
			setAudioPath(data.audioUrl)
			setStatus('done')
		})

		window.BloopAPI.onSpeechError(err => {
			setError(err)
			setStatus('error')
		})

		return () => {
			window.BloopAPI.removeAllSpeechListeners()
		}
	}, [])

	const handleGenerate = () => {
		if (!text.trim()) return
		setStatus('generating')
		setAudioPath(null)
		setError(null)

		window.BloopAPI.generateSpeech({ text, voice })
	}

	const handleExit = () => {
		router.replace('/')
	}

	return (
		<main className={styles.container}>
			<textarea
				className={styles.textarea}
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Enter text here..."
				rows={5}
			/>

			<select
				className={styles.select}
				value={voice}
				onChange={e => setVoice(e.target.value)}
			>
				<option className={styles.normalText} value="af_heart">
					af_heart
				</option>
				{/* Add more voices here */}
			</select>

			<div className={styles.buttonContainer}>
				<button onClick={handleGenerate} className={styles.button}>
					Generate Speech
				</button>
				<button onClick={handleExit} className={styles.button}>
					Return to Homepage
				</button>
			</div>

			{status === 'generating' && (
				<p className={styles.status}>Generating speech...</p>
			)}

			{audioPath && (
				<div className={styles.audioContainer}>
					<audio controls autoPlay className={styles.audio}>
						<source src={audioPath} type="audio/wav" />
						Your browser does not support audio playbook.
					</audio>
				</div>
			)}
		</main>
	)
}
