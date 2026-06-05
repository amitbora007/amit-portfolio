import * as z from 'zod';

// Define the contact submission validation schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'A valid email address is required.' }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(150, { message: 'Subject must not exceed 150 characters.' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000, { message: 'Message must not exceed 2000 characters.' }),
});

/**
 * Basic HTML/script sanitization helper
 */
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateContact = (req, res, next) => {
  try {
    // 1. Sanitize incoming fields first
    const sanitizedBody = {
      name: sanitizeInput(req.body.name),
      email: req.body.email ? req.body.email.trim() : '', // don't sanitize email chars, just trim
      subject: sanitizeInput(req.body.subject),
      message: sanitizeInput(req.body.message),
    };

    // 2. Perform Zod validation
    const parsedData = contactSchema.parse(sanitizedBody);
    
    // 3. Set validated data back to req.body
    req.body = parsedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return structured array of error messages
      const errorMap = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed.',
        details: errorMap,
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred during input validation.',
    });
  }
};
