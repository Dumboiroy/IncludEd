/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/
import type { TranscriptionData } from './types'
export interface IBloopAPI {
	startTranscription: () => void
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) => void
		generateSpeech: (data: { text: string; voice: string }) => void
	onSpeechResult: (callback: (data: { audio_path: string }) => void) => void
	onSpeechError: (callback: (error: string) => void) => void
	removeAllSpeechListeners: () => void
}
export interface IGeminiAPI {
	ask: (prompt: string) => Promise<string>
}

declare global {
	interface Window {
		BloopAPI: IBloopAPI
		GeminiAPI: IGeminiAPI
	}
}
