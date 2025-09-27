import { useState } from 'react';
import type { ValetStaff, ParkingSlot } from '@pages/cycleParking/types';

export const useValetManagement = () => {
const [valets, setValets] = useState<ValetStaff[]>([
  { 
    id: 'V001', 
    name: 'Alice', 
    email: 'alice@example.com',
    contactNumber: '111-222-3333',
    status: 'available', 
    skills: ['automatic'], 
    currentLocation: { floor: 1, section: 'A' },
  },
  { 
    id: 'V002', 
    name: 'Bob', 
    email: 'bob@example.com',
    contactNumber: '222-333-4444',
    status: 'available', 
    skills: ['manual', 'automatic'], 
    currentLocation: { floor: 2, section: 'B' },
  },
  { 
    id: 'V003', 
    name: 'Charlie', 
    email: 'charlie@example.com',
    contactNumber: '333-444-5555',
    status: 'break', 
    skills: ['automatic', 'luxury'], 
    currentLocation: { floor: 1, section: 'C' },
  },
]);

  const assignValet = (slot: ParkingSlot, vehicleSkills: string[]): ValetStaff | undefined => {
    const availableValets = valets.filter(v => v.status === 'available' && vehicleSkills.every(skill => v.skills.includes(skill)));

    if (availableValets.length === 0) {
      console.warn('No available valets with matching skills.');
      return undefined;
    }
    const suitableValet = availableValets.find(v => v.currentLocation?.floor === slot.floor);

    if (suitableValet) {
      const updatedValets = valets.map(v => 
        v.id === suitableValet.id ? { ...v, status: 'occupied' as 'occupied', currentAssignment: slot.id } : v
      );
      setValets(updatedValets as ValetStaff[]);
      return suitableValet;
    } else {
      console.warn('No suitable valet found on the same floor, assigning first available with skills.');
      const firstAvailableValet = availableValets[0];
      const updatedValets = valets.map(v => 
        v.id === firstAvailableValet.id ? { ...v, status: 'occupied' as 'occupied', currentAssignment: slot.id } : v
      );
      setValets(updatedValets as ValetStaff[]);
      return firstAvailableValet;
    }
  };

  const releaseValet = (valetId: string) => {
    const updatedValets = valets.map(v => 
      v.id === valetId ? { ...v, status: 'available', currentAssignment: undefined } : v
    );
    setValets(updatedValets as ValetStaff[]);
  };

  const updateValetLocation = (valetId: string, floor: number, section: string) => {
    const updatedValets = valets.map(v =>
      v.id === valetId ? { ...v, currentLocation: { floor, section } } : v
    );
    setValets(updatedValets);
  };

  return { valets, assignValet, releaseValet, updateValetLocation };
};
