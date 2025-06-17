/* eslint-disable @typescript-eslint/no-var-requires */
// Electron doesnt support ESM for renderer process. Alternatively, pass this file
// through a bundler but that feels like an overkill
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('BloopAPI', {
	ping: () => ipcRenderer.invoke('sample:ping'),
	startTranscription: () => ipcRenderer.send('start-transcription'),
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) =>
		ipcRenderer.on('transcription-result', (_, data) => callback(data)),
})

contextBridge.exposeInMainWorld('electron', {
	createOverlayWindow: () => ipcRenderer.send('create-overlay'),
	makeWindowOverlay: () => ipcRenderer.send('make-window-overlay'),
})
