import express from 'express'
import bodyParser from 'body-parser'
import { Bot } from '../../components/bot'
import * as response from './response'

require('express-async-errors')

export type Deps = {
	bot: Bot.I,
}

export const create = (deps: Deps) => {
	const app = express()

	app.use(bodyParser.json())

	app.get('/', (_req, res) => {
		return res.status(200).send('hello')
	})

	app.post('/bots', async (_req, res) => {
		const [serial, state] = await deps.bot.create()
		return res.status(200).send({ serial, state })
	})

	app.put('/bots/:serial', async (req, res) => {
		const { serial } = req.params
		const { command = '' } = req.body

		try {
			const state = await deps.bot.command(serial, command)
			return res.status(200).send({ state })
		} catch (err: any) {
			if (err instanceof Bot.InvalidCommandError) {
				return res.status(422).send(response.error(err))
			}

			throw err
		}
	})

	app.use((err: any, _req: any, res: any, _next: any) => {
		console.error(err)
		return res.status(500).send('Internal Error')
	})

	return app
}
