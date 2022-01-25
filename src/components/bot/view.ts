import * as bot from './bot'

export type Direction = 'N' | 'E' | 'W' | 'S'

export type T = {
	direction: Direction,
	x: number,
	y: number,
}


const dirMap: Direction[] = ['E', 'N', 'W', 'S']

export const create = (state: bot.T): T => {
	return {
		...state,
		direction: dirMap[state.direction / 90],
	}
}
