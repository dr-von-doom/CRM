export enum contactType {
  CALL = "call",
  EMAIL = "email",
  MEETING = "meeting",
}

export interface FollowUpType {
  id: string;
  opportunityId: string;
  type: contactType;
  date: string;
  contactId: string | null;
  executiveId: string;
  description: string[];
  isDeleted: boolean;
}
