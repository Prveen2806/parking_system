import type { ParkingFloor, ParkingSlot, User } from '@pages/cycleParking/types';
import { useState, useEffect } from 'react';
import { useValetManagement } from './useValetManagement'; // Import the valet management hook
import { notification } from 'antd';

const CYCLE_SLOTS_PER_FLOOR = 480; 
const CAR_SLOTS_PER_FLOOR = 60;
const BIKE_SLOTS_PER_FLOOR = 120;
const MINIBUS_SLOTS_PER_FLOOR = 30; // Minibuses might take up more space than cars
const CARGO_SLOTS_PER_FLOOR = 20; // Cargo vehicles take up the most space
const TOTAL_FLOORS = 16;

export const useParking = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [floors, setFloors] = useState<ParkingFloor[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const { assignValet, releaseValet } = useValetManagement(); // Use the valet management hook

  useEffect(() => {
    const initializeFloors = () => {
      const initialFloors: ParkingFloor[] = [];
      for (let i = 1; i <= TOTAL_FLOORS; i++) {
        let type: ParkingFloor['type'];
        let totalSlots = 0;
        let isSecurityFloor = false;

        if (i >= 1 && i <= 4) { 
          type = 'car';
          totalSlots = CAR_SLOTS_PER_FLOOR;
        } else if (i >= 5 && i <= 8) {
          type = 'cycle';
          totalSlots = CYCLE_SLOTS_PER_FLOOR;
        } else if (i >= 9 && i <= 12) {
          type = 'bike';
          totalSlots = BIKE_SLOTS_PER_FLOOR;
        } else if (i === 13 || i === 14) {
          type = 'minibus';
          totalSlots = MINIBUS_SLOTS_PER_FLOOR;
        } else if (i === 15 || i === 16) {
          type = 'cargo';
          totalSlots = CARGO_SLOTS_PER_FLOOR;
        } else {
          type = 'car'; // Default or mixed
          totalSlots = CAR_SLOTS_PER_FLOOR;
        }

        if (i === 16) {
          isSecurityFloor = true;
        }

        initialFloors.push({
          id: `FL${i}`,
          number: i,
          type,
          totalSlots,
          occupiedSlots: 0,
          isSecurityFloor,
        });
      }
      setFloors(initialFloors);
      return initialFloors;
    };
    
    const initializeSlots = (floorsToInitialize: ParkingFloor[]) => {
      const newSlots: ParkingSlot[] = [];
      
      floorsToInitialize.forEach(floor => {
        let slotsPerCurrentFloor = 0;
        let slotsPerRow = 0;
        let vehiclePrefix = '';
        let vehicleType: ParkingSlot['vehicleType'];

        switch (floor.type) {
          case 'car':
            slotsPerCurrentFloor = CAR_SLOTS_PER_FLOOR;
            slotsPerRow = 10;
            vehiclePrefix = 'E';
            vehicleType = 'car';
            break;
          case 'cycle':
            slotsPerCurrentFloor = CYCLE_SLOTS_PER_FLOOR;
            slotsPerRow = 20;
            vehiclePrefix = 'C';
            vehicleType = 'cycle';
            break;
          case 'bike':
            slotsPerCurrentFloor = BIKE_SLOTS_PER_FLOOR;
            slotsPerRow = 15; // Assuming 15 bikes per row
            vehiclePrefix = 'B';
            vehicleType = 'bike';
            break;
          case 'minibus':
            slotsPerCurrentFloor = MINIBUS_SLOTS_PER_FLOOR;
            slotsPerRow = 6; // Assuming 6 minibuses per row
            vehiclePrefix = 'M';
            vehicleType = 'minibus';
            break;
          case 'cargo':
            slotsPerCurrentFloor = CARGO_SLOTS_PER_FLOOR;
            slotsPerRow = 4; // Assuming 4 cargo vehicles per row
            vehiclePrefix = 'G';
            vehicleType = 'cargo';
            break;
          default:
            // Handle mixed or unknown types, maybe default to car
            slotsPerCurrentFloor = CAR_SLOTS_PER_FLOOR;
            slotsPerRow = 10;
            vehiclePrefix = 'E';
            vehicleType = 'car';
        }
        
        const totalRows = slotsPerCurrentFloor / slotsPerRow; 
        
        for (let row = 0; row < totalRows; row++) {
          for (let col = 0; col < slotsPerRow; col++) {
            const slotId = `${vehiclePrefix}${floor.number.toString().padStart(2, '0')}-${String(row + 1).padStart(2, '0')}-${String(col + 1).padStart(2, '0')}`;
            newSlots.push({
              id: slotId,
              status: Math.random() > 0.7 ? 'occupied' : 'free',
              direction: 'south', 
              vehicleType: vehicleType,
              floor: floor.number,
              section: `Section-${Math.floor(row / 4) + 1}`,
            });
          }
        }
      });
      setSlots(newSlots);
    };

    const initialFloors = initializeFloors();
    initializeSlots(initialFloors);
  }, []);

  const getSlotsByFloor = (floorNumber: number) => {
    return slots.filter(slot => slot.floor === floorNumber);
  };

  const parkVehicle = (slotId: string, user: User, vehicleSkills: string[]) => {
    if (!user.verified) {
      notification.error({
        message: 'Verification Required',
        description: 'Only verified users can use valet parking services.',
      });
      return;
    }

    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id === slotId && slot.status === 'free') {
          const assignedValet = assignValet(slot, vehicleSkills);
          return {
            ...slot,
            status: 'occupied',
            userId: user.id,
            parkedAt: new Date(),
            assignedValetId: assignedValet?.id, // Assign valet ID
          };
        }
        return slot;
      })
    );
  };

  const vacateSlot = (slotId: string) => {
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id === slotId && slot.status === 'occupied') {
          if (slot.assignedValetId) {
            releaseValet(slot.assignedValetId); // Release the valet
          }
          return {
            ...slot,
            status: 'free',
            userId: undefined,
            parkedAt: undefined,
            assignedValetId: undefined, // Clear assigned valet
          };
        }
        return slot;
      })
    );
  };

  const getFloorDetails = (floorNumber: number) => {
    return floors.find(floor => floor.number === floorNumber);
  };

  return {
    slots,
    floors,
    currentUser,
    setCurrentUser,
    selectedFloor,
    setSelectedFloor,
    getSlotsByFloor,
    parkVehicle,
    vacateSlot,
    getFloorDetails,
  };
};