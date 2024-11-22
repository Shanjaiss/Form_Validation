import { z } from 'zod';

export const validateUrl = (url) => {
  const urlPattern = new RegExp(
    '^' +
      '(?:(?:http|https|ftp)://|www\\.)?' +
      '(?:(?!' +
      '(?:localhost|' +
      '\\d{1,3}(?:\\.\\d{1,3}){3}' +
      ')(?::\\d{2,5})?' +
      ')' +
      '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' +
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' +
      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
      ')' +
      '(?:(/|\\?|#)[^\\s,]*)?' +
      '$',
    'i'
  );
  return urlPattern.test(url);
};

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  contact: z.string().min(10, { message: 'Must be at least 10 digits' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  language: z.string().min(1, { message: 'Language is required' }),
  resume: z.instanceof(File, { message: 'Resume is required' }),
  about: z.string().optional(),
  url: z
    .string()
    .min(1, { message: 'URL is required' }) 
    .refine(validateUrl, { message: 'Enter a valid URL' }),
});
