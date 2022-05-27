import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            ref: 'Role'
        }
    ]
})

export default mongoose.model('User', userSchema)