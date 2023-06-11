import mongoose from "mongoose";
import Image from "../models/image.js";
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
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
};

export const add_image = (req, res, next) => {
    const command = new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
        MaxKeys: 3
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
                message: 'Non-Duplicate Images saved'
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
};