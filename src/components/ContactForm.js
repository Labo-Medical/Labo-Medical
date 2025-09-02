import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ContactForm = ({ form, sent, handleChange, handleSubmit, handleFilter }) => {
    return (_jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [_jsx("h2", { style: styles.title, children: "Contactez-nous" }), _jsxs("div", { style: styles.row, children: [_jsxs("label", { htmlFor: "name", style: styles.label, children: ["Nom", _jsx("input", { id: "name", name: "name", value: form.name, onChange: handleChange, required: true, placeholder: "Votre nom", style: styles.input })] }), _jsxs("label", { htmlFor: "email", style: styles.label, children: ["Email", _jsx("input", { type: "email", id: "email", name: "email", value: form.email, onChange: handleChange, required: true, placeholder: "Votre email", style: styles.input })] })] }), _jsxs("label", { htmlFor: "laboratoire", style: styles.label, children: ["Laboratoire", _jsxs("select", { id: "laboratoire", name: "laboratoire", value: form.laboratoire, onChange: handleFilter, required: true, style: styles.select, children: [_jsx("option", { value: "", children: "-- Choisissez un laboratoire --" }), _jsx("option", { value: "Kawacim", children: "Kawacim" }), _jsx("option", { value: "Souani", children: "Souani" }), _jsx("option", { value: "Charf", children: "Charf" })] })] }), _jsxs("label", { htmlFor: "message", style: styles.label, children: ["Message", _jsx("textarea", { id: "message", name: "message", value: form.message, onChange: handleChange, rows: 5, required: true, placeholder: "Votre message", style: styles.textarea })] }), _jsx("button", { type: "submit", style: styles.button, children: "Envoyer" }), sent && _jsx("p", { style: styles.success, children: "\u2705 Message envoy\u00E9 !" })] }));
};
export default ContactForm;
const styles = {
    form: {
        maxWidth: '1000px',
        margin: '20px auto',
        padding: '30px 40px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    title: {
        textAlign: 'center',
        color: '#6c0f0f',
        fontSize: '2rem',
        marginBottom: '15px',
    },
    row: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    label: {
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#333',
    },
    input: {
        marginTop: '6px',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    select: {
        marginTop: '6px',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        marginTop: '6px',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        resize: 'vertical',
    },
    button: {
        padding: '14px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#6c0f0f',
        color: '#fff',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
        cursor: 'not-allowed',
    },
    success: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 600,
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 600,
    },
};
