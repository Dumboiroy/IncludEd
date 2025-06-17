'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function SaveTextPage() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const originalText = decodeURIComponent(searchParams.get('text') || '')
	const [text, setText] = useState(originalText)
	const [showInfo, setShowInfo] = useState(false)

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			const active = document.activeElement as HTMLElement | null
			const tag = active?.tagName.toLowerCase()
			const isEditable =
				tag === 'input' || tag === 'textarea' || active?.isContentEditable

			if (isEditable) return

			const isMod = e.ctrlKey || e.metaKey
			const isShift = e.shiftKey

			if (isMod && isShift) {
				switch (e.key) {
					case 'ArrowLeft':
						window.electron?.moveWindow('left')
						break
					case 'ArrowRight':
						window.electron?.moveWindow('right')
						break
					case 'ArrowUp':
						window.electron?.moveWindow('up')
						break
					case 'ArrowDown':
						window.electron?.moveWindow('down')
						break
				}
			} else if (isMod && e.key.toLowerCase() === 'e') {
				router.replace('/')
			} else if (isMod && e.key.toLowerCase() === 'i') {
				window.electron.createPopupWindow()
			} else if (isMod && e.key === '=') {
				window.electron?.resizeWindow('increase')
			} else if (isMod && e.key === '-') {
				window.electron?.resizeWindow('decrease')
			} else if (isMod && e.key === 'f') {
				window.electron?.toggleFullscreen()
			} else if (isMod && e.key === 'ArrowUp') {
				window.electron?.resizeWindow('taller')
			} else if (isMod && e.key === 'ArrowDown') {
				window.electron?.resizeWindow('shorter')
			} else if (isMod && e.key === 'ArrowLeft') {
				window.electron?.resizeWindow('thinner')
			} else if (isMod && e.key === 'ArrowRight') {
				window.electron?.resizeWindow('wider')
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [])

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
			<p className={styles.normalText}>Press Cmd/Ctrl + I to show shortcuts</p>
		</main>
	)
}
