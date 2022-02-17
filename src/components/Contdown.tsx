import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
  const [countdown, setCountdown] = useState(25 * 60); // armazena a mudança de tempo 
  const [active, setActive] = useState(false); //verifica se o botão está ativado ou não
  const minutes = Math.floor(countdown / 60); //arredonda para baixo para não ter 
  const seconds = countdown % 60;

  //separando os números  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  //transforma em string, usa padstart para deixar o resultado em dois e da um split onde tem espaço, desestruturando o array para armazenar o primeiro e o segundo caractere dos minutos

  function handleCountdown(){
    setActive(true);
  }

  useEffect(() => {
    if(active && countdown > 0 ){
      setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
  }, [active, countdown]) //executa quando o active e o countdown mudam


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
        
        <button 
        type="button" 
        onClick={handleCountdown}
        className={styles.startCountdownButton}
        >
            Iniciar um ciclo
          </button>
    </div>
  );
}