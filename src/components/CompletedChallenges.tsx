import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={ styles.CompleteChallengesContainer }>
      <span className={ styles.CompleteChallengesTitle }>
        Desafios Completos
      </span>
      <span className={ styles.CompleteChallengesQuantity }>
        { challengesCompleted }
      </span>
    </div>
  )
}