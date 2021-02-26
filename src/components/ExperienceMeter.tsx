import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceMeter.module.css';

export function ExperienceMeter() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
  
  return (
    <header className={ styles.experienceMeter }>
      <span className={ styles.experienceLimits }>0 xp</span>
      <div className={ styles.experienceWrapper }>
        <div style={ { width: `${percentToNextLevel}%`} } className={ styles.experienceBar }>
          <p className={ styles.experienceBarIndicator }></p>
        </div>
        <span style={ { left: `${percentToNextLevel}%`} }className={ styles.currentXp }>
          { currentExperience } xp
        </span>
      </div>
      <span  className={ styles.experienceLimits }>
        { experienceToNextLevel } xp
      </span>
    </header>
  );
}