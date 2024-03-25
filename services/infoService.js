import apiPanaderiaInfo from '../assets/ApiPanaderiaInfo.json';

function get() {
    const info = apiPanaderiaInfo;
    if(!info) throw new Error('Error obtaining general information abour API REST service');
    return info;
  }

export const infoService = {
    get
}