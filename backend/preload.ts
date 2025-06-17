/* eslint-disable @typescript-eslint/no-var-requires */
// Electron doesnt support ESM for renderer process. Alternatively, pass this file
// through a bundler but that feels like an overkill
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('BloopAPI', {
	ping: () => ipcRenderer.invoke('sample:ping'),
	startTranscription: () => ipcRenderer.send('start-transcription'),
	onTranscriptionResult: (callback: (data: TranscriptionData) => void) =>
		ipcRenderer.on('transcription-result', (_, data) => callback(data)),
	generateSpeech: (data: { text: string; voice: string }) => {
		// console.log('Sending generate-speech request:', data);
		ipcRenderer.send('generate-speech', data)
	},

	// Listen for successful speech generation
	onSpeechResult: (callback: (data: { audio_path: string }) => void) => {
		// console.log('Setting up speech-result listener');
		ipcRenderer.on('speech-result', (event, data) => {
			console.log('Received speech result:', data)
			callback(data)
		})
	},

	// Listen for speech generation errors
	onSpeechError: (callback: (error: string) => void) => {
		// console.log('Setting up speech-error listener');
		ipcRenderer.on('speech-error', (event, error) => {
			console.log('Received speech error:', error)
			callback(error)
		})
	},

	// Remove all speech-related event listeners
	removeAllSpeechListeners: () => {
		console.log('Removing all speech listeners')
		ipcRenderer.removeAllListeners('speech-result')
		ipcRenderer.removeAllListeners('speech-error')
	},

	// Remove specific listeners - these need wrapper functions
	removeSpeechResultListener: (
		callback: (data: { audio_path: string }) => void
	) => {
		// Create a wrapper function that matches the IPC signature
		const wrapper = (event: any, data: { audio_path: string }) => callback(data)
		ipcRenderer.removeListener('speech-result', wrapper)
	},

	removeSpeechErrorListener: (callback: (error: string) => void) => {
		// Create a wrapper function that matches the IPC signature
		const wrapper = (event: any, error: string) => callback(error)
		ipcRenderer.removeListener('speech-error', wrapper)
	},

	// Optional: Get available voices (if your backend supports it)
	getAvailableVoices: (): Promise<string[]> => {
		return ipcRenderer.invoke('get-available-voices')
	},

	// Optional: Check if TTS is ready
	checkTTSStatus: (): Promise<boolean> => {
		return ipcRenderer.invoke('check-tts-status')
	},
})

contextBridge.exposeInMainWorld('electron', {
	createOverlayWindow: () => ipcRenderer.send('create-overlay'),
	makeWindowOverlay: () => ipcRenderer.send('make-window-overlay'),
	resetOverlay: () => ipcRenderer.send('reset-overlay'),
	resizeWindow: (direction: string) =>
		ipcRenderer.send('resize-window', direction),
	toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
	createPopupWindow: () => ipcRenderer.send('show-info-popup'),
	closeWindow: () => ipcRenderer.send('close-window'),
	moveWindow: (direction: string) => ipcRenderer.send('move-window', direction),
})
