import { Router } from 'express'
import { z } from 'zod'
import { createBookingEnquiry } from './bookings.service.js'

export const bookingsRouter = Router()
const enquirySchema = z.object({
  customerName: z.string().min(2).max(120),
  email: z.string().email(),
  eventType: z.string().min(2).max(80),
  eventDate: z.string().date(),
  guestCount: z.string().min(1),
  location: z.string().min(2).max(180),
  budget: z.string().min(1),
  details: z.string().max(3000).optional()
})
bookingsRouter.post('/enquiries', async (req, res, next) => {
  try {
    const input = enquirySchema.parse(req.body)
    const result = await createBookingEnquiry(input)
    res.status(201).json({ data: result })
  } catch (error) { next(error) }
})
