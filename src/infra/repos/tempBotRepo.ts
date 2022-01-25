import { Bot } from '../../components/bot'

export namespace TempBotRepo {
	export const create = (): Bot.Repo => {
		let database = new Map()

		return {
			load: async (serial) => {
				return database.get(serial)
			},

			save: async (serial, state) => {
				database.set(serial, state)
			}
		}
	}
}
