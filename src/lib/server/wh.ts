import { Webhook } from 'svix'
import type { WebhookEvent } from '@clerk/astro/server'
import type { Context } from 'hono'
const { SIGNING_SECRET } = import.meta.env

export const webhookEndpoint = async(c: Context) => {

  const request = c.req

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = c.req.header
  const svix_id = headerPayload('svix-id')
  const svix_timestamp = headerPayload('svix-timestamp')
  const svix_signature = headerPayload('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return c.json({error: 'Missing Svix headers'},400)
  }

  // Get body
  const payload = await request.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return c.json({error: err || 'Verification error!'}, 400)
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return c.json({details: 'Webhook received'}, 200)
}