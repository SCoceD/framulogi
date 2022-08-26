const db = require('../db/db');
const {getThumbnail} = require("../services/makeThumbnail");
const {s3Uploadv3} = require('../services/s3Service');

class PhotoController {
    // Add one photo json params(album_id, file). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/photo

    async uploadPhoto(req, res) {
        try {
            const thumbnail = await getThumbnail(req.files[0]);
            req.files.push(thumbnail);
            const result = await s3Uploadv3(req.files);

            const {album_id} = req.body;
            const photo_name = req.files[0].originalname;

            const photo_url = result[0].url;
            const photo_logo = result[1].url;
            const photo = await db.query(`INSERT INTO photo (photo_logo, photo_name, photo_url, album_id)
                                          VALUES ($1, $2, $3, $4)
                                          RETURNING *`, [photo_logo, photo_name, photo_url, album_id])
            return res.json(photo.rows);
        } catch (e) {
            return res.send(e);
        }
    }

    // async uploadPhotos(req, res) {
    //     const result = [];
    //     try {
    //         for (const item of req.files) {
    //             const files = [];
    //             files.push(item);
    //             const thumbnail = await getThumbnail(item);
    //             files.push(thumbnail);
    //             const uploadResult = await s3Uploadv3(files);
    //             const {album_id} = req.body;
    //             const photo_name = item.originalname;
    //             console.log(photo_name)
    //             const photo_url = uploadResult[0].url;
    //             const photo_logo = uploadResult[1].url;
    //             const photo = await db.query(`INSERT INTO photo (photo_logo, photo_name, photo_url, album_id)
    //                                           VALUES ($1, $2, $3, $4)
    //                                           RETURNING *`, [photo_logo, photo_name, photo_url, album_id])
    //             result.push(photo.rows[0]);
    //         }
    //         return res.json(result);
    //     } catch (e) {
    //         console.log('error')
    //
    //         res.send(e);
    //     }
    // }

    // Add one photo json params(album_id, file). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/photos
    // todo низкая производительность изза await отправки в S3
    async uploadPhotos(req, res) {
        var time = performance.now();
        const {album_id} = req.body;
        const result = [];
        const files = [];
        try {
            for (const item of req.files) {
                files.push(item);
                const thumbnail = await getThumbnail(item);
                files.push(thumbnail);
            }
            const uploadResult = await s3Uploadv3(files);
            let query = '';
            for (let i = 0; i < uploadResult.length; i += 2) {
                const photo_name = uploadResult[i].originalname;
                const photo_url = uploadResult[i].url;
                const photo_logo = uploadResult[i + 1].url;
                query += `('${photo_logo}', '${photo_name}', '${photo_url}', '${album_id}'),`;
                // const photo = await db.query(`INSERT INTO photo (photo_logo, photo_name, photo_url, album_id)
                //                               VALUES ($1, $2, $3, $4)
                //                               RETURNING *`, [photo_logo, photo_name, photo_url, album_id])
                // result.push(photo.rows[0]);
            }
            const photo = db.query(`INSERT INTO photo (photo_logo, photo_name, photo_url, album_id)
                                          VALUES ${query.substring(0, query.length - 1)}`);
            console.log(result);

            time = performance.now() - time;
            console.log('Время выполнения = ', time);
            return res.send("Done");
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    }

    // GET photos json params (), query parameter photo_id. User must be authorized.
    // GET https://splastun2.node.shpp.me/api/photos/<photo_id>
    async getPhotos(req, res) {
        try {
            const album_id = req.params.id;
            const photos = await db.query(`SELECT *
                                           FROM photo
                                           WHERE album_id = $1`, [album_id]);
            return res.json(photos.rows);
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    }

    // Get photo Json params (photo_id). User must be authorized.
    // GET https://splastun2.node.shpp.me/api/photo
    async getOnePhoto(req, res) {
        try {
            const photo_id = req.body.photo_id;
            const photos = await db.query(`SELECT *
                                           FROM photo
                                           WHERE photo_id = $1`, [photo_id]);
            return res.json(photos.rows);
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    }

    // Update photo Json params (photo_id, photo_name). User must be authorized.
    // PUT https://splastun2.node.shpp.me/api/photo
    async updatePhoto(req, res) {
        try {
            const photo_id = req.body.photo_id;
            const photo = await db.query(`SELECT *
                                          FROM photo
                                          WHERE photo_id = $1`, [photo_id]);
            const photo_name = req.body.photo_name ?? photo.rows[0].photo_name;
            const updatedPhoto = await db.query(`UPDATE photo
                                                 SET photo_name = $1
                                                 WHERE photo_id = $2
                                                 RETURNING *`, [photo_name, photo_id]);
            return res.json(updatedPhoto.rows[0]);
        } catch (e) {
            return res.send(e);
        }
    }

    // Delete photo query param photo_id. User must be authorized.
    // DELETE https://splastun2.node.shpp.me/api/photo/<photo_id>
    async deletePhoto(req, res) {
        const photo_id = req.params.id;
        try {
            const result = await db.query(`DELETE
                                           FROM photo
                                           WHERE photo_id = $1`, [photo_id]);
            return res.json(result);
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new PhotoController();
