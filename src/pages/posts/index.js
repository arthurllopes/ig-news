import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'

const posts = ({posts}) => {
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <a href="#" key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['publication.type', 'publication.content'],
        pageSize: 100
    })

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
export default posts