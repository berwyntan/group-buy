const cloudinary = require('cloudinary').v2;

const deleteImage = async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) return res.status(400).json({message: "No public id"})
    
    cloudinary.uploader
        .destroy(public_id)
        .then(result=> {
            // console.log(result)
            if (result.result === 'ok') return res.status(200).json(result)
            return res.status(400).json(result)
        });
        
}
    

    

module.exports = { deleteImage }