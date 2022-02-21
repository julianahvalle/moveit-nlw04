import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    handleCountdown, 
    handleResetCountdown 
  } = useContext(CountdownContext);

  //separando os números  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  //transforma em string, usa padstart para deixar o resultado em dois e da um split onde tem espaço, desestruturando o array para armazenar o primeiro e o segundo caractere dos minutos
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