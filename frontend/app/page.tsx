import styles from './page.module.css'
import EditSVG from '@/assets/edit.svg'
import Menhera from '@/assets/menhera.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				<div className={styles.header}>
					<text className={styles.headerText}>IncludEd</text>
				</div>

				<div className={styles.buttonContainer}>
					<div className={styles.button}>
						<Link href="/speech-to-text">
							<text className={styles.buttonText}>Speech to Text</text>
						</Link>
					</div>
					{/* CHANGE THIS WHEN IMPLEMENTED */}
					<div className={styles.button}>
						<Link href="/text-to-speech">
							<text className={styles.buttonText}>Text to Speech</text>
						</Link>
					</div>
				</div>

				<footer className={styles.footer}>
					<h4 className={styles.normalText}>
						Inclusive and Accessible Education
					</h4>
				</footer>
			</main>
		</div>
	)
}
