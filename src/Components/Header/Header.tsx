import {useNavigate } from 'react-router-dom'
import favicon from '../../assets/Fotos/favicon.png'
import logo from '../../assets/Fotos/petshop.png'
import styles from './Header.module.css'
import type React from 'react'

const Header: React.FC = () => {
    const navigate = useNavigate()
  return (
    
    <header className={styles.header}>
        <div className={styles.headerInner}>
            <div>
                <img className={styles.favicon} src={favicon} alt="favicon" onClick={() => navigate('/')}/>
                <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')}/>
            </div>
            <div>
                <h1 className={styles.title}>Find everything that you need for your pet</h1>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => navigate('/animals')}>animals</button>
                <button className={styles.button} onClick={() => navigate('/categories')} >categories</button>
                <button className={styles.button} onClick={() => navigate('/wishlist')} >wishlist</button>
                <button className={styles.button} onClick={() => navigate('/cart')} >cart</button>
            </div>
        </div>
    </header>    
  )
}
export default Header
