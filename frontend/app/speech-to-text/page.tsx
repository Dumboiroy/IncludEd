'use client'
import { useEffect, useState } from 'react'

export default function Page() {
	const [transcript, setTranscript] = useState('')

	useEffect(() => {
		window.BloopAPI.onTranscriptionResult(data => {
			const newText = data.text || data.partial || ''
			setTranscript(prev => prev + '\n' + newText)
		})
	}, [])

	return (
		<main>
			<button onClick={() => window.BloopAPI.startTranscription()}>
				Start Transcription
			</button>
			<pre>{transcript}</pre>
		</main>
	)
}
