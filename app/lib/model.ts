export enum MessageStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED",
}

export enum VerificationStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

export enum NotificationStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    READ = "READ",
}

export enum AssetType {
    IMAGE = "IMAGE",
    DOCUMENT = "DOCUMENT",
    OTHER = "OTHER",
}

export enum CategoryType {
    PROPERTY = "PROPERTY",
    INSURANCE = "INSURANCE",
    FINANCIAL = "FINANCIAL",
    CRYPTO = "CRYPTO",
    SECRET = "SECRET",
}

export enum LicenseType {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM",
}

export enum PlanType {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export enum PaymentSystem {
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
}

export enum PaymentType {
    DEBIT = "DEBIT",
    CREDIT = "CREDIT",
}

export interface User {
    //id: number,
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthDate?: Date,
    birthPlace?: string,
    residence?: string,
    phoneNumber?: string,
    fiscalCode?: string,
}

export interface Message {
    id: number,
    timestamp: Date,
    status: MessageStatus,
    channel: string,
    type: string,
}

export interface Verification {
    id: number,
    timestamp: Date,
    status: VerificationStatus,
}

export interface Notification {
    id: number,
    timestamp: Date,
    status: NotificationStatus,
}

export interface Designated {
    //id: number,
    id: string,
    email: string,
    name: string,
    firstName: string,
    lastName: string,
    birthDate?: Date,
    birthPlace?: string,
    residence?: string,
    phoneNumber?: string,
    fiscalCode?: string,
    image_url: string,
}

export interface Asset {
    //id: number,
    id: string,
    designatedId: string,
    type: AssetType,
    category: CategoryType,
    description: string,
    amount: number,
    date: string,
    status: "pending" | "paid",
}

export interface Subscription {
    id: number,
    licenceType: LicenseType,
    startDate: Date,
    endDate: Date,
    planType: PlanType,
    paymentSystem: PaymentSystem,
}

export interface Payment {
    id: number,
    timestamp: Date,
    type: PaymentType,
    amount: number,
    channel: string,
}

export interface PlanFeature {
    description: string;
    notes?: string;
}

export interface Plan {
    name: string;
    price: string;
    color: { hex: string };
    planFeatures: PlanFeature[];
}
