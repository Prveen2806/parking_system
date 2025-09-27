export interface CycleSpot {
  id: string;
  isOccupied: boolean;
  direction: 'north' | 'south' | 'east' | 'west'; // Direction the cycle should be parked
  gateId: string; // The ID of the nearest gate this spot is associated with
}

export interface ParkingGate {
  id: string;
  name: string;
  location: 'north' | 'south' | 'east' | 'west';
}

export interface ParkingFloor {
  id: string;
  number: number;
  type: 'cycle' | 'car' | 'bike' | 'minibus' | 'cargo' | 'mixed';
  totalSlots: number;
  occupiedSlots: number;
  isSecurityFloor: boolean;
}

export interface ParkingSlot {
  id: string;
  status: 'free' | 'occupied' | 'reserved' | 'maintenance';
  direction: 'north' | 'south' | 'east' | 'west';
  vehicleType: 'cycle' | 'car' | 'bike' | 'minibus' | 'cargo';
  floor: number;
  section: string;
  userId?: string;
  parkedAt?: Date;
  assignedValetId?: string; // New field to track assigned valet
}

export interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  vehicleRegistration: string;
  contactNumber: string;
  parkingLocation?: string; // e.g., "Floor 1, Section A, Slot 12"
}

export type ValetStaff = {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  status: 'available' | 'occupied' | 'break';
  currentAssignment?: string; // Slot ID or task description
  skills: string[]; // e.g., ['manual', 'automatic', 'luxury']
  currentLocation?: { floor: number; section: string }; // Current physical location of the valet
}