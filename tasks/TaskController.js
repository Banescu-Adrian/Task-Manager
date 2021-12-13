const Task = require('./Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const index = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
})

const store = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
})

const show = asyncWrapper(async (req, res, next) => {
        const { id: task_id } = req.params
        const task = await Task.findOne({ _id: task_id })

        if(!task) {
            return next(createCustomError(`No task found with id: ${task_id}`, 404))
        }
        res.status(200).json({ task })
})

const update = asyncWrapper(async (req, res) => {
        const { id: task_id } = req.params
        const task = await Task.findOneAndUpdate(
            { _id: task_id }, 
            req.body,
            { 
                new: true,
                runValidators: true
            }
            )

            if(!task) {
                return next(createCustomError(`No task found with id: ${task_id}`, 404))
            }
        res.status(200).json({ task })
})

const destroy = asyncWrapper(async (req, res) => {
        const { id: task_id } = req.params
        const task = await Task.findOneAndDelete({ _id: task_id })

        if(!task) {
            return next(createCustomError(`No task found with id: ${task_id}`, 404))
        }
        res.status(200).json({ task })
})

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}