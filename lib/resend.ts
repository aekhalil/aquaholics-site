import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'noreply@aquaholicaquariumservices.com'

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL ?? 'aquaholicspb@gmail.com'
