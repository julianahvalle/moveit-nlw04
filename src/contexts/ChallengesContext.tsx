import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
interface ChallengeProps{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenges: () => void;
  activeChallenge: ChallengeProps;
  resetChallenges: () => void;
  experienceToNextLevel: number;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}
interface ChallengesProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ 
children,  
...rest //operador rest (pega o resto das propriedades e coloca dentro de uma variável)
} : ChallengesProviderProps){
  const [level, setLevel ] = useState(rest.level ?? 1);
  const [currentExperience, setCurentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
     Notification.requestPermission();
  }, [])
  //array vazio executa uma única vez
  
  //salvando dados no cookie
  useEffect(() => {
  //salvando informações 
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp(){
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenges(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio' , {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenges(){
    setActiveChallenge(null);
  }

  function completedChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
     <ChallengesContext.Provider 
     value={{
        level, 
        levelUp, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenges,
        activeChallenge,
        resetChallenges,
        completedChallenge,
        closeLevelUpModal
      }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
     </ChallengesContext.Provider>
  );
}