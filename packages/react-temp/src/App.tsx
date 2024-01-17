import React from 'react'
import styles from "./index.module.less";
import './index.less'

export default function App() {
  return (
    <>
      <h2 className={styles.title1}>react-temp App Module Css </h2>
      <h2 className='title'>react-temp App Module Css </h2>
      <h2 className='bg-red-50'>react-temp App Module Css </h2>
      {process.env.GLOB_ENV_MODE}
    </>
  )
}
