import * as bot from './bot'
import * as view from './view'

export namespace Bot {
	export type I = {
		create: Create
		command: Command
	}

	export type Repo = {
		save: (serial: SerialNumber, state: bot.T) => Promise<void>,
		load: (serial: SerialNumber) => Promise<bot.T | undefined>
	}

	export type GenSerial = () => SerialNumber

	export type T = view.T
	export type SerialNumber = string
	export class InvalidCommandError extends bot.InvliadCommandError {}

	export type Create = () => Promise<[SerialNumber, T]>
	export const create = (repo: Repo, gen: GenSerial): Create  =>
		async () => {
			const serial = gen()
			const state = bot.create()
			await repo.save(serial, state)
			return [serial, view.create(state)]
		}

	export type Command = (serial: SerialNumber, command: string) => Promise<T>
	/** @throws {InvaliadCommandError} */
	export const command = (repo: Repo): Command =>
		async (serial, command) => {
			const loaded = await repo.load(serial) || bot.create()
			const state = bot.execute(command)(loaded)
			await repo.save(serial, state)
			return view.create(state)
		}
}
