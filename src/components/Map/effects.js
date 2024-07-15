import { useEffect } from "react";
import { calculateDistance, calculateTime } from "../../utils/calculates";
import { latLng } from "leaflet";

export const useMapEffect = (markers, speed, setDistance, setTravelTime) => {

    return useEffect(() => {
        if (markers.length > 1) {
            const totalDistance = markers.reduce((acc, marker, idx, arr) => {
                if (idx === 0) return acc;
                const prevMarker = latLng(arr[idx - 1].lat, arr[idx - 1].lng);
                const currentMarker = latLng(marker.lat, marker.lng);
                return acc + calculateDistance(prevMarker, currentMarker);
            }, 0);
            setDistance(totalDistance);
            setTravelTime(calculateTime(totalDistance, speed));
        } else {
            setDistance(0);
            setTravelTime({ days: 0, hours: 0, minutes: 0 });
        }
    }, [markers, speed]);
}