import { API } from './common';

export default {
    getListNotification: (token, page) =>
        API.get(
            `/notifications?page=${page}`,
            {},
            { headers: { Authorization: token } }
        ),
    getDetailNotification: (token, notificationId) =>
        API.get(
            `/notifications/${notificationId}`,
            {},
            { headers: { Authorization: token } }
        ),
    deleteNotification: (token, data) =>
        API.post(
            `/notifications`,
            data,
            { headers: { Authorization: token } }
        ),
    getCountNotification: (token) =>
        API.get(
            `/notifications/count/unread`,
            {},
            { headers: { Authorization: token } }
        ),
    getQuickSearch: (token, query) =>
        API.get(
            `/search${query}`,
            {},
            { headers: { Authorization: token } }
        ),
    getConfig: (token) =>
        API.get(
            `/config`,
            {},
            { headers: { Authorization: token } }
        ),
    getDocumentLibrary: (token, query) =>
        API.get(
            `/folders${query}`,
            {},
            { headers: { Authorization: token } }
        ),
    getProjectByCity: (token) =>
        API.get(
            `/search/project`,
            {},
            { headers: { Authorization: token } }
        ),
    searchDocument: (token, name, projectId, type) => {
        const query = projectId !== null
            ? `/folders/search?text=${name}&project=${projectId}&type=${type}`
            : `/folders/search?text=${name}&type=${type}`;
        return API.get(
            query,
            {},
            { headers: { Authorization: token } }
        )
    },
    getPolicy: (token, projectId) =>
        API.get(
            `/agency?projectId=${projectId}`,
            {},
            { headers: { Authorization: token } }
        ),
    getAllProjects: (token, projectId) => {
        const query = projectId ? `projects/${projectId}` : 'projects';
        return API.get(
            query,
            {},
            { headers: { Authorization: token } }
        )
    },
    getZones: (token, zoneId) => {
        const query = zoneId ? `zones/${zoneId}` : 'zones';
        return API.get(
            query,
            {},
            { headers: { Authorization: token } }
        )
    },
    getAllBuildingOfZone: (token, zoneId) => {
        return API.get(
            `zones/buildings/${zoneId}`,
            {},
            { headers: { Authorization: token } }
        )
    },
    getBuilding: (token, buildingId) => {
        return API.get(
            `buildings/${buildingId}`,
            {},
            { headers: { Authorization: token } }
        )
    },
    getContact: (token) => {
        return API.get(
            `/contacts`,
            {},
            { headers: { Authorization: token } }
        )
    },
    getToday: (token) => {
        return API.get(
            `/hotdata`,
            {},
            { headers: { Authorization: token } }
        )
    },
    getNewsDetail: (token, newId) => {
        return API.get(
            `/news/${newId}`,
            {},
            { headers: { Authorization: token } }
        )
    },
    likeApartment: (token, apartmentId, data) => {
        return API.post(
            `/apartmentDetails/${apartmentId}/favorite`,
            data,
            { headers: { Authorization: token } }
        )
    },

};