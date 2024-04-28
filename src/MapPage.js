import React, { useState, useEffect } from 'react';
import './App.css';
const data=[
    {
        
        image:"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" 
    }
]


const MapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nextStop, setNextStop] = useState(null);
  // Define intermediate stops and their coordinates
  const intermediateStops = [
    { name: 'Stop A', coordinates: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
    { name: 'Stop B', coordinates: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
    
  ];

  useEffect(() => {
    // Function to update current location using Geolocation API
    const updateCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    };

    // Update current location periodically
    const intervalId = setInterval(updateCurrentLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to calculate distance between two points
  const calculateDistance = (point1, point2) => {
    // Implementation of distance calculation algorithm
  };

  // Function to calculate ETA for the next stop
  const calculateETA = () => {
    if (currentLocation) {
      const distances = intermediateStops.map(stop => ({
        name: stop.name,
        distance: calculateDistance(currentLocation, stop.coordinates)
      }));
      const nextStopInfo = distances.reduce((min, stop) => min.distance < stop.distance ? min : stop);
      setNextStop(nextStopInfo);
    }
  };

  useEffect(() => {
    calculateETA();
  }, [currentLocation]);

  return (
    <>
        <div>
   
      <div id="map">
       {
        data.map(({image})=>{
            return(
                <>
                <img src={image} />
                </>
            )
        })
       }
      </div>
      
      {currentLocation && nextStop && (
        <div>
          <p>Current Location: {currentLocation.lat}, {currentLocation.lng}</p>
          <p>Next Stop: {nextStop.name}</p>
          <p>ETA: {calculateETA()}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default MapPage;