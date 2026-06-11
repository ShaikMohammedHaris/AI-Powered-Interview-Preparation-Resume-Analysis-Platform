const multer = require("multer");

const upload= multer({
    storage: multer.memoryStorage(),
    limits:{
        //3*kb*bytes
        //1 KB = 1024 bytes
        //1 MB = 1024 KB=>1024*1024 bytes
        fileSize: 3 * 1024 * 1024, // 3MB
    }
})
module.exports = upload;