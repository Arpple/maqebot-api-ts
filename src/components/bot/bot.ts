export type T = {
	direction: number,
	x: number,
	y: number,
}

export class InvliadCommandError extends Error {
	constructor(command: string) {
		super(`invalid command ${command}`)
	}
}


export const create = (): T => ({
	direction: 90,
	x: 0, y: 0,
})


type Command = (bot: T) => T

const rotateR: Command = (bot) => ({
	...bot,
	direction: (bot.direction + 270) % 360
})

const rotateL: Command = (bot) => ({
	...bot,
	direction: (bot.direction + 90) % 360
})

const parseCommand = (str: string): Command => {
	switch (str) {
		case 'R':
			return rotateR
		case 'L':
			return rotateL
		default:
			throw new InvliadCommandError(str)
	}
}

/**
 * @throws {InvalidCommandError}
 */
export const execute = (commands: string) => (bot: T): T => {
	return commands.split('')
		.map(parseCommand)
		.reduce((s, cmd) => cmd(s), bot)
}
