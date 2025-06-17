/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/
import type { TranscriptionData } from './types'
export interface IBloopAPI {
	startTranscription: () => void
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) => voidZ
}

declare global {
	interface Window {
		BloopAPI: IBloopAPI
	}
}
