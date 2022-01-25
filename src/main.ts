import { Api } from './infra/api'
import { Bot } from './components/bot'
import { TempBotRepo } from './infra/repos/tempBotRepo'


const container = (): Api.Deps => {
	const botRepo: Bot.Repo = TempBotRepo.create()

	return {
		bot: {
			command: Bot.command(botRepo),
			create: Bot.create(botRepo, () => Date.now().toString())
		}
	}
}

const app = Api.create(container())


app.listen(3000, () => {
	console.log('server statred')
})
