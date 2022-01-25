import { pipe } from 'fp-ts/lib/function'
import * as bot from './bot'
import * as view from './view'

const expectViewDir = (dir: view.Direction) => (b: bot.T): bot.T => {
	const v = view.create(b)
	expect(v.direction).toBe(dir)
	return b
}

describe('create state view', () => {
	it('convert direction to string', () => {
		pipe(
			bot.create(), expectViewDir('N'),
			bot.execute('R'), expectViewDir('E'),
			bot.execute('R'), expectViewDir('S'),
			bot.execute('R'), expectViewDir('W'),
		)
	})
})
