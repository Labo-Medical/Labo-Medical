import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: Date | null;
  time: string;
  notes: string;
}

const RdvForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: null,
    time: '',
    notes: '',
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setForm({ ...form, date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_k9l97n8',
        'template_7xfeibq',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          date: form.date?.toLocaleDateString(),
          time: form.time,
          notes: form.notes,
        },
        '-x18GprKZj2ZDhbKR'
      );

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
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Prise de RDV à domicile</h2>

      <label style={styles.label}>
        Nom complet
        <input name="name" value={form.name} onChange={handleChange} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Téléphone
        <input name="phone" value={form.phone} onChange={handleChange} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Adresse
        <input name="address" value={form.address} onChange={handleChange} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Date du prélèvement
        <DatePicker
          selected={form.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Choisissez une date"
          required
          className="custom-datepicker-input"
        />
      </label>

      <label style={styles.label}>
        Heure souhaitée
        <input type="time" name="time" value={form.time} onChange={handleChange} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Remarques
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} style={styles.textarea} />
      </label>

      <button type="submit" style={styles.button}>Envoyer la demande</button>

      {sent && <p style={styles.success}>✅ Demande envoyée avec succès !</p>}
    </form>
  );
};

export default RdvForm;

const styles: { [key: string]: React.CSSProperties } = {
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
