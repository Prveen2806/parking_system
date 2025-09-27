export interface UserVerificationRequest {
  id: string;
  userId: string;
  documentType: 'drivers_license' | 'passport' | 'national_id';
  documentFrontImageUrl: string;
  documentBackImageUrl?: string;
  selfieImageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
  reviewerId?: string;
  rejectionReason?: string;
}

export interface User {
  id: string;
  name: string;
  isVerified: boolean;
}
