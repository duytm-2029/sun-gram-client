// - Get file Extension
const getExtension = fileName => {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(fileName)[1];
};

// Converts image to canvas returns new canvas element
const convertImageToCanvas = image => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext('2d').drawImage(image, 0, 0);

  return canvas;
};

/**
 * Constraint image size
 * @param {file} file
 * @param {number} maxWidth
 * @param {number} maxHeight
 */
const constraintImage = (file, fileName, maxWidth, maxHeight) => {
  // Ensure it's an image
  if (file.type.match(/image.*/)) {
    // Load the image
    const reader = new FileReader();
    reader.onload = readerEvent => {
      const image = new Image();
      image.onload = imageEvent => {
        // Resize the image
        const canvas = document.createElement('canvas');
        const maxSize = 986; // TODO : pull max size from a site config
        let { width } = image;
        let { height } = image;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL();
        const resizedImage = dataURLToBlob(dataUrl);
        const evt = new CustomEvent('onSendResizedImage', {
          detail: { resizedImage, fileName },
        });
        window.dispatchEvent(evt);
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  }
};

/**
 * Convert data URL to blob
 * @param {object} dataURL
 */
const dataURLToBlob = dataURL => {
  const BASE64_MARKER = 'base64,';
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(',');
    const contentType = parts[0].split(':')[1];
    const raw = parts[1];

    return new Blob([raw], { type: contentType });
  }

  const parts = dataURL.split(BASE64_MARKER);
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

export default {
  dataURLToBlob,
  convertImageToCanvas,
  getExtension,
  constraintImage,
};
