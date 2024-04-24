import styles from './Select.module.css';

function Select({ text, name, option, handleOnChange, value, hideDefaultOption }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                {!hideDefaultOption && <option>{text}</option>}
                {option.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.categoria || opt.subcategoria}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;