'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function SaveTextPage() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const originalText = decodeURIComponent(searchParams.get('text') || '')
	const [text, setText] = useState(originalText)

	const handleReset = () => setText(originalText)
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text)
			alert('Copied to clipboard')
		} catch (err) {
			alert('Copy failed')
		}
	}

	const handleExit = () => {
		router.replace('/')
	}

	return (
		<main className={styles.container}>
			<p className={styles.normalText}>Would you like to save your text?</p>
			<textarea
				value={text}
				onChange={e => setText(e.target.value)}
				className={styles.textbox}
			/>
			<div
				className={styles.buttonContainer}
				style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}
			>
				<button className={styles.button} onClick={handleReset}>
					Reset Text
				</button>
				<button className={styles.button} onClick={handleCopy}>
					Copy Text
				</button>
				<button className={styles.button} onClick={handleExit}>
					Exit
				</button>
			</div>
		</main>
	)
}
