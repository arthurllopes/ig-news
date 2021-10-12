import { NavLink } from '../../fragments/ActiveLink'
import SignInButton from '../../fragments/SignInButton'
import styles from './styles.module.scss'

const Header = () => {
    return (
        <header className={styles.HeaderContainer}>
            <div className={styles.HeaderContent}>
                <div>
                    <h1>IgNews</h1>
                </div>
                <nav>
                    <NavLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </NavLink>
                    <NavLink activeClassName={styles.active} href="/posts" prefetch>
                        <a>Posts</a>
                    </NavLink>
                </nav>
            </div>
            <div>
                <SignInButton />
            </div>
        </header>
    )
}

export default Header
