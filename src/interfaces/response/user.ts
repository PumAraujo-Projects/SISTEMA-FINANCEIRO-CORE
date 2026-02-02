export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  code: string;
  nuit: string;
  msisdn: string;
  address: string;
  dateOfBirth?: string;
  gender?: "M" | "F" | "Other";
  role: string;
  notes?: string;
  isActive: boolean;
  registrationDate: string;
  nationality?: string;
  maritalStatus?: string;
  occupation?: string;
  preferredPaymentMethod?: string;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}
