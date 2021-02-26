import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={ styles.profileContainer }>
      <img className={ styles.profileImage } src="https://snappygoat.com/b/78507442c205fcee5215e10615ad7bb56e6dfdcc" alt="avatar" />
      <div>
        <strong className = { styles.profileName }>Mr. Penguin</strong>
        <p className={ styles.profileLevel }>
          <img src="icons/level.svg" alt="level" />
          Level { level }
        </p>
      </div>
    </div>
  )
}