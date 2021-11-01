const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

const uploaderImage = async(image)=>{
    let result = await (new Promise(function (resolve, reject) {
        let stream = cloudinary.uploader.upload_stream(
            function (error, result) {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(image.data).pipe(stream);
    }));
    return result.url;
}

module.exports = {
	uploaderImage
}
