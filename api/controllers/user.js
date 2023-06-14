import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const register_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'E-mail already in use' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hashPass,
                            admin: req.body.admin || 0
                        });
                        user.save()
                            .then((registeredUser) => {
                                const payload = { _id: registeredUser._id, admin: registeredUser.admin || 0 };
                                const token = jwt.sign(payload, process.env.JWT_SECRET);
                                res.status(201).json({ message: 'User Created', token: token });
                            })
                            .catch(err => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
};

export const login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({ message: 'User not found' });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'Authorization failed. Check E-mail or Passwrod.' });
                    }
                    if (result) {
                        const payload = { _id: user[0]._id, admin: user[0].admin || 0 };
                        const token = jwt.sign(payload, process.env.JWT_SECRET);

                        return res.status(200).header('auth-token', token).json({
                            message: 'Authorization successful',
                            token: token,
                        });
                    }
                    res.status(401).json({ message: 'Authorization failed. Check E-mail or Passwrod.' });
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const delete_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.userID })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};