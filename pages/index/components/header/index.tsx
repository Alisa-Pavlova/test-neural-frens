import React, { FunctionComponent } from 'react'
import styles from './styles.module.scss'


const Header: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <img src={'/logo.png'} width="278px" height="40px" />
      <img src={'/icons/burger.svg'} width="20px" height="14px" />
    </div>
  )
}

export default Header
