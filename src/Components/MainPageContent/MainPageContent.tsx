import React from 'react';
import dogImage from "../../assets/Fotos/dog.png";
import styles from "../MainPageContent/MainPageContent.module.css"

const MainPageContent:React.FC=()=> {
  return (
    <div>
        <section className={styles.section}>
            <div className={styles.innerSection}>
                <div className={styles.texts}>
                    <h1 className={styles.title}>some good advice for taking care of your pet:</h1>
                    <p className={styles.p}><span className={styles.span}>patience and understanding:</span>understand the pets have their personalities. be patient, especially during training.</p>
                    <p className={styles.p}><span className={styles.span}>educate yourself:</span>learn about your pet’s specific breed, behaviors, and health requirements.</p>
                    <p className={styles.p}><span className={styles.span}>emercency preparendness:</span>familliraize yourself with the location of the nearest emergency veterinary clinic.</p>
                    <p className={styles.p}><span className={styles.span}>positive reinforcement:</span>leaen positive reinforcement techniques</p>
                </div>
                <div>
                    <img src={dogImage} alt="Dog" />
                </div>
            </div>
        </section>
      
    </div>
  )
}

export default MainPageContent
