export const UPI_ID = "sbibhim.instant40718938615865236@sbipay";
export const UPI_PAYEE_NAME = "ANNT NANDAS FOUNDATION";
export const DONATION_AMOUNTS = [500, 1000, 5000, 10000] as const;

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function upiPaymentUri(amount: number, payeeName = UPI_PAYEE_NAME, upiId = UPI_ID): string {
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
}

export function googlePayUri(amount: number, payeeName = UPI_PAYEE_NAME, upiId = UPI_ID): string {
  const query = `pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  return `intent://pay?${query}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=${encodeURIComponent(upiPaymentUri(amount, payeeName, upiId))};end`;
}

export function tezUri(amount: number, payeeName = UPI_PAYEE_NAME, upiId = UPI_ID): string {
  return `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
}
