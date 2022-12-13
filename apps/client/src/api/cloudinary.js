import {Cloudinary} from "@cloudinary/url-gen";

const cloudinary = () => {
 // Create and configure your Cloudinary instance.
 const cld = new Cloudinary({
    cloud: {
      cloudName: 'dkilrhnk7'
    }
  }); 
  return cld
}

export default cloudinary