// export const url = 'http://192.168.10.11:5050'
// export const url = "http://18.218.23.153:5000"
import img from '../../src/assets/icons/PT Logo.png';
export const url = 'http://10.0.60.137:5050';
// export const url = 'https://api.protippz.com';

export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : `${img}`;
};
