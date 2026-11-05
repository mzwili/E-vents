import { randomUUID } from 'node:crypto'

type EnquiryInput = {
  customerName: string; email: string; eventType: string; eventDate: string;
  guestCount: string; location: string; budget: string; details?: string
}

// Persistence is intentionally behind this application-service boundary.
// Implement with a Prisma repository and a transaction before production use.
export async function createBookingEnquiry(input: EnquiryInput) {
  return {
    id: randomUUID(),
    status: 'ENQUIRY_RECEIVED',
    ...input,
    createdAt: new Date().toISOString()
  }
}
