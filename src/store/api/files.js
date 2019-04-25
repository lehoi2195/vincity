import { API } from './common';

export default {
  uploadFile: (data) =>
    API.post(
      'uploads/files',
      data,
      {
        headers: {
          // 'Authorization': `access_token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    ),
};