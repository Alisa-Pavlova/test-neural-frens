import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { api } from '../../config/api'
import { IArticle } from '../../interfaces'
import Header from './components/header'
import styles from './styles.module.scss'

const IMAGE_PATHS = ['./assets/patrick.png', './assets/banana.png', './assets/ducks.png']

const Home: NextPage = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const normalizeDate = (date: string): number => new Date(date.split('.').reverse().join(' ')).getTime()

  useEffect(() => {
    (async function() {
      try {
        setIsLoading(true)
        const { data } = await api.get<IArticle[]>(`/news.json`)
        const sortedArticles = data.sort((a, b) => normalizeDate(b.published) - normalizeDate(a.published))
        setArticles(sortedArticles)
      } catch (err) {
       alert(`failed to get articles: ${err}`)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const renderDate = (date: string): string => {
    const dateMs =  normalizeDate(date)
    const daysSincePublished = (new Date().getTime() - dateMs) / 1000 / 60 / 60 / 24
    
    if (daysSincePublished >= 7) {
      return new Date(dateMs).toUTCString().slice(5, 16)
    }
    
    return `${Math.floor(daysSincePublished)} day${daysSincePublished > 1 ? 's' : ''} ago`
  }

  return (
    <>
      <Head>
        <title>Neural frens</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.title}>News</div>
        {isLoading && <div className={styles.loader}/>}
        {!isLoading && <div className={styles.wrapper}>
          {articles.map((article, i) => <div key={article.title} className={styles.article}>
            <img src={IMAGE_PATHS[i]}/>
            <div className={styles.title}>{article.title}</div>
            <p>{article.text}</p>
            <div className={styles.date}>{renderDate(article.published)}</div>
          </div>)}
          
        </div>}
      </div>

    
    </>
  )
}

export default Home
