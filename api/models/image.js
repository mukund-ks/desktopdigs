import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    tags: { type: [String], required: true },
});

export default mongoose.model('Image', imageSchema);