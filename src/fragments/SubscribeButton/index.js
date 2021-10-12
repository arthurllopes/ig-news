import React from 'react'
import styles from './styles.module.scss'
import {useSession, signIn} from 'next-auth/client'
import { getStripeJS } from '../../services/stripe-browser'
import {api} from '../../services/api'

const SubscribeButton = ({priceID}) => {
    const [session] = useSession()

    async function handleSubscribe(){
        if(!session){
            signIn('github')
        }
        try{
            const response = await api.post('/subscribe')
            const {sessionId} = response.data

            const stripeJS = await getStripeJS()
            await stripeJS.redirectToCheckout({sessionId: sessionId})
        } catch(err){
            alert(err.message)
        }
    }
    return (
        <button type="button" className={styles.button} onClick={handleSubscribe} >
            Assine aqui
        </button>
    )
}

export default SubscribeButton
