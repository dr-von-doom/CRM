export enum OpportunityBusinessType {
  OUTSOURCING = "outsourcing",
  WEB_DEV = "web_dev",
  MOBILE_DEV = "mobile_dev",
  IT_CONSULTING = "it_consulting",
}

export const opportunityBusinessTypeMap: Record<
  OpportunityBusinessType,
  string
> = {
  [OpportunityBusinessType.OUTSOURCING]: "Outsourcing",
  [OpportunityBusinessType.WEB_DEV]: "Web Development",
  [OpportunityBusinessType.MOBILE_DEV]: "Mobile Development",
  [OpportunityBusinessType.IT_CONSULTING]: "IT Consulting",
};

export enum OpportunityStatus {
  OPEN = "open",
  IN_STUDY = "in_study",
  PURCHASE_ORDER = "purchase_order",
  COMPLETED = "completed",
}

export const opportunityStatusMap: Record<OpportunityStatus, string> = {
  [OpportunityStatus.OPEN]: "Open",
  [OpportunityStatus.IN_STUDY]: "In Study",
  [OpportunityStatus.PURCHASE_ORDER]: "Purchase Order",
  [OpportunityStatus.COMPLETED]: "Completed",
};

export interface OpportunityType {
  id?: string;
  clientId: string;
  businessName: string;
  businessType: OpportunityBusinessType;
  description: string;
  status: OpportunityStatus;
  estimatedDate: string;
  estimatedValue: number;
  isDeleted: boolean;
}
