export enum MessageStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    FAILED = "FAILED",
}

export enum VerificationStatus {
    SCHEDULED = "SCHEDULED",
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

export enum NotificationStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    READ = "READ",
}

// We can add new file ext when they need
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
export enum FileMimeType {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    PDF = 'application/pdf',
    WEBP = 'image/webp',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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

export enum MeansType {
    EMAIL = "EMAIL",
    WHATSAPP = "WHATSAPP",
    PHONE_CALL = "PHONE_CALL",
    LIVE_MEET = "LIVE_MEET",
}

export interface User {
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
    timestamp: string,
    status: VerificationStatus,
    means?: MeansType,
}

export interface Notification {
    id: number,
    timestamp: string,
    status: NotificationStatus,
}

export interface Designated {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    birthDate?: string,
    birthPlace?: string,
    residence?: string,
    phoneNumber?: string,
    fiscalCode?: string,
    color?: string,
    imageUrl?: string,
    updatedAt: string,
}

export interface Asset {
    id: string,
    category: CategoryType,
    designatedList: Designated[],
    description: string,
    documents: AssetDocument[],
    updatedAt: string,
}

export interface AssetDocument {
    id: string,
    mimeType: FileMimeType,
    name: string,
    assetId: Asset['id'],
    filename: string,
    url?: string,
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
