import { Express } from 'express'

import * as app from './app'

export namespace Api {
	export type Deps = app.Deps

	export const create = (deps: Deps): Express => {
		return app.create(deps)
	}
}
