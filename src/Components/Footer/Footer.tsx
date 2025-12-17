import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css"
import facebookLogo from "../../assets/Fotos/facebook.png"
import twitterLogo from "../../assets/Fotos/Twitter.png"
import instagramLogo from "../../assets/Fotos/instagram.png"
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

  return (
    
    <footer className={styles.footer}>
        <div className={styles.footerInner}>
            <div>
                <h1 className={styles.title}>Subscribe To Our Newsletter</h1>
            </div>
            <div className={styles.form}>
                <form noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;

                        if (!email) {
                        console.log("No email");
                        toast.error("Email is required.");
                        } else if (!input.checkValidity()) {
                        console.log("Invalid email");
                        toast.error("Invalid email format.");
                        } else {
                        console.log("Email submitted:", email);
                        toast.success("Thanks for subscribing!");    
                        setEmail("");                                           
                        }
                    }}
                    >
                    <input
                        name="email"
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.subscribeButton}>SUBSCRIBE</button>
                </form>

            </div>
            <div className={styles.buttons}>
                <button  className={styles.button} onClick={() => navigate('/')} >Home</button>
                <button  className={styles.button} onClick={() => navigate('/')} >Tours</button>
                <button  className={styles.button} onClick={() => navigate('/')} >Hotels</button>
                <button  className={styles.button} onClick={() => navigate('/')} >Faqs</button>
                <button  className={styles.button} onClick={() => navigate('/')} >Blog</button>
                <button  className={styles.button} onClick={() => navigate('/')} >Contact Us</button>
            </div>
            <div>
                <hr className={styles.hr} />
            </div>
            <div className={styles.socials}>
                <img className={styles.img} src={facebookLogo} onClick={() => window.open('https://www.facebook.com/', '_blank')} alt="Facebook"/>
                <img className={styles.img} src={instagramLogo} onClick={() => window.open('https://www.instagram.com/', '_blank')} alt="Instagram"/>
                <img className={styles.img} src={twitterLogo} onClick={() => window.open('https://x.com/', '_blank')} alt="Twitter"/>
                
            </div>
        </div>
    </footer>    
  )
}
export default Footer