'use client'
import React, { useEffect } from 'react'
import styles from './ShortcutsModal.module.css'

const ShortcutsModal = () => {
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			const active = document.activeElement as HTMLElement | null
			const tag = active?.tagName.toLowerCase()
			const isEditable =
				tag === 'input' || tag === 'textarea' || active?.isContentEditable

			if (isEditable) return

			const isMod = e.ctrlKey || e.metaKey

			if (isMod && e.key.toLowerCase() === 'i') {
				window.electron.closeWindow()
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [])

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<h2>Shortcuts</h2>
				<ul>
					<li>
						<b>Cmd/Ctrl + E</b>: Exit
					</li>
					<li>
						<b>Cmd/Ctrl + I</b>: Hide Shortcuts
					</li>
					<li>
						<b>Cmd/Ctrl + =</b>: Increase window size
					</li>
					<li>
						<b>Cmd/Ctrl + -</b>: Decrease window size
					</li>
					<li>
						<b>Cmd/Ctrl + F</b>: Toggle fullscreen
					</li>
					<li>
						<b>Cmd/Ctrl + Arrows</b>: Resize window
					</li>
					<li>
						<b>Cmd/Ctrl + Shift + Arrows</b>: Move window
					</li>
				</ul>
			</div>
		</div>
	)
}

export default ShortcutsModal
