// navigationUtils.js
import { distance, bearing } from "@turf/turf";

export const getDistance = (coord1, coord2) => {
  const from = [coord1.longitude, coord1.latitude];
  const to = [coord2.longitude, coord2.latitude];
  const options = { units: "meters" };

  const dist = distance(from, to, options);
  return Math.round(dist);
};

export const getDirection = (prevCoord, currCoord, nextCoord) => {
  const prevPoint = [prevCoord.longitude, prevCoord.latitude];
  const currPoint = [currCoord.longitude, currCoord.latitude];
  const nextPoint = [nextCoord.longitude, nextCoord.latitude];

  const bearing1 = bearing(prevPoint, currPoint);
  const bearing2 = bearing(currPoint, nextPoint);

  const angle = bearing2 - bearing1;
  const direction = getDirectionFromAngle(angle);
  return direction;
};

const getDirectionFromAngle = (angle) => {
  let absAngle = Math.abs(angle);
  if (absAngle > 180) {
    absAngle = 360 - absAngle;
  }
  if (absAngle <= 45) {
    return "forward";
  } else if (absAngle <= 180) {
    return angle > 0 ? "right" : "left";
  }
};
export const calculateTotalDistance = (routeCoords) => {
  let totalDistance = 0;
  for (let i = 0; i < routeCoords.length - 1; i++) {
    const coord1 = routeCoords[i];
    const coord2 = routeCoords[i + 1];
    const distance = getDistance(coord1, coord2);
    totalDistance += distance;
  }
  return totalDistance;
};
export const calculateETA = (distance, speed) => {
  const time = distance / speed; // Time in hours
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);

  let eta = "";
  if (hours > 0) {
    eta += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    eta += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return eta.trim();
};
