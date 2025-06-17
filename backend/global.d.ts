// backend/global.d.ts
export {}

declare global {
	type TranscriptionData = {
		partial?: string
		text?: string
	}
}
