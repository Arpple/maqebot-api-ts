import { Api } from './infra/api'
import { Bot } from './components/bot'
import { TempBotRepo } from './infra/repos/tempBotRepo'


const botRepo: Bot.Repo = TempBotRepo.create()

const app = Api.create({
	bot: {
		command: Bot.command(botRepo),
		create: Bot.create(botRepo, () => Date.now().toString())
	}
})


app.listen(3000, () => {
	console.log('server statred')
})
