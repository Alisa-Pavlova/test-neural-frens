import React, { FunctionComponent, useState } from 'react'
import styles from './styles.module.scss'

const Header: FunctionComponent = () => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      {isOpened && <div className={styles.bg}>
          <div className={styles.nav}>
            <div className={styles.row}>
              <img src={'/logo.png'} width="223px" height="32px" />
              <img
                onClick={() => setIsOpened(false)}
                src={'/icons/close.svg'}
                width="40px"
                height="40px"
              />
            </div>
            <div className={styles.linkWrapper}>
              <a href='/' onClick={() => setIsOpened(false)}>
                <img src={'/icons/home.svg'} width="20px" height="19px" />
                Home
              </a>
              <div className={styles.hr} />
              <a href='/main' onClick={() => setIsOpened(false)}>
                <img src={'/icons/union.svg'} width="20px" height="17px" />
                Neural Farm
              </a>
            </div>

          </div>
        </div>}
      <div className={styles.container}>
        <img src={'/logo.png'} width="278px" height="40px" />
        <img
          onClick={() => setIsOpened(true)}
          className={styles.burger}
          src={'/icons/burger.svg'}
          width="20px"
          height="14px"
        />
      </div>
    </>
  )
}

export default Header
