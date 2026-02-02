import { User } from "@prisma/client";
import { UserResponse } from "../../interfaces/response/user";
import { formatDateToSouthAfrica } from "../../infrastruture/utils/dateUtils";


export class UserModel {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  buildResponse(): UserResponse {
    return {
      id: this.user.id,
      fullName: this.user.fullName,
      email: this.user.email,
      code: this.user.code,
      nuit: this.user.nuit ?? "",
      msisdn: this.user.msisdn ?? "",
      address: this.user.address ?? "",
      dateOfBirth: this.user.dateOfBirth ? formatDateToSouthAfrica(this.user.dateOfBirth) : undefined,
      gender: this.user.gender as "M" | "F" | "Other" | undefined,
      role: this.user.role,
      notes: this.user.notes ?? "",
      isActive: this.user.isActive ?? true,
      registrationDate: this.user.registrationDate
        ? formatDateToSouthAfrica(this.user.registrationDate)
        : formatDateToSouthAfrica(this.user.createdAt),
      nationality: this.user.nationality ?? "",
      maritalStatus: this.user.maritalStatus ?? "",
      occupation: this.user.occupation ?? "",
      preferredPaymentMethod: this.user.preferredPaymentMethod ?? "",
      loyaltyPoints: this.user.loyaltyPoints ?? 0,
      createdAt: formatDateToSouthAfrica(this.user.createdAt),
      updatedAt: formatDateToSouthAfrica(this.user.updatedAt),
    };
  }
}
