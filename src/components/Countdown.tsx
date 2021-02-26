import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { minutes, seconds, 
          hasFinished, isActive, 
          startCountdown, resetCountdown } = useContext(CountdownContext);
  
  const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, "0").split("");
  const [ secondLeft, secondRight ] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
       <div className={ styles.countdownContainer }>

        <div className={ styles.countdownNumbersContainer}>

          <span className={ styles.countdownNumber}>
            { minuteLeft }
          </span>
          <span className={ styles.countdownNumber}>
            { minuteRight }
          </span>

        </div>

        <span className={ styles.countdownNumbersDivider}>
          :
        </span>

        <div className={ styles.countdownNumbersContainer}>

          <span className={ styles.countdownNumber}>
            { secondLeft }
          </span>
          <span className={ styles.countdownNumber}>
            { secondRight }
          </span>

        </div>

      </div>

      { hasFinished ? (
          <button
            disabled 
            className={ styles.countdownButton }>
            Ciclo encerrado
            <img src="icons/finished.svg" alt="Ciclo Encerrado" />
          </button>
        ) : (
          <>
          {
            isActive ? (
              <button type="button" 
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}` } 
                      onClick={ resetCountdown }>
                Abandonar ciclo
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    className={ styles.countdownButtonResetIcon}
                    d="M27 14.41L25.59 13L20 18.59L14.41 13L13 14.41L18.59 20L13 25.59L14.41 27L20 21.41L25.59 27L27 25.59L21.41 20L27 14.41Z" 
                    fill="#666666"/>
                </svg>
              </button>
            ) : (
              <button type="button" 
                      className={ styles.countdownButton } 
                      onClick={ startCountdown }>
              Iniciar um ciclo
              <img src="icons/start.svg" alt="Iniciar Ciclo" />
              </button>
            )
          }
          </>
        )
      }
      
    </div>
  )
}