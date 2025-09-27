import type { CycleSpot, ParkingGate } from "./types";


export const initializeParkingSpots = (numSpots: number, gates: ParkingGate[]): CycleSpot[] => {
  const spots: CycleSpot[] = [];
  for (let i = 0; i < numSpots; i++) {
    // For simplicity, assign gates and directions in a round-robin fashion
    const gate = gates[i % gates.length];
    spots.push({
      id: `spot-${i + 1}`,
      isOccupied: false,
      direction: gate.location, // Assume spot direction is towards the nearest gate's location
      gateId: gate.id,
    });
  }
  return spots;
};

export const parkCycle = (spotId: string, parkingSpots: CycleSpot[]): CycleSpot[] => {
  return parkingSpots.map(spot =>
    spot.id === spotId ? { ...spot, isOccupied: true } : spot
  );
};

export const unparkCycle = (spotId: string, parkingSpots: CycleSpot[]): CycleSpot[] => {
  return parkingSpots.map(spot =>
    spot.id === spotId ? { ...spot, isOccupied: false } : spot
  );
};

export const getAvailableSpots = (parkingSpots: CycleSpot[]): CycleSpot[] => {
  return parkingSpots.filter(spot => !spot.isOccupied);
};

export const getOccupiedSpots = (parkingSpots: CycleSpot[]): CycleSpot[] => {
    return parkingSpots.filter(spot => spot.isOccupied);
};
