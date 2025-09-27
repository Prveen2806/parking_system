
import { ParkingSlot } from './ParkingSlot';
import { Card, Select, Typography } from 'antd';
import type { ParkingFloor } from '@pages/cycleParking/types';

const { Title, Text } = Typography;

interface ParkingGridProps {
  slots: any[];
  title: string;
  onSlotClick?: (slot: any) => void;
  selectedFloor?: number;
  onFloorChange?: (floor: number) => void;
  floors?: ParkingFloor[];
  floorType: 'cycle' | 'car' | 'bike' | 'cargo' | 'minibus' |'mixed';
}

export const ParkingGrid = ({ 
  slots, 
  title, 
  onSlotClick, 
  selectedFloor = 1 || 7,
  onFloorChange,
  floors = [],
  floorType
}: ParkingGridProps) => {
  const slotsPerRow = floorType === 'car' ? 10 : 20; // Dynamic slots per row based on floor type
  const rows: any[][] = [];
  
  for (let i = 0; i < slots.length; i += slotsPerRow) {
    rows.push(slots.slice(i, i + slotsPerRow));
  }

  const occupiedCount = slots.filter(slot => slot.status === 'occupied').length;
  const freeCount = slots.filter(slot => slot.status === 'free').length;
  const reservedCount = slots.filter(slot => slot.status === 'reserved').length;

  return (
    <Card style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={3} style={{ fontSize: '20px', fontWeight: '600', color: 'rgba(0, 0, 0, 0.88)', marginBottom: '0' }}>{title}</Title>
          <div style={{ display: 'flex', gap: '24px', marginTop: '8px', fontSize: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#52c41a', borderRadius: '4px' }}></div>
              Free: {freeCount}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#ff4d4f', borderRadius: '4px' }}></div>
              Occupied: {occupiedCount}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#faad14', borderRadius: '4px' }}></div>
              Reserved: {reservedCount}
            </span>
          </div>
        </div>
        
        {floors.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Text style={{ fontSize: '14px', fontWeight: '500' }}>Floor:</Text>
            <Select
              value={selectedFloor}
              onChange={onFloorChange}
              style={{ width: '128px' }}
              options={floors.map(floor => ({
                label: `Floor ${floor.number}${floor.isSecurityFloor ? ' (Security)' : ''}`,
                value: floor.number
              }))}
            />
          </div>
        )}
      </div>
      
      {/* Pathways and Layout */}
      <div style={{ position: 'relative' }}>
        {/* Entry/Exit Gates */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#f0f0f0', padding: '8px 16px', borderRadius: '4px', color: 'rgba(0, 0, 0, 0.88)', fontWeight: '600' }}>
            Entry Gate A
          </div>
          <div style={{ backgroundColor: '#f0f0f0', padding: '8px 16px', borderRadius: '4px', color: 'rgba(0, 0, 0, 0.88)', fontWeight: '600' }}>
            Exit Gate B
          </div>
          <div style={{ backgroundColor: '#f0f0f0', padding: '8px 16px', borderRadius: '4px', color: 'rgba(0, 0, 0, 0.88)', fontWeight: '600' }}>
            Exit Gate C
          </div>
        </div>
        
        {/* Main Pathway */}
        <div style={{ backgroundColor: '#f0f0f0', height: '16px', width: '100%', marginBottom: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', fontWeight: '500' }}>← MAIN PATHWAY →</Text>
        </div>
        
        {/* Parking Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${slotsPerRow}, 1fr)`, gap: '4px' }}>
                {row.map((slot) => (
                  <ParkingSlot 
                    key={slot.id} 
                    slot={slot} 
                    onClick={onSlotClick}
                    size={floorType === 'car' ? "lg" : "sm"}
                  />
                ))}
              </div>
              
              {/* Side pathways every 4 rows */}
              {(rowIndex + 1) % 4 === 0 && rowIndex < rows.length - 1 && (
                <div style={{ backgroundColor: '#f0f0f0', height: '8px', width: '100%', margin: '8px 0', borderRadius: '4px' }}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom pathway to exit */}
        <div style={{ backgroundColor: '#f0f0f0', height: '16px', width: '100%', marginTop: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', fontWeight: '500' }}>→ EXIT PATHWAY →</Text>
        </div>
      </div>
    </Card>
  );
};