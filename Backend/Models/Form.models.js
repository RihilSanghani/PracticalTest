import mongoose from "mongoose";

const formSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    form_name: {
        type: String,
        required: true
    },
    form_data: {
        type: Object,
        required: true
    },
    submissions: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('Form', formSchema);