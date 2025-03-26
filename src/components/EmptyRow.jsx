import styles from './EmptyRow.module.css'

export const EmptyRow = ({remainingRows}) => {   
  return <>
      {Array(remainingRows).fill().map((_, id) =><div className={styles.letter} key={id}></div>)}
    </>
  
};