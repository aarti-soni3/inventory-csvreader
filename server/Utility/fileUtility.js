const fs = require('fs').promises;

module.exports.deleteFile = async (file) => {
    await fs.unlink(file.path, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('file deleted successfully!')
        return;
    });
}