import React from 'react'
import styles from './styles.module.scss'
import {useSession, signIn} from 'next-auth/client'
import { getStripeJS } from '../../services/stripe-browser'
import {api} from '../../services/api'
import { useRouter } from 'next/router'

const SubscribeButton = ({priceID}) => {
    const [session] = useSession()
    const router = useRouter()

    async function handleSubscribe(){
        if(!session){
            signIn('github')
        }
        if(session.activeSubscription){
            router.push('/posts')
            return
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
