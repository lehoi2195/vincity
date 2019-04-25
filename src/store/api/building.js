import { API } from './common';

export default {
  getBuildings: (params = {}) => API.get('building/info', params),
  getApartments: (buildingId) => API.get(`apartment/get/all/building/${buildingId}`),
  getBuildingType: (token) => {
    return API.get(
      `buildingTypes`,
      {},
      { headers: { Authorization: token } }
    )
  },
  getSingleBuildingType: (token, buildingTypeId) => {
    return API.get(
      `buildingTypes/${buildingTypeId}`,
      {},
      { headers: { Authorization: token } }
    )
  },
};