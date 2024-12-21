import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './mailing.css'

const MailingOrder = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_07gxkvm', 'template_qq2gqwf', form.current, {
        publicKey: 'ihrMv_2LLSM4_rNIE',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Successfully sent!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form className='mailing-form' ref={form} onSubmit={sendEmail}>
      <label className="mailing-form__label">Name</label>
      <input className="mailing-form__input" type="text" name="from_name" required />
      <label className="mailing-form__label" >Email</label>
      <input className="mailing-form__input"  type="email" name="from_email"  required/>
      <label className="mailing-form__label" >Message</label>
      <textarea className="mailing-form__textarea"  name="message"  required/>
      <input className="mailing-form__submit"  type="submit" value="Send"/>
    </form>
  );
};

export default MailingOrder;