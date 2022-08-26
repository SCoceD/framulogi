const {PRE_URL} = require("../constants/constants");
const {S3} = require("aws-sdk");
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;


exports.s3Uploadv3 = async (files) => {
    const s3client = new S3Client();
    const urls = [];

    const params = files.map((file) => {
        const key = `uploads/${uuid()}-${file.originalname}`.replace(/ /g,'');
        urls.push(`${PRE_URL}${key}`);
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
        };
    });

    const result = await Promise.all(
        params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    result.forEach((item, index) => item.url = urls[index]);

    return result;
};
