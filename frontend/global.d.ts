// global.d.ts
export {}

declare global {
	interface Window {
		electron: {
			makeWindowOverlay: () => void
			resetOverlay: () => void
			resizeWindow: (text: String) => void
			toggleFullscreen: () => void
			createPopupWindow: () => void
			closeWindow: () => void
			moveWindow: (text: string) => void

			makeGeminiWindowOverlay: () => void
		}
	}
}
