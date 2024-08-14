import styles from "./Developers.module.css"

import GitHubProfilePic from "../GitHubProfilePic/GitHubProfilePic"

function Developers({name, linkLinkedin, linkInsta, linkGitHub}){
    return(
        <div className={styles.main}>
            <GitHubProfilePic githubUrl={linkGitHub} />
            <div className={styles.name}>{name}</div>
            <div className={styles.links}>
                <a href={linkLinkedin} target="_blank"><img className={styles.svg} src="/medias/Linkedin.svg" alt="" width={28}/></a>
                <a href={linkInsta} target="_blank"><img className={styles.svg} src="/medias/Insta.svg" alt="" width={28}/></a>
                <a href={linkGitHub} target="_blank"><img className={styles.svg} src="/medias/GitHub.svg" alt="" width={28}/></a>
            </div>
        </div>
    )
}

export default Developers