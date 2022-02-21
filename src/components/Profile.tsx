import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const { level } = useContext(ChallengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/julianahvalle.png" alt="Juliana Valle" />
      <div>
        <strong>Juliana Valle</strong>
        <p>
          <img src="icons/level.svg" alt="Levelup" />
          Level {level}
        </p>
      </div>
    </div>
  );
}