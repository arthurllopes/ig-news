import { RichText } from 'prismic-dom'
import {getSession} from 'next-auth/client'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './post.module.scss'

export default function Post ({post}) {
    return (
        <>
            <Head>
                <title>{post.title} | IgNews</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div 
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps = async ({req, params}) => {
    console.log(req)
    console.log(params)

    const session = await getSession({req})
    if(!session?.activeSubscription){
        return {
            redirect: {
                destination: `/posts/preview/${params.slug}`,
                permanent: false
            }
        }
    }
    console.log(session)
    const {slug} = params
    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('publication', slug, {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }

    return {
        props: {
            post
        }
    }

}
