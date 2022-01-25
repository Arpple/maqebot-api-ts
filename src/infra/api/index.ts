import { Express } from 'express'

import { Bot } from '../../components/bot'
import * as app from './app'

export namespace Api {
	export type Deps = {
		bot: Bot.I,
	}

	export const create = (deps: Deps): Express => {
		return app.create(deps)
	}
}
