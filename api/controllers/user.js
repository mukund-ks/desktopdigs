import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/user.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

configDotenv({ path: __dirname + '/.env' });

export const register_user = (req, res, next) => {
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'E-mail or username already in use' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: hashPass,
                            admin: req.body.admin || 0
                        });
                        user.save()
                            .then((registeredUser) => {
                                const payload = { _id: registeredUser._id, admin: registeredUser.admin || 0 };
                                const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
                                res.status(201)
                                    .header('auth-token', access_token)
                                    .json({
                                        message: 'User Created',
                                        name: registeredUser.name,
                                        username: registeredUser.username,
                                        admin: registeredUser.admin,
                                        token: access_token
                                    });
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
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({ message: 'User not found' });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'Authorization failed. Check E-mail or Password.' });
                    }
                    if (result) {
                        const payload = { _id: user[0]._id, admin: user[0].admin || 0 };
                        const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

                        return res.status(200)
                            .header('auth-token', access_token)
                            .json({
                                message: 'Authorization successful',
                                name: user[0].name,
                                username: user[0].username,
                                admin: user[0].admin,
                                token: access_token,
                            });
                    }
                    res.status(401).json({ message: 'Authorization failed. Check E-mail or Password.' });
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const delete_user = (req, res, next) => {
    User.findOneAndDelete(req.params.userID)
        .exec()
        .then(() => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const get_user = (req, res, next) => {
    User.findById(req.params.userID)
        .select('_id name username email admin')
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    admin: user.admin
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const get_all_users = (req, res, next) => {
    User.find()
        .exec()
        .then(doc => {
            if (doc.length == 0) {
                res.status(404).json({ message: 'No Users' });
            } else {
                const response = {
                    count: doc.length,
                    users: doc.map(u => {
                        return {
                            _id: u._id,
                            name: u.name,
                            username: u.username,
                            email: u.email,
                            password: u.password,
                            admin: u.admin
                        };
                    })
                };
                res.status(200).json(response);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const get_jwt_user = (req, res, next) => {
    if (req.user) {
        res.status(200).json({ User: req.user });
    } else {
        res.status(500).json('error');
    }
};

export const change_password = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({ message: "No user found for given E-mail" });
            } else {
                bcrypt.compare(req.body.oldPass, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: "Authorization failed" });
                    }
                    if (result) {
                        bcrypt.hash(req.body.newPass, 10, (err, newHashPass) => {
                            if (err) {
                                return res.status(500).json({ error: err });
                            } else {
                                User.findByIdAndUpdate(user[0]._id, { password: newHashPass }, { new: true })
                                    .then(doc => {
                                        return res.status(200).json({ message: "Password Updated" });
                                    })
                                    .catch(err => {
                                        return res.status(500).json({ error: err });
                                    });
                            }
                        });
                    } else {
                        return res.status(401).json({ message: "Incorrect Old Password" });
                    }
                });
            }
        });
};