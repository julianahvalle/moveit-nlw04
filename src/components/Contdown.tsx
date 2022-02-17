import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
//Criando o relógio
  const [countdown, setCountdown] = useState(0.1 * 60); // armazena a mudança de tempo 
  const [isActive, setIsActive] = useState(false); //verifica se o botão está ativado ou não
  const [hasFinished, setHasFinished] = useState(false); //verificar se o countdown chegou a 0 

  const minutes = Math.floor(countdown / 60); //arredonda para baixo para não ter 
  const seconds = countdown % 60;

  //separando os números  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  //transforma em string, usa padstart para deixar o resultado em dois e da um split onde tem espaço, desestruturando o array para armazenar o primeiro e o segundo caractere dos minutos

  function handleCountdown(){
    setIsActive(true);
  }
  //resetando o contador 
  function handleResetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setCountdown(0.1 * 60);
  }

  useEffect(() => {
    if(isActive && countdown > 0 ){
      countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (isActive && countdown === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, countdown]) //executa quando o active e o countdown mudam

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
        </div>

        { hasFinished ? (
         <button 
          disabled
          className={styles.startCountdownButton}
          >
            Ciclo encerrado
          </button>
        ) : (
          <>
           {isActive ? (
            <button 
            type="button" 
            onClick={handleResetCountdown}
            className={`${styles.startCountdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar Ciclo
            </button>) : (
            <button 
              type="button" 
              onClick={handleCountdown}
              className={styles.startCountdownButton}
            >
              Iniciar Ciclo
            </button>
          )}
          
          </>
        )}

    

    </div>
  );
}