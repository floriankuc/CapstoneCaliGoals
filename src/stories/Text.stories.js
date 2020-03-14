import React from 'react'
import FormHeadline from './../common/FormHeadline'
import GlobalStyles from './../common/styles/GlobalStyles'
import Header from '../components/pages/home/Header'

export default {
  title: 'Text',
  component: Header,
  FormHeadline,
}

export const HeadlineOfForm = () => (
  <>
    <GlobalStyles />
    <FormHeadline number={'01'}>Form headline</FormHeadline>
  </>
)

export const HomepageHeader = () => (
  <>
    <GlobalStyles />
    <Header />
  </>
)
