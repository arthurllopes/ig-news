import { signIn, useSession, signOut} from 'next-auth/client'
import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

const SignInButton = () => {
    const [session] = useSession() 
    return (
        session ? (
        <button type="button" className={styles.button}>
            <FaGithub style={{color: 'green'}}/>
            {session.user.name}
            <FiX color="#737380" className={styles.close} onClick={() => signOut('github')}/>
        </button>
        ) : (
            <button type="button" className={styles.button} onClick={() => signIn('github')}>
            <FaGithub style={{color: 'black'}}/>
            Sign in with Github                       
            </button>
        )
    )
}

export default SignInButton
