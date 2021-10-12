import { RichText } from 'prismic-dom'
import Head from 'next/head'
import { getPrismicClient } from '../../../services/prismic'
import styles from '../post.module.scss'
import Link from "next/link"
import { useSession } from 'next-auth/client'
import { useRouter } from "next/router"
import { useEffect } from 'react'



export default function PostPreview ({post}) {
    const [session] = useSession()
    const router = useRouter()
    
    useEffect(() => {
        if(session?.activeSubscription){
            router.push(`/posts/${post.slug}`);
        }
    }, [session, router, post])
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
                <div className={styles.continueReading}>
                    Quer continuar lendo?
                    <Link href="/">
                    <a>Subscribe now 🤗</a>
                    </Link>              
                </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: [{
            params: {
                slug: 'react-v17.0'
            }
        }],
        fallback: 'blocking'
        //true, false, blocking
        //true => se alguem acessar um post que nao foi estatico, carregar do lado do browser/ layout shift/ bad seo
        //false => nao foi gerado de forma estatica, vai mostrar pagina nao encontrada
        //blocking => parece com true, mas qnd acessar um post que nao veio estatico, vai carregar no server
    }
}

export const getStaticProps = async ({params}) => {
    const {slug} = params
    const prismic = getPrismicClient()
    const response = await prismic.getByUID('publication', slug, {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 60 * 24 //24hours
    }

}
