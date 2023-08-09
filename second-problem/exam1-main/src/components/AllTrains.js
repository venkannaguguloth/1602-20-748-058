import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TrainService from '../services/TrainService';

function AllTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    async function fetchTrains() {
      try {
        const token = await TrainService.getAuthToken();
        const allTrains = await TrainService.getAllTrains(token);

        // Filter out trains departing in the next 30 minutes
        const filteredTrains = allTrains.filter((train) => {
          // ... (same as before)
        });

        // Sort trains based on specified criteria
        const sortedTrains = filteredTrains.sort((a, b) => {
          if (a.price.sleeper !== b.price.sleeper) {
            return a.price.sleeper - b.price.sleeper;
          }
          if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
            return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
          }
          const aDepartureTime = new Date();
          aDepartureTime.setHours(
            a.departureTime.Hours,
            a.departureTime.Minutes + a.delayedBy,
            0,
            0
          );
          const bDepartureTime = new Date();
          bDepartureTime.setHours(
            b.departureTime.Hours,
            b.departureTime.Minutes + b.delayedBy,
            0,
            0
          );
          return aDepartureTime - bDepartureTime;
        });

        setTrains(sortedTrains);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    }

    fetchTrains();
  }, []);

  return (
    <div>
      <Typography variant="h4">All Trains</Typography>
      <List>
        {trains.map((train) => (
          <ListItem
            key={train.trainNumber}
            sx={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
            }}
          >
            <ListItemText
              primary={
                <Link to={`/train/${train.trainNumber}`}>
                  {train.trainName}
                </Link>
              }
              secondary={`Departure: ${train.departureTime.Hours}:${train.departureTime.Minutes}`}
            />
            <ListItemText
              secondary={`Sleeper Seats: ${train.seatsAvailable.sleeper}`}
            />
            {/* Display other train details */}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AllTrains;
