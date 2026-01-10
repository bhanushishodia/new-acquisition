// src/utils/getImage.js
const getImage = (imageName) => {
    // CDN base URL
    const cdnBaseUrl = 'https://ik.imagekit.io/cloy701fl/images/'; // Replace with your actual CDN path

    // Return the full URL for the image
    return `${cdnBaseUrl}${imageName}`;
};

export { getImage };
