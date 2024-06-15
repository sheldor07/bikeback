const Polyline = require("@mapbox/polyline");
// Function to create a route between a start and end point using destination mode
async function generateRoute(start, end, waypoints = [], isDestinationMode) {
  console.log(start, end, waypoints);

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    let requestBody = {};
    if (isDestinationMode) {
      requestBody = {
        origin: start,
        destination: end,
        travelMode: "BICYCLE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: "en-US",
        units: "METRIC",
      };
    } else {
      requestBody = {
        origin: {
          location: {
            latLng: {
              latitude: start.lat,
              longitude: start.lng,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: end.lat,
              longitude: end.lng,
            },
          },
        },
        travelMode: "BICYCLE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: "en-US",
        units: "METRIC",
        intermediates: waypoints.map((waypoint) => ({
          location: {
            latLng: {
              latitude: waypoint.lat,
              longitude: waypoint.lng,
            },
          },
        })),
      };
      console.log(requestBody.origin.location);
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(`Directions request failed with status: ${data.status}`);
    }
    if (data.routes.length === 0) {
      throw new Error(`No routes found`);
    }

    const route = data.routes[0];

    const encodedPolyline = route.polyline.encodedPolyline;
    const decodedPolyline = Polyline.decode(encodedPolyline);

    const coordinates = decodedPolyline.map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }));

    const routeData = {
      seconds: route.duration,
      distanceMeters: route.distanceMeters,
      coordinates: coordinates,
    };
    return routeData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function createRouteDestinationMode(req, res) {
  const { start, end } = req.body;
  //console.log(start, end);
  try {
    const routeData = await generateRoute(start, end, [], true); // Send the route data in the response
    res.send(routeData).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

// Function to create a leisure route based on a starting location and ride duration
async function createRouteLeisureMode(req, res) {
  try {
    let startingLocation = req.body.startingLocation;
    const rideDuration = req.body.rideDuration; // in seconds
    const avgSpeed = 4.16667; // 15 km/h in m/s
    const maxRideRadius = Math.round((rideDuration * avgSpeed) / 2);
    startingLocation = (await getPlaceCoordinates(startingLocation))[
      "location"
    ];
    const selectedPlaces = await getPlacesOfInterest(
      startingLocation,
      maxRideRadius,
      rideDuration,
      avgSpeed
    );

    const routeDataTillLastWayPoint = await generateRoute(
      startingLocation,
      selectedPlaces[selectedPlaces.length - 1],
      selectedPlaces.slice(0, selectedPlaces.length - 1)
    );
    const routeDataFromLastWayPoint = await generateRoute(
      selectedPlaces[selectedPlaces.length - 1],
      startingLocation
    );

    const routeData = {
      seconds:
        parseInt(routeDataTillLastWayPoint.seconds.replace("s", "")) +
        parseInt(routeDataFromLastWayPoint.seconds.replace("s", "")) +
        "s",
      distanceMeters:
        routeDataTillLastWayPoint.distanceMeters +
        routeDataFromLastWayPoint.distanceMeters,
      coordinates: [
        ...routeDataTillLastWayPoint.coordinates,
        ...routeDataFromLastWayPoint.coordinates,
      ],
    };
    res.send(routeData).status(200);
  } catch (error) {
    // Log the error and send a 500 response with an error message
    console.error(error);
    res.status(500).json({ error: "Failed to get the route" });
  }
}

// Function to get places of interest near a starting location
async function getPlacesOfInterest(
  startingLocation,
  maxRideRadius,
  rideDuration,
  avgSpeed
) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
  const params = {
    location: `${startingLocation.lat},${startingLocation.lng}`,
    radius: maxRideRadius,
    type: "park",
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  //console.log(params)
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const selectedPlaces = await selectPlacesforRoute(
      startingLocation,
      rideDuration,
      avgSpeed,
      data
    );

    //console.log(selectedPlaces);

    return selectedPlaces;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}
async function getPlaceCoordinates(place) {
  const placeId = place.placeId;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    console.error(response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const location = data.results[0].geometry.location;
  return { location };
}
async function selectPlacesforRoute(
  startingLocation,
  rideDuration,
  avgSpeed,
  placesData
) {
  // Calculate distance and time for each place
  //console.log(placesData);
  const places = placesData.results;
  const placesWithInfo = await Promise.all(
    places.map(async (place) => {
      const placeLocation = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      };
      const distance = await calculateDistance(startingLocation, placeLocation);
      const estimatedTime = distance / avgSpeed;
      return { ...place, distance, estimatedTime };
    })
  ); // Sort places by distance
  placesWithInfo.sort((a, b) => a.distance - b.distance);
  const selectedPlaces = [startingLocation];

  let totalTime = 0;

  for (const place of placesWithInfo) {
    if (place.business_status !== "OPERATIONAL") {
      continue;
    }

    const prevPlace = selectedPlaces[selectedPlaces.length - 1];
    const placeLocation = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    const distance = await calculateDistance(prevPlace, placeLocation);
    const estimatedTime = distance / avgSpeed;

    if (totalTime + estimatedTime <= rideDuration) {
      selectedPlaces.push(placeLocation);
      totalTime += estimatedTime;
    } else {
      break;
    }
  }
  // Add the time to return to the starting location
  const lastPlace = selectedPlaces[selectedPlaces.length - 1];
  const returnDistance = await calculateDistance(lastPlace, startingLocation);
  const returnTime = returnDistance / avgSpeed;

  if (totalTime + returnTime <= rideDuration) {
    selectedPlaces.push(startingLocation);
    totalTime += returnTime;
  }

  selectedPlaces.slice(1, selectedPlaces.length);
  return selectedPlaces;
}
async function calculateDistance(start, end) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start.lat},${start.lng}&destinations=${end.lat},${end.lng}&mode=bicycling&units=imperial&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "OK") {
      const distance = data.rows[0].elements[0].distance.value;
      return distance; 
      //console.log(distance);
    } else {
      throw new Error(`Distance Matrix API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
}
// Export the functions for use in other parts of the application
module.exports = { createRouteDestinationMode, createRouteLeisureMode };
