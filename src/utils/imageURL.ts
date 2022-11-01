import { IMAGE_URL } from './contants';

const imageURL = (url: string, size: string = 'original') => {
  return IMAGE_URL + size + url;
};

export default imageURL;
