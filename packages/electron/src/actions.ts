// import { dialog, IpcMain, IpcMainInvokeEvent, BrowserWindow } from 'electron'
// import { writeFileSync, readFileSync } from 'fs'
// import { DIALOGTYPE } from '@flerovium/shared'
// import { hash } from 'argon2'
// import { encrypt, decrypt } from './node'

// let win: BrowserWindow | null

// function destroyAuthWin() {
// 	if (!win) return
// 	win.close()
// 	win = null
// }

// export default {
// 	// refreshData: (ipc: IpcMain) => {
// 	//   ipc.handle("refresh-data", (event: IpcMainInvokeEvent, ...args: any[]) => {
// 	//     console.log(...args);
// 	//   });
// 	// },

// 	openDialog: (ipc: IpcMain) => {
// 		ipc.handle('open-dialog', (event: IpcMainInvokeEvent, ...args: any[]) => {
// 			const properties: any =
// 				args[0].type === DIALOGTYPE.CREATE ? ['openDirectory'] : ['openFile']

// 			dialog
// 				.showOpenDialog({
// 					properties,
// 					filters: [
// 						{
// 							name: 'flerdb',
// 							extensions: ['flerdb'],
// 						},
// 					],
// 				})
// 				.then((path) => {
// 					if (path) {
// 						event.sender.send('select-path', {
// 							path: path.filePaths[0],
// 							type: args[0].type,
// 						})
// 					}
// 				})
// 		})
// 	},

// 	saveVault: (ipc: IpcMain) => {
// 		ipc.handle(
// 			'save-vault',
// 			async (event: IpcMainInvokeEvent, ...args: any[]) => {
// 				const { path, data, type, password } = args[0]
// 				const json = JSON.stringify(data)
// 				const encrypted = await encrypt(json, password)

// 				writeFileSync(path, encrypted)

// 				if (type && type === DIALOGTYPE.CREATE) {
// 					event.sender.send('read-vault', data)
// 				}
// 			},
// 		)
// 	},

// 	readVault: (ipc: IpcMain) => {
// 		ipc.handle(
// 			'read-vault',
// 			async (event: IpcMainInvokeEvent, ...args: any[]) => {
// 				const { path, password } = args[0]
// 				const data = readFileSync(path, 'utf-8')

// 				if (data) {
// 					const decrypted = await decrypt(data, password)
// 					const json = JSON.parse(decrypted)
// 					event.sender.send('read-vault', json)
// 				}
// 			},
// 		)
// 	},

// 	hashPass: (ipc: IpcMain) => {
// 		ipc.handle('hash-pass', async (_: IpcMainInvokeEvent, ...args: any[]) => {
// 			const password = args[0]
// 			const hashed = await hash(password)
// 			return hashed
// 		})
// 	},

// 	createAuthWindow: (ipc: IpcMain) => {
// 		ipc.handle(
// 			'create-auth-window',
// 			(event: IpcMainInvokeEvent, ...args: any[]) => {
// 				destroyAuthWin()

// 				const { path, serviceName } = args[0]

// 				win = new BrowserWindow({
// 					width: 1000,
// 					height: 600,
// 					webPreferences: {
// 						nodeIntegration: false,
// 						enableRemoteModule: false,
// 					},
// 				})

// 				win.loadURL(path)

// 				const {
// 					session: { webRequest },
// 				} = win.webContents

// 				const filter = {
// 					urls: ['http://localhost:8080/*'],
// 				}

// 				webRequest.onBeforeRequest(filter, async ({ url }) => {
// 					if (url) {
// 						const urlParse = new URL(url)
// 						const codes = new URLSearchParams(urlParse.hash.replace('#', '?'))

// 						event.sender.send('service-access-token', {
// 							accessToken: codes.get('access_token'),
// 							tokenType: codes.get('token_type'),
// 							expiresIn: codes.get('expires_in'),
// 							state: codes.get('state'),
// 							serviceName,
// 						})
// 					}
// 					return destroyAuthWin()
// 				})

// 				win.on('closed', () => {
// 					win = null
// 				})
// 			},
// 		)
// 	},
// }
