export interface TheftIncident {
  id: string;
  cycleId: string;
  reporterId: string;
  reportDate: string;
  status: 'reported' | 'in_progress' | 'resolved';
  location: {
    latitude: number;
    longitude: number;
  };
  description?: string;
}

export interface CycleTrackingData {
  cycleId: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
  speed: number;
}
