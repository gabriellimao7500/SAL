import styles from "./Hours.module.css"

function Hours({ windowWidth }){
    return(
        <section className={styles.hours}>
                {localStorage.getItem('periodo') != "Noite" && windowWidth < 430 ? (
                    <>
                        <div>{windowWidth < 430 ? '1' : ''}</div>
                        <div>{windowWidth < 430 ? '2' : ''}</div>
                        <div>{windowWidth < 430 ? '3' : ''}</div>
                        <div>{windowWidth < 430 ? '4'  : '' }</div>
                        <div>{windowWidth < 430 ? '5' : ''}</div>
                        <div>{windowWidth < 430 ? '6' : ''}</div>
                    </>
                ) : ('')}
                {localStorage.getItem('periodo') === "Manhã" && windowWidth > 430 ? (
                    <>
                        <div>{windowWidth > 430 ? '7:00 - 7:50' : ''}</div>
                        <div>{windowWidth > 430 ? '7:50 - 8:40' : ''}</div>
                        <div>{windowWidth > 430 ? '8:40 - 9:30' : ''}</div>
                        <div>{windowWidth > 430 ? '9:50 - 10:40'  : '' }</div>
                        <div>{windowWidth > 430 ? '10:40 - 11:30' : ''}</div>
                        <div>{windowWidth > 430 ? '11:30 - 12:20' : ''}</div>
                    </>
                ) : ('')}
                {localStorage.getItem('periodo') === "Tarde" && windowWidth > 430 ? (
                    <>
                        <div>{windowWidth > 430 ? '13:00 - 13:50' : ''}</div>
                        <div>{windowWidth > 430 ? '13:50 - 14:40' : ''}</div>
                        <div>{windowWidth > 430 ? '14:40 - 15:30' : ''}</div>
                        <div>{windowWidth > 430 ? '15:50 - 16:40': '' }</div>
                        <div>{windowWidth > 430 ? '16:40 - 17:30': ''}</div>
                        <div>{windowWidth > 430 ? '17:30 - 18:20': ''}</div>
                    </>
                ) : ('')}
                {localStorage.getItem('periodo') === "Noite" && windowWidth > 430 ? (
                    <>
                        <div>{windowWidth > 430 ? 'Bloco 1' : ''}</div>
                        <div>{windowWidth > 430 ? 'Bloco 2' : ''}</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </>
                ) : ('')}
            </section>
    )
}

export default Hours