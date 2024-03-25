import apiPanaderiaInfo from "../assets/ApiPanaderiaInfo.json" assert { type: "json" };
import logger from '../utils/logger.js'



function get() {
  try {
      const info = apiPanaderiaInfo;
      logger.info('API REST information obtained');
      if (!info) {
          throw new Error('Error obtaining general information about API REST service');
      }
      return info;
  } catch (error) {
      logger.error('Error obtaining general information about API REST service', error);
      throw error; 
  }
}

export const infoService = {
    get
}