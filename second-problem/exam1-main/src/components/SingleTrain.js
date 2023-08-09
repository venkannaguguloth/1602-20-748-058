import { useState, useEffect } from 'react'; // Removed React import
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Paper } from '@mui/material';
import TrainService from '../services/TrainService';

function SingleTrain() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    async function fetchTrain() {
      try {
        const token = await TrainService.getAuthToken();
        const singleTrain = await TrainService.getSingleTrain(
          token,
          trainNumber
        );

        setTrain(singleTrain);
      } catch (error) {
        console.error('Error fetching train:', error);
      }
    }

    fetchTrain();
  }, [trainNumber]);

  return (
    <div>
      {train ? (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4">Train Details</Typography>
          <Typography>Train Name: {train.trainName}</Typography>
          {/* Display other train details */}
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default SingleTrain;
