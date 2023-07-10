// import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './contactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactSlice';
import Notiflix from 'notiflix';

const initialValues = {
  name: '',
  number: '',
};

let userSchema = object().shape({
  name: string().min(2).required(),
  number: string()
    .min(9, 'please enter number in forms: xxx-xx-xx')
    .matches(
      /^((\(\d{3}\) ?)|(\d{3}-))?\d{2}-\d{2}$/,
      'enter number in forms: xxx-xx-xx'
    )
    .required(),
});

export default function ContactForm() {
  const contactsRedux = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, action) => {
    if (contactsRedux.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} is already saved in your contacts`);
      return;
    }

    dispatch(addContacts(name, number));
    Notiflix.Notify.success(
      `${name} has been successfully added to your contacts`
    );

    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <Form autoComplete="off">
        <label>
          <p>Name</p>
          <Field type="text" name="name" />
          <ErrorMessage component="p" className={css.nameError} name="name" />
        </label>

        <label>
          <p>Number</p>
          <Field type="tel" name="number" />
          <ErrorMessage
            component="p"
            className={css.phoneError}
            name="number"
          />
        </label>
        <br></br>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
