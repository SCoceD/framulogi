const db = require('../db/db');

class AlbumController {
    //  Create album Json params (album_name, album_location, date). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/album
    async createAlbum(req, res) {
        try {
            const {album_name, album_location} = req.body;
            const person_id = req.person.id;
            const date = new Date(parseInt(req.body.date)); /*todo data*/
            const album = await db.query(`INSERT INTO album (album_name, album_location, date, person_id)
                                          VALUES ($1, $2, $3, $4)
                                          RETURNING *`, [album_name, album_location, date, person_id]);
            res.json(album.rows);
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }
    // Get albums json params (). User must be authorized. return albums based on jwt token
    // GET https://splastun2.node.shpp.me/api/albums
    async getAlbums(req, res) {
        console.log(req);
        try {
            const person_id = req.person.id;
            const albums = await db.query(`SELECT *
                                           FROM album
                                           WHERE person_id = $1`, [person_id]);
            res.json(albums.rows);
        } catch (e) {
            res.send(e);
        }
    }
    // Get album Json params (), query parameter album id. User must be authorized.
    // GET https://splastun2.node.shpp.me/api/album/<album id>
    async getOneAlbum(req, res) {
        try {
            const album_id = req.params.id;
            const person_id = req.person.id;
            const album = await db.query(`SELECT *
                                          FROM album
                                          WHERE album_id = $1
                                            AND person_id = $2`, [album_id, person_id]);
            res.json(album.rows[0]);
        } catch (e) {
            res.send(e);
        }
    }

    //Update album Json params (album_id, album_logo?, album_name?, album_location?, date?). User must be authorized.
    // PUT https://splastun2.node.shpp.me/api/album
    async updateAlbum(req, res) {
        try {
            const id = req.body.album_id;
            const person_id = req.person.id;
            const album = await db.query(`SELECT *
                                          FROM album
                                          WHERE album_id = $1
                                            AND person_id = $2`, [id, person_id]);
            const album_logo = req.body.album_logo ?? album.rows[0].album_logo;
            const album_name = req.body.album_name ?? album.rows[0].album_name;
            const album_location = req.body.album_location ?? album.rows[0].album_location;
            const date = new Date(parseInt(req.body.date)) ?? album.rows[0].date ?? new Date();
            const updatedAlbum = await db.query(`UPDATE album
                                                 set album_logo     = $1,
                                                     album_name     = $2,
                                                     album_location = $3,
                                                     date           = $4
                                                 WHERE album_id = $5
                                                   AND person_id = $6
                                                 RETURNING *`, [album_logo, album_name, album_location, date, id, person_id]);
            res.json(updatedAlbum.rows[0]);
        } catch (e) {
            res.send(e);
        }
    }
    // Delete album query param album_id. User must be authorized.
    // DELETE https://splastun2.node.shpp.me/api/album/<album id>
    async deleteAlbum(req, res) {
        const person_id = req.person.id;
        const album_id = req.params.id;
        try {
            const result = await db.query(`DELETE
                                           FROM album
                                           WHERE person_id = $1
                                             AND album_id = $2`, [person_id, album_id]);
            return res.json("ok");
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new AlbumController();
