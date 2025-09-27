import type { TheftIncident, CycleTrackingData } from "./types";

export const reportTheftIncident = async (incident: Omit<TheftIncident, 'id' | 'reportDate' | 'status'>): Promise<TheftIncident> => {
  // In a real application, this would involve an API call to the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      const newIncident: TheftIncident = {
        ...incident,
        id: `INC-${Date.now()}`,
        reportDate: new Date().toISOString(),
        status: 'reported',
      };
      console.log('Theft incident reported:', newIncident);
      resolve(newIncident);
    }, 1000);
  });
};

export const getCycleTrackingData = async (cycleId: string): Promise<CycleTrackingData[]> => {
  // In a real application, this would involve an API call to the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: CycleTrackingData[] = [
        { cycleId, timestamp: new Date().toISOString(), location: { latitude: 34.052235, longitude: -118.243683 }, speed: 0 },
        { cycleId, timestamp: new Date(Date.now() - 60000).toISOString(), location: { latitude: 34.052300, longitude: -118.243700 }, speed: 5 },
        { cycleId, timestamp: new Date(Date.now() - 120000).toISOString(), location: { latitude: 34.052400, longitude: -118.243800 }, speed: 10 },
      ];
      resolve(data);
    }, 1000);
  });
};
