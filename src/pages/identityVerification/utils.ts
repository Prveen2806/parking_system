import type { UserVerificationRequest } from "./types";
import { verifyUser } from "@pages/valetManagement/utils";


const verificationRequestsDB: UserVerificationRequest[] = [
  {
    id: 'VER-001',
    userId: 'user123',
    documentType: 'drivers_license',
    documentFrontImageUrl: 'https://example.com/driver_front.jpg',
    status: 'pending',
    submissionDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'VER-002',
    userId: 'user456',
    documentType: 'passport',
    documentFrontImageUrl: 'https://example.com/passport_front.jpg',
    status: 'approved',
    submissionDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    reviewDate: new Date(Date.now() - 86400000).toISOString(),
    reviewerId: 'admin789',
  },
];

export const submitVerificationRequest = async (request: Omit<UserVerificationRequest, 'id' | 'status' | 'submissionDate' | 'reviewDate' | 'reviewerId' | 'rejectionReason'>): Promise<UserVerificationRequest> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest: UserVerificationRequest = {
        ...request,
        id: `VER-${Date.now()}`,
        status: 'pending',
        submissionDate: new Date().toISOString(),
      };
      verificationRequestsDB.push(newRequest); // Add new request to our "database"
      console.log('Verification request submitted:', newRequest);
      resolve(newRequest);
    }, 1000);
  });
};

export const fetchUserVerificationRequests = async (userId?: string): Promise<UserVerificationRequest[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userId ? verificationRequestsDB.filter(req => req.userId === userId) : verificationRequestsDB);
    }, 1000);
  });
};

export const updateUserVerificationStatus = async (requestId: string, status: 'approved' | 'rejected', reviewerId: string, rejectionReason?: string): Promise<UserVerificationRequest> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const existingRequestIndex = verificationRequestsDB.findIndex(req => req.id === requestId);
      
      if (existingRequestIndex > -1) {
        const existingRequest = verificationRequestsDB[existingRequestIndex];
        const updatedRequest: UserVerificationRequest = {
          ...existingRequest,
          status,
          reviewDate: new Date().toISOString(),
          reviewerId,
          rejectionReason,
        };
        verificationRequestsDB[existingRequestIndex] = updatedRequest; // Update the request in our "database"

        if (status === 'approved') {
          try {
            await verifyUser(existingRequest.userId); // Assuming userId in UserVerificationRequest is the email
            console.log(`User ${existingRequest.userId} marked as verified.`);
          } catch (error) {
            console.error(`Failed to verify user ${existingRequest.userId}:`, error);
            // Depending on requirements, you might want to reject the verification request here
          }
        }

        console.log('Verification request updated:', updatedRequest);
        resolve(updatedRequest);
      } else {
        reject(new Error('Request not found'));
      }
    }, 1000);
  });
};
