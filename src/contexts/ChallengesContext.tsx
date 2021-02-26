import { createContext, useState, ReactNode, useEffect } from 'react';
import cookies from 'js-cookie';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  levelUp: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( { children, ...rest }: ChallengesProviderProps) { //props.children
  const [ level, setLevel ] = useState(rest.level);
  const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted);

  const [ activeChallenge, setActiveChallenge ] = useState(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

  const experienceToNextLevel = Math.pow( (level + 1) * 4, 2 )
  
  useEffect( () => {
    Notification.requestPermission();
  }, [])

  useEffect( () => {
    Cookies.set("level", String(level ?? 1))
    Cookies.set("currentExperience", String(currentExperience ?? 0))
    Cookies.set("challengesCompleted", String(challengesCompleted ?? 0))
  }, [ level, currentExperience, challengesCompleted ])

  function levelUp() {
    setLevel(level+1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play()

    if(Notification.permission === "granted"){
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengesContext.Provider value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        levelUp,
        closeLevelUpModal
      }}>
      { children }

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}