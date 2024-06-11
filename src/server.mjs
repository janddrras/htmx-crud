import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { join } from 'path'
import { fileURLToPath } from 'url'
import router from './route.js'

const { json, urlencoded } = bodyParser

const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '../')

const app = express()
const PORT = 3000

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static(join(__dirname, '../public/')))

app.use('/api/todos', router)

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`)
})