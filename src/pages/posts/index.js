import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText} from 'prismic-dom'
import Link from "next/link"

const Posts = ({posts}) => {
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')],

    )

    const posts = response.results.map(post => (
        {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
          updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        }
    ))
    return{
        props: {
            posts
        }
    }
}
export default Posts