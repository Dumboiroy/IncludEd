'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function LLMPage() {
	const router = useRouter()

	return (
		<main className={styles.container}>
			<div className={styles.captionContainer}></div>
			<div className={styles.buttonRow}></div>
		</main>
	)
}
