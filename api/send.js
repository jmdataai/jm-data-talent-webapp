const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Set your receiving email here, or use an env var
const TO_EMAIL = process.env.CONTACT_EMAIL || 'you@yourdomain.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { form_type, ...fields } = req.body;

  try {
    let subject = '';
    let html = '';

    if (form_type === 'application') {
      subject = `Job Application: ${fields.job_title} at ${fields.job_company}`;
      html = `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${fields.job_title} — ${fields.job_company} (${fields.job_location})</p>
        <hr/>
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Phone:</strong> ${fields.phone}</p>
        <p><strong>Current Company:</strong> ${fields.current_company || '—'}</p>
        <p><strong>Years of Experience:</strong> ${fields.experience_years}</p>
        <p><strong>LinkedIn:</strong> ${fields.linkedin ? `<a href="${fields.linkedin}">${fields.linkedin}</a>` : '—'}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${fields.cover_letter || '—'}</p>
      `;
    } else {
      const typeLabel = form_type === 'consultation'
        ? 'Free Consultation Request'
        : form_type === 'ai-demo'
        ? 'AI Demo Request'
        : 'Demo Booking';

      subject = `JM Data Talent – ${typeLabel} from ${fields.name}`;
      html = `
        <h2>${typeLabel}</h2>
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Company:</strong> ${fields.company || '—'}</p>
        <p><strong>Phone:</strong> ${fields.phone || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${fields.message}</p>
      `;
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: fields.email,
      subject,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
