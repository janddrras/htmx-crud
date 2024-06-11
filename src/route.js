import { Router } from "express"


let todos = [
	{ id: 1, task: 'Learn HTMX' },
	{ id: 2, task: 'Feed Cat' }
]

const router = Router()


router.get('/', (req, res) => {
	try {
		res.status(200).json(todos)
	} catch (error) {
		console.error('Failed to get todos', error)
	}
})

router.post('/', (req, res) => {
	try {
		const newTodo = { id: todos.length + 1, task: req.body.task }
		todos.push(newTodo)

		res.status(201).json(newTodo)
	} catch (error) {
		console.error('Failed to create todo', error)
	}
})

router.put('/:id', (req, res) => {
	try {
		const id = parseInt(req.params.id)
		const todo = todos.find(t => t.id === id)

		if (!todo) {
			res.status(404).send('Todo not found')

			return
		}

		todo.task = req.body.task

		res.status(200).json(todo)
	} catch (error) {
		console.error('failed to edit todo', error)
	}
})

router.delete('/:id', (req, res) => {
	try {
		const id = parseInt(req.params.id)
		todos = todos.filter(t => t.id !== id)

		res.status(204).send()
	} catch (error) {
		console.error('failed to delete todo', error)
	}
})

export default router