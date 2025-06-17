/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/
import type { TranscriptionData } from './types'
export interface IBloopAPI {
	startTranscription: () => void
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) => voidZ
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
