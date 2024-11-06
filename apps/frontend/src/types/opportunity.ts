export enum OpportunityBusinessType {
  OUTSOURCING = "outsourcing",
  WEB_DEV = "web_dev",
  MOBILE_DEV = "mobile_dev",
  IT_CONSULTING = "it_consulting",
}

export enum OpportunityStatus {
  OPEN = "open",
  IN_STUDY = "in_study",
  PURCHASE_ORDER = "purchase_order",
  COMPLETED = "completed",
}

export interface OpportunityType {
  id: string;
  clientId: string;
  businessType: OpportunityBusinessType;
  description: string;
  status: OpportunityStatus;
  estimatedDate: string;
  isDeleted: boolean;
}
