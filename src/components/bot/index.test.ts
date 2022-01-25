import { Bot } from '.'
import * as core from './bot'

const mockRepo = (): Bot.Repo => ({
	load: jest.fn(),
	save: jest.fn(),
})

it('create new bot', async () => {
	const save = jest.fn()
	const gen = jest.fn(() => 'sn01')
	const repo: Bot.Repo = { ...mockRepo(), save }
	const [serial] = await Bot.create(repo, gen)()

	expect(save).toBeCalled()
	expect(serial).toBe('sn01')
})


describe('run command', () => {
	it('execute command on loaded state and save', async () => {
		const serial = '01'
		const command = 'R'
		const saved = core.create()

		const load = jest.fn(async () => saved)
		const save = jest.fn(async (savedSn, savedSt) => {
			expect(savedSn).toBe('01')
			expect(savedSt.direction).toBe(0)
		})

		const repo: Bot.Repo = { ...mockRepo(), load, save }

		const state = await Bot.command(repo)(serial, command)
		expect(state.direction).toBe('E')
	})

	it('execute empty', async () => {
		const repo = mockRepo()
		const state = await Bot.command(repo)('001', '')
		expect(state.direction).toBe('N')
	})
})
