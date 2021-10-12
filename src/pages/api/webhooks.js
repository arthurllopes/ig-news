/* eslint-disable import/no-anonymous-default-export */

import {buffer} from 'micro'
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

export const config = {
  api: {
    bodyParser: false
  }
}
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

export default  async (req, res) => {
  if(req.method === 'POST'){
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('evento funcionou')
    } catch(err) {
      console.log('deu 400')
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if(relevantEvents.has(type)){
      try{
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
              console.log('evento atualizado')
              const subscription = event.data.object;
              await saveSubscription(subscription.id, subscription.customer.toString(), false)
            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data.object
            console.log('evento recebido')
            await saveSubscription(checkoutSession.subscription.toString(), checkoutSession.customer.toString(), true)
            break;
          default:
            throw new Error(`Unhandled event type ${type}`);
        }
      } catch (err) {
        return res.json({error: 'Webhook handler failed'})
      }
    }

    res.json({ true: 'ok' });

  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).send('Method not allowed');
  }
}