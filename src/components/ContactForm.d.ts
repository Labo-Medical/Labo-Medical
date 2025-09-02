import React from 'react';
export interface ContactFormProps {
    form: {
        name: string;
        email: string;
        laboratoire: string;
        message: string;
    };
    sent: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
declare const ContactForm: React.FC<ContactFormProps>;
export default ContactForm;
