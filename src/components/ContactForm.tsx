import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ContactFormProps {
  form: {
    name: string;
    email: string;
    laboratoire: string;
    message: string;
  };
  sent: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  form,
  sent,
  handleChange,
  handleSubmit,
  handleFilter
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>{t('contact.title')}</h2>

      <div style={styles.row}>
        <label htmlFor="name" style={styles.label}>
          {t('contact.name')}
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t('contact.name_placeholder')}
            style={styles.input}
          />
        </label>

        <label htmlFor="email" style={styles.label}>
          {t('contact.email')}
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={t('contact.email_placeholder')}
            style={styles.input}
          />
        </label>
      </div>

      <label htmlFor="laboratoire" style={styles.label}>
        {t('contact.lab')}
        <select
          id="laboratoire"
          name="laboratoire"
          value={form.laboratoire}
          onChange={handleFilter}
          required
          style={styles.select}
        >
          <option value="">-- {t('contact.choose_lab')} --</option>
          <option value="Kawacim">Kawacim</option>
          <option value="Souani">Souani</option>
          <option value="Charf">Charf</option>
        </select>
      </label>

      <label htmlFor="message" style={styles.label}>
        {t('contact.message')}
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
          placeholder={t('contact.message_placeholder')}
          style={styles.textarea}
        />
      </label>

      <button type="submit" style={styles.button}>
        {t('contact.send')}
      </button>

      {sent && <p style={styles.success}>✅ {t('contact.sent')}</p>}
    </form>
  );
};

export default ContactForm;

const styles: { [key: string]: React.CSSProperties } = {
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
    flexWrap: 'wrap' as const,
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
