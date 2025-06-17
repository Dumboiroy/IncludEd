// global.d.ts
export {}

declare global {
	interface Window {
		electron: {
			makeWindowOverlay: () => void
			resetOverlay: () => void
		}
	}
}
