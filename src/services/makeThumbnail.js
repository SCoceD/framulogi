const genThumbnail = require('image-thumbnail')

exports.getThumbnail = async (image) => {
    try {
        let result = await genThumbnail(new Buffer.from(image.buffer))
        console.log('Thumbnail created!')
        const originName = image.originalname.split('.');
        const name = image.originalname + 'thumbnail.' + originName.pop()
        return {
            fieldname: image.fieldname,
            originalname: name,
            encoding: image.encoding,
            mimetype: image.mimetype,
            buffer: result,
            size: result.length
        };
    } catch (err) {
        console.error(err)
    }
}

