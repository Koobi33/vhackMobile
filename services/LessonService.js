import service from './service';
import {getApiUrl} from './getApiUrl';
import getToken from './getToken';

const IMAGE_ENDPOINT = '/assessment/1';
const PINS_ENDPOINT = '/assessment/pins/1';

export default {
  getImage: async () => {
    const Authorization =  await getToken();
    const resp = await service.get(getApiUrl(IMAGE_ENDPOINT), { headers: {Authorization}});
    const { data } = await service.get(getApiUrl(PINS_ENDPOINT), { headers: {Authorization}});
    return {
      url: getApiUrl(IMAGE_ENDPOINT),
      uriForImage: { uri: getApiUrl(IMAGE_ENDPOINT) },
      props: {
        style: { width: 200, height: 200 },
        pins: data.pins,
      }};
  },
}
