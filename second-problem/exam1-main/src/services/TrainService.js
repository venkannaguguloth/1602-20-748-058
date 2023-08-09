import axios from 'axios';

const BASE_URL = 'http://20.244.56.144';

const TrainService = {
  // ... (other functions)

  getAuthToken: async () => {
    // Implement your logic to get the authentication token
  },

  getAllTrains: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/train/trains`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSingleTrain: async (token, trainNumber) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/train/trains/${trainNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TrainService;
