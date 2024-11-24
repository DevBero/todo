import mongoose from "mongoose"

const ToDoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
})

export const ToDoModel = mongoose.model('ToDo', ToDoSchema)

export const createToDo = (values: Record<string, any>) => new ToDoModel(values)
    .save().then((user) => user.toObject());

export const getToDos = (userId: string) => ToDoModel.find({ createdBy: userId });
export const getToDoById = (id: string) => ToDoModel.findById(id)

export const deleteToDoById = (id: string) => ToDoModel.findOneAndDelete({ _id: id })
export const updateToDoById = (id: string, values: Record<string, any>) => ToDoModel.findByIdAndUpdate(id, values)