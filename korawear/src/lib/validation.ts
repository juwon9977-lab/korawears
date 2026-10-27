import type { PaymentMethod } from '../types'

export interface CheckoutForm {
  email: string
  phone: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  card: string
  expiry: string
  cvc: string
}

export const EMPTY_FORM: CheckoutForm = {
  email: '', phone: '', firstName: '', lastName: '', address: '', city: '', state: '', card: '', expiry: '', cvc: '',
}

export type FormErrors = Partial<Record<keyof CheckoutForm, string>>

export function validateCheckout(f: CheckoutForm, payment: PaymentMethod, now = new Date()): FormErrors {
  const e: FormErrors = {}
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!/^(\+?234|0)[789][01]\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a Nigerian number, like 0803 000 0000.'
  if (!f.firstName.trim()) e.firstName = 'Enter your first name.'
  if (!f.lastName.trim()) e.lastName = 'Enter your last name.'
  if (f.address.trim().length < 6) e.address = 'Enter your street address.'
  if (!f.city.trim()) e.city = 'Enter your city or area.'
  if (!f.state) e.state = 'Select your state.'

  if (payment === 'card') {
    if (f.card.replace(/\s/g, '').length !== 16) e.card = 'Enter a 16-digit card number.'
    const m = /^(\d\d)\/(\d\d)$/.exec(f.expiry)
    const month = m ? Number(m[1]) : 0
    const year = m ? 2000 + Number(m[2]) : 0
    const expired = year * 12 + month < now.getFullYear() * 12 + now.getMonth() + 1
    if (!m || month < 1 || month > 12 || expired) e.expiry = 'Use a future date, MM/YY.'
    if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = 'Enter the 3 or 4 digit code.'
  }
  return e
}

export const formatCardNumber = (v: string): string =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

export const formatExpiry = (v: string): string => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}
