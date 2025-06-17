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
					<h1 className={styles.headerText}>IncludEd</h1>
					<h4 className={styles.headerSubText}>
						Aiming for education to be inclusive and accessible
					</h4>
				</div>

				<div className={styles.note}>
					<Link className={styles.button} href="/speech-to-text">
						Click Here
					</Link>
				</div>
				<div>
					<Link className={styles.header} href="/speech-to-text">
						Click Here
					</Link>
				</div>
				<footer className={styles.footer}></footer>
			</main>
		</div>
	)
}
