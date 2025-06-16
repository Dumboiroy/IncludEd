/* eslint-disable @typescript-eslint/no-var-requires */
// Electron doesnt support ESM for renderer process. Alternatively, pass this file
// through a bundler but that feels like an overkill
const { contextBridge, ipcRenderer } = require('electron')

import type { TranscriptionData } from './api/types/TranscriptionData'

contextBridge.exposeInMainWorld('BloopAPI', {
	ping: () => ipcRenderer.invoke('sample:ping'),
	startTranscription: () => ipcRenderer.send('start-transcription'),
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) =>
		ipcRenderer.on('transcription-result', (_, data) => callback(data)),
})
