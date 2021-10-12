import { query as q } from 'faunadb';
import {faunadb} from '../../../services/faunadb'
import { stripe } from '../../../services/stripe';

export async function saveSubscription (subscriptionID, customerID, createAction) {
    const userRef = await faunadb.query(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('user_by_stripe_customer_id'),
              customerID
            )
          )
        )
    );
    const subscription = await stripe.subscriptions.retrieve(subscriptionID);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }
    if(createAction){
      await faunadb.query(
          q.Create(
            q.Collection('SUBSCRIPTION'),
            { data: subscriptionData }
          )
      );
    } else{
      await faunadb.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(
              q.Match(
                q.Index('subscription_by_id'),
                subscriptionID
              )
            )
          ),
          { data: subscriptionData }
        )
      )
    }   
}