const Task = require('./Task')

const index = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const store = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const show = async (req, res) => {
    try {
        const { id: task_id } = req.params
        const task = await Task.findOne({ _id: task_id })

        if(!task) {
            return res.status(404).json({message: `No task found with id: ${task_id}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const update = async (req, res) => {
    try {
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
            return res.status(404).json({message: `No task found with id: ${task_id}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const destroy = async (req, res) => {
    try {
        const { id: task_id } = req.params
        const task = await Task.findOneAndDelete({ _id: task_id })

        if(!task) {
            return res.status(404).json({message: `No task found with id: ${task_id}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}