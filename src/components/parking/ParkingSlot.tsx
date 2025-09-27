import { Tooltip } from 'antd';
import type { ParkingSlot as ParkingSlotType } from '@pages/cycleParking/types';

interface ParkingSlotProps {
  slot: ParkingSlotType;
  onClick?: (slot: ParkingSlotType) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ParkingSlot = ({ slot, onClick, size = 'md' }: ParkingSlotProps) => {
  const getStatusStyles = (status: ParkingSlotType['status']) => {
    switch (status) {
      case 'occupied':
        return { backgroundColor: '#ff4d4f', cursor: 'pointer' }; // Ant Design red
      case 'free':
        return { backgroundColor: '#52c41a', cursor: 'pointer' }; // Ant Design green
      case 'reserved':
        return { backgroundColor: '#faad14', cursor: 'pointer' }; // Ant Design yellow
      case 'maintenance':
        return { backgroundColor: '#f0f0f0', cursor: 'not-allowed' }; // Ant Design grey
      default:
        return { backgroundColor: '#f0f0f0' };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return { width: '32px', height: '48px' };
      case 'lg':
        return { width: '64px', height: '96px' };
      default:
        return { width: '48px', height: '72px' };
    }
  };

  const getDirectionIcon = (direction: ParkingSlotType['direction']) => {
    switch (direction) {
      case 'north': return '↑';
      case 'south': return '↓';
      case 'east': return '→';
      case 'west': return '←';
      default: return '↓';
    }
  };

  return (
    <Tooltip 
      title={
        <div>
          <div>Slot: {slot.id}</div>
          <div>Status: {slot.status}</div>
          <div>Vehicle Type: {slot.vehicleType}</div>
          <div>Section: {slot.section}</div>
          {slot.userId && <div>User: {slot.userId}</div>}
          {slot.parkedAt && (
            <div>Parked: {new Date(slot.parkedAt).toLocaleTimeString()}</div>
          )}
        </div>
      }
    >
      <div
        style={{
          ...getStatusStyles(slot.status),
          ...getSizeStyles(size),
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          border: '1px solid #d9d9d9'
        }}
        onClick={() => onClick?.(slot)}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', lineHeight: '1' }}>{slot.id}</div>
          <div style={{ fontSize: '18px', lineHeight: '1' }}>{getDirectionIcon(slot.direction)}</div>
        </div>
        
        {slot.status === 'maintenance' && (
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '12px',
            height: '12px',
            backgroundColor: '#faad14',
            borderRadius: '50%',
            border: '2px solid #fff'
          }} />
        )}
      </div>
    </Tooltip>
  );
};
