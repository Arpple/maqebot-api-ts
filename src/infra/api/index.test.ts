import request from 'supertest'
import { Api } from '.'
import { Bot } from '../../components/bot'

const mockDeps = (): Api.Deps => ({
	bot: {
		command: jest.fn(),
		create: jest.fn(),
	}
})

describe('POST /bots', () => {
	const deps = mockDeps()
	deps.bot.create = jest.fn(() => Promise.resolve(['001', {} as any]))
	const app = Api.create(deps)

	it('return 200', async () => {
		const { status, body } = await request(app)
			.post('/bots')
			.send()

		expect(status).toBe(200)
		expect(body.serial).toBeDefined()
	})
})


describe('PUT /bots/:serial', () => {
	it('return 422 with invalid command', async () => {
		const deps = mockDeps()
		deps.bot.command = jest.fn(() => { throw new Bot.InvalidCommandError('') })
		const app = Api.create(deps)

		const { status } = await request(app)
			.put('/bots/001')
			.send()

		expect(status).toBe(422)
	})

	it('return 200', async () => {
		const deps = mockDeps()
		const app = Api.create(deps)

		const { status, body } = await request(app)
			.put('/bots/001')
			.send()

		expect(status).toBe(200)
	})
})
