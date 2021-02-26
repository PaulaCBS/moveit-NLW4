import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()    
  }
  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return(
    <div className={ styles.challengeBoxContainer }>
      { activeChallenge ? (
        <div className={ styles.challengeActive }>
          <header>Ganhe { activeChallenge.amount } xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="desafio"/>
            <strong className={ styles.challengeActiveTitle }>
              Novo Desafio
            </strong>
            <p className={ styles.challengeActiveDescription }>
              { activeChallenge.description }
            </p>
          </main>
          <footer>
            <button type="button" 
                    className={ styles.ChallengeFailedButton }
                    onClick={ handleChallengeFailed }>
                Falhei
            </button>
            <button type="button" 
                    className={ styles.ChallengeSecceededButton }
                    onClick={ handleChallengeSucceeded }>
                Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={ styles.challengeNotActive }>
          <strong className={ styles.challengeBoxTitle }>Finalize um ciclo para receber um desafio</strong>
          <p className={ styles.challengeBoxDescription }>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando os desafios
          </p>
        </div>
      ) }  
    </div>
  )
}