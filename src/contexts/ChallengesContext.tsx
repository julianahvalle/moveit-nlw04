import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

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
}

interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children } : ChallengesProviderProps){
  const [level, setLevel ] = useState(1);
  const [currentExperience, setCurentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp(){
    setLevel(level + 1);
  }

  function startNewChallenges(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
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
        completedChallenge
      }}>
      {children}
     </ChallengesContext.Provider>
  );
}