import React from 'react'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
const currentYear = new Date().getFullYear();

const config = {
  logo: <span>Hovah's Palapes Laut Notes</span>,
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://palapes-laut-notes.vercel.app' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
 
    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'Hovah\'s Palapes Laut Notes'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'Hi, juniors! 👋 I\'m PKK Jehovah Yii Zui Hon, NV/8708636, but you can call me Sir Hovah.'}
        />
      </>
    )
  },
  project: {
    link: 'https://github.com/hovahyii/Palapes-Laut-Notes',
  },
  docsRepositoryBase: 'https://github.com/hovahyii/Palapes-Laut-Notes',
  footer: {
    text: `${currentYear} © Hovah Yii.`,
  },
  
}

export default config
