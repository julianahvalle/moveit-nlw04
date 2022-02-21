import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  handleCountdown: () => void;
  handleResetCountdown: () => void;
}

interface CountdownProviderProps{
  children: ReactNode;
}
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps){
  const { startNewChallenges } = useContext(ChallengesContext);
  //Criando o relógio
  const [countdown, setCountdown] = useState(0.1 * 60); // armazena a mudança de tempo 
  const [isActive, setIsActive] = useState(false); //verifica se o botão está ativado ou não
  const [hasFinished, setHasFinished] = useState(false); //verificar se o countdown chegou a 0 

  const minutes = Math.floor(countdown / 60); //arredonda para baixo para não ter 
  const seconds = countdown % 60;

 function handleCountdown(){
    setIsActive(true);
  }
  //resetando o contador 
  function handleResetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setCountdown(0.1 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if(isActive && countdown > 0 ){
      countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (isActive && countdown === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenges();
    }
  }, [isActive, countdown]) //executa quando o active e o countdown mudam

  return(
    <CountdownContext.Provider value={{
      minutes, 
      seconds, 
      hasFinished,
      isActive,
      handleCountdown,
      handleResetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}