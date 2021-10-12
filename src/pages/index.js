/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import SubscribeButton from '../fragments/SubscribeButton'
import styles from './index.module.scss'
import {stripe} from '../services/stripe'


export default function Home({product}) {
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.welcome}>
          <span>👏 Olá! Seja bem vindo!</span>
          <h1>Notícias sobre <span>React.</span></h1>
          <p>Tenha acesso ao conteúdo completo <br />
            <span>por apenas {product.aumount} ao mês</span>
          </p>
          <SubscribeButton priceID={product.priceID} />
        </section>
        <img src="/images/avatar.svg" alt="avatar" />
      </main>
  
    </>
  )
}

export const getStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JiIS7HExxcRhpI05RaAYK4k', {
    expand: ['product']
  })
  const product = {
    priceID: price.id,
    aumount: new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24hours
  }
}
