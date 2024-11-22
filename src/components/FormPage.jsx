import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './form.schema'; // Ensure you have this file with proper validation schema
import styles from './formPage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { formDefault } from './formDefault';

export const FormPage = () => {
  const [attachments, setAttachments] = useState([]);

  const {
    register,
    handleSubmit, // Use handleSubmit here
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formDefault(),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Submitted Successfully', data); // Log form data to the console
    reset(); // Reset the form to its default values
  };



  // Watch the attachment input field
  const selectedFiles = watch('attachment');

  // Handle file selection
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setAttachments((prev) => {
      const updatedAttachments = [...prev, ...newFiles];
      setValue('attachment', updatedAttachments); // Update form state
      return updatedAttachments;
    });
  };

  // Handle attachment delete
  const handleDelete = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
    setValue('attachment', updatedAttachments); // Update form state
    toast.info('Attachment removed!', {
      position: 'top-right',
      autoClose: 1000,
    });
  };

  // Handle attachment edit (update file)
  const handleEdit = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';

    input.click();

    input.onchange = (e) => {
      const updatedFile = e.target.files[0];
      if (updatedFile) {
        const updatedAttachments = [...attachments];
        updatedAttachments[index] = updatedFile;
        setAttachments(updatedAttachments);
        setValue('attachment', updatedAttachments); // Update form state
        toast.info('Attachment updated!', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    };
  };

  return (
    <div className={styles.overall}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Form in React</h2>
        {/* First Name */}
        <label htmlFor='firstName'>
          First Name <span className={styles.required}>*</span>
        </label>
        <input
          type='text'
          placeholder='Enter First Name'
          {...register('firstName')}
          autoFocus
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        {/* Last Name */}
        <label htmlFor='lastName'>
          Last Name <span className={styles.required}>*</span>
        </label>
        <input
          type='text'
          placeholder='Enter Last Name'
          {...register('lastName')}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        {/* Email */}
        <label htmlFor='email'>
          Email <span className={styles.required}>*</span>
        </label>
        <input type='email' placeholder='Enter Email' {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
        {/* Contact */}
        <label htmlFor='contact'>
          Contact <span className={styles.required}>*</span>
        </label>
        <input
          type='number'
          placeholder='Enter Mobile Number'
          {...register('contact')}
        />
        {errors.contact && <span>{errors.contact.message}</span>}
        {/* Gender */}
        <label htmlFor='gender'>
          Gender <span className={styles.required}>*</span>
        </label>
        <div>
          <label>
            <input type='radio' value='male' {...register('gender')} />
            Male
          </label>
          <label>
            <input type='radio' value='female' {...register('gender')} />
            Female
          </label>
          <label>
            <input type='radio' value='others' {...register('gender')} />
            Others
          </label>
        </div>
        {errors.gender && <span>{errors.gender.message}</span>}
        {/* Language */}
        <label htmlFor='language'>
          Language <span className={styles.required}>*</span>
        </label>
        <select {...register('language')}>
          <option value=''>Select a language</option>
          <option value='tamil'>Tamil</option>
          <option value='english'>English</option>
          <option value='hindi'>Hindi</option>
          <option value='kannada'>Kannada</option>
          <option value='telugu'>Telugu</option>
        </select>
        {errors.language && <span>{errors.language.message}</span>}
        {/* Resume */}
        <label htmlFor='attachment'>
          Upload Resume <span className={styles.required}>*</span>
        </label>
        <input
          type='file'
          multiple
          onChange={handleFileChange}
          accept='.pdf,.doc,.docx,.jpg,.png'
        />
        {selectedFiles && (
          <div className={styles.attachmentList}>
            {attachments.map((file, index) => (
              <div key={index} className={styles.attachmentRow}>
                <span>{file.name}</span>
                <button
                  type='button'
                  onClick={() => handleEdit(index)}
                  className={styles.iconBtn}
                >
                  <AiFillEdit />
                </button>
                <button
                  type='button'
                  onClick={() => handleDelete(index)}
                  className={styles.iconBtn}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.attachment && <span>{errors.attachment.message}</span>}
        {/* About */}
        <label htmlFor='about'>About</label>
        <textarea name='about' rows={9} cols={40} {...register('about')} />
        {errors.about && <span>{errors.about.message}</span>}
        {/* Submit Button */}
        <button type='submit' className={styles.submit}>
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};
