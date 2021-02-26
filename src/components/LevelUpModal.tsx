import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)
  return (
    <div className={ styles.overlay }>
      <div className={ styles.container }>
        <header className={ styles.level }>
          { level }
        </header>
        <strong className={ styles.congratulation }>Parabéns</strong>
        <p className={ styles.description }>Você alcançou um novo level.</p>
        <button type="button" onClick={ closeLevelUpModal } className={ styles.closeModal }>
          <img src="/icons/close.svg" alt="fechar modal" />
        </button>
      </div>
    </div>
  )
}