import Resizer from 'react-image-file-resizer';

export const resizeProfileImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 340, 340, 'JPEG', 50, 0,
    uri => {
      resolve(uri);
    },
    'blob'
    );
});

export const resizeMediaImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 1200, 900, 'JPEG', 80, 0,
    uri => {
      resolve(uri);
    },
    'blob'
    );
});


