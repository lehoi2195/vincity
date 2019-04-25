import { API } from './common';

export default {
    getApartmentsCate: (token) =>
        API.get(
            `apartmentCategories`,
            {},
            { headers: { Authorization: token } }
        ),
    getApartmentsType: (token) =>
        API.get(
            `apartmentTypes`,
            {},
            { headers: { Authorization: token } }
        ),
};