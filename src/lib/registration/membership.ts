import {
  MEMBERSHIP_FEE_AMOUNT,
  MEMBERSHIP_VALIDITY_LABEL,
  MEMBERSHIP_VALIDITY_YEARS,
} from "./constants";
import type { MembershipDetails } from "./types";

export type MembershipRecordStatus = "active" | "expired";

export interface MembershipValidity {
  feeAmount: number;
  validityYears: number;
  validityLabel: string;
  startDate: string;
  expiryDate: string;
  status: MembershipRecordStatus;
}

export type StoredMembershipDetails = MembershipDetails & MembershipValidity;

export function addCalendarYears(iso: string, years: number): string {
  const start = new Date(iso);
  if (Number.isNaN(start.getTime())) {
    throw new Error("Invalid membership activation date");
  }
  const expiry = new Date(start.getTime());
  expiry.setUTCFullYear(expiry.getUTCFullYear() + years);
  return expiry.toISOString();
}

export function membershipStatusAt(expiryDate: string, now: Date = new Date()): MembershipRecordStatus {
  const expiry = new Date(expiryDate);
  if (Number.isNaN(expiry.getTime())) return "expired";
  return now.getTime() >= expiry.getTime() ? "expired" : "active";
}

export function membershipPeriodFrom(
  activationIso: string,
  years = MEMBERSHIP_VALIDITY_YEARS,
): MembershipValidity {
  const start = new Date(activationIso);
  const startDate = Number.isNaN(start.getTime()) ? new Date().toISOString() : start.toISOString();
  const expiryDate = addCalendarYears(startDate, years);
  return {
    feeAmount: MEMBERSHIP_FEE_AMOUNT,
    validityYears: years,
    validityLabel: MEMBERSHIP_VALIDITY_LABEL,
    startDate,
    expiryDate,
    status: membershipStatusAt(expiryDate, start),
  };
}

export function attachMembershipValidity(
  details: MembershipDetails,
  activationIso: string,
): StoredMembershipDetails {
  return {
    ...details,
    ...membershipPeriodFrom(activationIso),
  };
}

export function withLiveMembershipStatus<T extends Record<string, unknown>>(record: T, now: Date = new Date()): T {
  if (record.type !== "membership") return record;
  const membership = record.membership;
  if (!membership || typeof membership !== "object") return record;
  const current = membership as Record<string, unknown>;
  const expiryDate = String(current.expiryDate || "");
  if (!expiryDate) return record;
  return {
    ...record,
    membership: {
      ...current,
      status: membershipStatusAt(expiryDate, now),
    },
  };
}

export function formatMembershipDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function membershipStatusLabel(status: MembershipRecordStatus): string {
  return status === "active" ? "Active" : "Expired";
}
