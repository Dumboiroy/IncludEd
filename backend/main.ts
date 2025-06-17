import path from 'node:path'
import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron'
import { spawn } from 'node:child_process'
import log from 'electron-log'
import electronUpdater from 'electron-updater'
import electronIsDev from 'electron-is-dev'
import ElectronStore from 'electron-store'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'
import { askGemini } from './api/gemini/geminiClient'
import { dot } from 'node:test/reporters'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log('Backend directory:', __dirname)
const { autoUpdater } = electronUpdater
let appWindow: BrowserWindow | null = null
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = new ElectronStore()
// Load environment variables from .env file
dotenv.config()

class AppUpdater {
	constructor() {
		log.transports.file.level = 'info'
		autoUpdater.logger = log
		autoUpdater.checkForUpdatesAndNotify()
	}
}

const installExtensions = async () => {
	/**
	 * NOTE:
	 * As of writing this comment, Electron does not support the `scripting` API,
	 * which causes errors in the REACT_DEVELOPER_TOOLS extension.
	 * A possible workaround could be to downgrade the extension but you're on your own with that.
	 */
	/*
	const {
		default: electronDevtoolsInstaller,
		//REACT_DEVELOPER_TOOLS,
		REDUX_DEVTOOLS,
	} = await import('electron-devtools-installer')
	// @ts-expect-error Weird behaviour
	electronDevtoolsInstaller.default([REDUX_DEVTOOLS]).catch(console.log)
	*/
}

const spawnAppWindow = async () => {
	if (electronIsDev) await installExtensions()

	const RESOURCES_PATH = electronIsDev
		? path.join(__dirname, '../../assets')
		: path.join(process.resourcesPath, 'assets')

	const getAssetPath = (...paths: string[]): string => {
		return path.join(RESOURCES_PATH, ...paths)
	}

	const PRELOAD_PATH = path.join(__dirname, 'preload.js')
	console.log('Preload script path:', PRELOAD_PATH)

	appWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: getAssetPath('icon.png'),
		show: false,
		webPreferences: {
			preload: PRELOAD_PATH,
			contextIsolation: true,
			nodeIntegration: false,
		},
	})

	appWindow.loadURL(
		electronIsDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../../frontend/build/index.html')}`
	)
	appWindow.maximize()
	appWindow.setMenu(null)
	appWindow.show()

	if (electronIsDev) appWindow.webContents.openDevTools({ mode: 'right' })

	appWindow.on('closed', () => {
		appWindow = null
	})
}

app.on('ready', () => {
	new AppUpdater()
	spawnAppWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

/*
 * ======================================================================================
 *                                IPC Main Events
 * ======================================================================================
 */

ipcMain.handle('sample:ping', () => {
	return 'pong'
})

ipcMain.on('start-transcription', event => {
	// Adjust the path to your script accordingly
	const scriptPath = path.join(
		__dirname,
		'../../backend/api/speech-to-text/speech-to-text.py'
	)

	// Build args, e.g. language model or device id, if any
	const pyArgs = ['-m', 'en-us']

	const isWindows = process.platform === 'win32'
	const pythonPath = path.join(
		__dirname,
		'..',
		'api',
		'.venv',
		isWindows ? 'Scripts' : 'bin',
		isWindows ? 'python.exe' : 'python'
	)

	const pyProc = spawn(pythonPath, [scriptPath, ...pyArgs])

	pyProc.stdout.on('data', data => {
		const lines = data.toString().split('\n').filter(Boolean)
		for (const line of lines) {
			try {
				const json = JSON.parse(line)
				event.sender.send('transcription-result', json)
			} catch (e) {
				console.warn('Ignoring non-JSON line:', line)
			}
		}
	})

	pyProc.stderr.on('data', err => {
		console.error('Python stderr:', err.toString())
	})

	pyProc.on('close', code => {
		console.log(`Python script exited with code ${code}`)
	})
})

ipcMain.on('make-window-overlay', () => {
	const win = BrowserWindow.getFocusedWindow()
	if (!win) return

	const { width: screenWidth, height: screenHeight } =
		screen.getPrimaryDisplay().workAreaSize

	win.setBounds({
		width: Math.round(screenWidth * 0.8),
		height: Math.round(screenHeight * 0.2),
		x: Math.round(screenWidth * 0.1),
		y: Math.round(screenHeight - screenHeight * 0.2 - 20),
	})

	// Configure window properties
	win.setAlwaysOnTop(true, 'floating')
	win.setIgnoreMouseEvents(false) // Allow interaction
	win.setFocusable(true)
	win.setSkipTaskbar(true)
	win.setResizable(true)
	win.setVisibleOnAllWorkspaces(true)
	win.setFullScreenable(false)
	win.setMovable(true)

	// Make window transparent if not already
	win.setOpacity(0.6) // Adjust opacity if needed
})

ipcMain.on('reset-overlay', () => {
	const win = BrowserWindow.getFocusedWindow()
	if (!win) return

	const { width, height } = screen.getPrimaryDisplay().workAreaSize
	win.setBounds({ x: 0, y: 0, width, height })

	// Configure window properties
	win.setAlwaysOnTop(false)
	win.setFocusable(true)
	win.setSkipTaskbar(true)
	win.setResizable(true)
	win.setVisibleOnAllWorkspaces(true)
	win.setMovable(true)
	win.setOpacity(1)
})

// Handle Gemini API requests
ipcMain.handle('ask-gemini', async (_event, input: string) => {
	const apiKey = process.env.GEMINI_API_KEY
	if (!apiKey) throw new Error('Gemini API key not set.')
	return await askGemini(apiKey, input)
})
