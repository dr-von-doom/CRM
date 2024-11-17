export enum contactType {
  CALL = "Call",
  EMAIL = "Email",
  MEETING = "Meeting",
}

export interface FollowUpType {
  id: string;
  opportunityId: string;
  type: contactType;
  date: string;
  contactId: string | null;
  executiveId: string;
  description: string[]; 
}
