export function calculateDistance(markerA, markerB) {
    if (!markerA || !markerB) return 0;
    const distanceInCoordinates = markerA.distanceTo(markerB);
    const kmPerCoordinateUnit = 0.0009942;
    return distanceInCoordinates * kmPerCoordinateUnit;
}

export function calculateTime(distance, speed) {
    const time = distance / speed;
    const totalTime = time + 0.02;
    const days = Math.floor(totalTime / 24);
    const hours = Math.floor(totalTime % 24);
    const minutes = Math.floor((totalTime % 1) * 60);
    return { days, hours, minutes };
}