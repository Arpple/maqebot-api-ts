import { pipe } from 'fp-ts/lib/function'
import * as bot from './bot'

describe('create new bot', () => {
	const init = bot.create()

	it('heading toward 90', () => {
		expect(init.direction).toBe(90)
	})

	it('start at pos 0 0', () => {
		expect(init.x).toBe(0)
		expect(init.y).toBe(0)
	})
})

const expectDirection = (direction: number) => (b: bot.T): bot.T => {
	expect(b.direction).toBe(direction)
	return b
}

const expectPosition = (x: number, y: number) => (b: bot.T): bot.T => {
	expect(b.x).toBe(x)
	expect(b.y).toBe(y)
	return b
}

describe('rotate command', () => {
	const start = bot.create()

	it('rotate right', () => {
		pipe(
			start, expectDirection(90),
			bot.execute('R'), expectDirection(0),
			bot.execute('R'), expectDirection(270),
			bot.execute('R'), expectDirection(180),
			bot.execute('R'), expectDirection(90),
		)
	})

	it('rotate left', () => {
		pipe(
			start, expectDirection(90),
			bot.execute('L'), expectDirection(180),
			bot.execute('L'), expectDirection(270),
			bot.execute('L'), expectDirection(0),
			bot.execute('L'), expectDirection(90),
		)
	})
})

it('mix command', () => {
	const b = bot.create()

	pipe(
		b, expectDirection(90),
		bot.execute('LRLRRRLLRL'), expectDirection(90),
	)
})


it('invalid command', () => {
	const b = bot.create()

	const t = () => {
		bot.execute('X')(b)
	}

	expect(t).toThrowError(bot.InvliadCommandError)
})
