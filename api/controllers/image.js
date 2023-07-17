import mongoose from 'mongoose';
import Image from '../models/image.js';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
});

const ObjectURL = `https://${process.env.AWS_BUCKET_NAME}.s3.ap-south-1.amazonaws.com`

export const get_all_images = (req, res, next) => {
    Image.find()
        .select('_id imageURL name tags')
        .exec()
        .then(doc => {
            if (doc.length == 0) {
                res.status(404).json({ message: 'No entries in database' });
            } else {
                const response = {
                    count: doc.length,
                    images: doc.map(d => {
                        return {
                            _id: d._id,
                            name: d.name,
                            imageURL: d.imageURL,
                            tags: d.tags
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

export const add_image = (req, res, next) => {
    const command = new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
        MaxKeys: 174
    });

    client.send(command)
        .then(data => {
            data.Contents.map(img => {
                Image.findOne({ name: img.Key }).exec()
                    .then(doc => {
                        if (doc) {
                            return;
                        }

                        const image = new Image({
                            _id: new mongoose.Types.ObjectId(),
                            name: img.Key,
                            imageURL: `${ObjectURL}/${img.Key}`,
                            tags: img.Key.split('_').slice(0, 2)
                        });
                        return image.save();
                    })
            });
        })
        .then(() => {
            res.status(201).json({
                message: 'Images saved (or updated)'
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
};

export const get_by_tags = (req, res, next) => {
    Image.find({
        tags: { $all: [req.params.tag1.toUpperCase(), req.params.tag2.toUpperCase()] }
    }).select('_id imageURL name tags')
        .exec()
        .then(doc => {
            if (doc.length == 0) {
                res.status(404).json({ message: 'No results for provided tag combination' });
            } else {
                const response = {
                    count: doc.length,
                    images: doc.map(d => {
                        return {
                            _id: d._id,
                            name: d.name,
                            imageURL: d.imageURL,
                            tags: d.tags
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

export const get_by_single_tag = (req, res, next) => {
    Image.find({
        tags: { $elemMatch: { $eq: req.params.tag.toUpperCase() } }
    }).select('_id imageURL name tags')
        .exec()
        .then(doc => {
            if (doc.length == 0) {
                res.status(404).json({ message: 'No results for chosen tag' });
            } else {
                const response = {
                    count: doc.length,
                    images: doc.map(d => {
                        return {
                            _id: d._id,
                            name: d.name,
                            imageURL: d.imageURL,
                            tags: d.tags
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

export const get_by_id = (req, res, next) => {
    Image.findById(req.params.imageID).select('_id imageURL name tags')
        .exec()
        .then(doc => {
            if (doc.length == 0) {
                res.status(404).json({ message: 'No result for chosen name' })
            } else {
                const response = {
                    image: {
                        _id: doc._id,
                        name: doc.name,
                        imageURL: doc.imageURL,
                        tags: doc.tags
                    }
                };
                res.status(200).json(response);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}