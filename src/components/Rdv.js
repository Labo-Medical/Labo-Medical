import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const RdvForm = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: null,
        time: '',
        notes: '',
    });
    const [sent, setSent] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleDateChange = (date) => {
        setForm({ ...form, date });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailjs.send('service_k9l97n8', 'template_7xfeibq', {
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                date: form.date?.toLocaleDateString(),
                time: form.time,
                notes: form.notes,
            }, '-x18GprKZj2ZDhbKR');
            setSent(true);
            setForm({
                name: '',
                email: '',
                phone: '',
                address: '',
                date: null,
                time: '',
                notes: '',
            });
        }
        catch (error) {
            console.error('Erreur lors de l’envoi du formulaire :', error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [_jsx("h2", { style: styles.title, children: "Prise de RDV \u00E0 domicile" }), _jsxs("label", { style: styles.label, children: ["Nom complet", _jsx("input", { name: "name", value: form.name, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("label", { style: styles.label, children: ["Email", _jsx("input", { type: "email", name: "email", value: form.email, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("label", { style: styles.label, children: ["T\u00E9l\u00E9phone", _jsx("input", { name: "phone", value: form.phone, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("label", { style: styles.label, children: ["Adresse", _jsx("input", { name: "address", value: form.address, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("label", { style: styles.label, children: ["Date du pr\u00E9l\u00E8vement", _jsx(DatePicker, { selected: form.date, onChange: handleDateChange, dateFormat: "dd/MM/yyyy", placeholderText: "Choisissez une date", required: true, className: "custom-datepicker-input" })] }), _jsxs("label", { style: styles.label, children: ["Heure souhait\u00E9e", _jsx("input", { type: "time", name: "time", value: form.time, onChange: handleChange, required: true, style: styles.input })] }), _jsxs("label", { style: styles.label, children: ["Remarques", _jsx("textarea", { name: "notes", value: form.notes, onChange: handleChange, rows: 4, style: styles.textarea })] }), _jsx("button", { type: "submit", style: styles.button, children: "Envoyer la demande" }), sent && _jsx("p", { style: styles.success, children: "\u2705 Demande envoy\u00E9e avec succ\u00E8s !" })] }));
};
export default RdvForm;
const styles = {
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    title: {
        textAlign: 'center',
        fontSize: '1.8rem',
        color: '#800000',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#333',
    },
    input: {
        marginTop: '6px',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        marginTop: '6px',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        resize: 'vertical',
    },
    button: {
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#800000',
        color: '#fff',
        fontSize: '1.2rem',
        cursor: 'pointer',
    },
    success: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 600,
    },
};
