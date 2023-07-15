import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/
    },
    password: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
});

export default mongoose.model('User', userSchema);