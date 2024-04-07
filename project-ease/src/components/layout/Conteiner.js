import styles from './Conteiner.module.css'

function Conteiner(props){
    return(
        //div está renderizando os componentes dentro de routes em App
        <div className={`${styles.conteiner} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Conteiner;