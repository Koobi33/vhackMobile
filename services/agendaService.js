import service from './service';
import {getApiUrl} from './getApiUrl';
import getToken from './getToken';

const CALENDAR_ENDPOINT = 'calendar/';
const TEACHER_ENDPOINT = 'teacher/';


export default {
  getLessons: async () => {
    const Authorization =  await getToken();
    const { data } = await service.get(getApiUrl(CALENDAR_ENDPOINT)
      // , { headers: Authorization }
      );
    return data.lessons;
  }
}
