import * as Yup from 'yup';

export interface ConsultationFormValues {
  name: string;
  mobile: string;
  email: string;
  organization: string;
  location: string;
}

export const consultationValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[a-zA-Z ]*$/, 'Enter a valid name'),
  mobile: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter a valid 10 digit mobile number'),
  email: Yup.string()
    .trim()
    .required('Email ID is required')
    .email('Enter a valid email ID'),
  organization: Yup.string()
    .trim()
    .required('Organization name is required'),
  location: Yup.string()
    .trim()
    .required('Location is required'),
});

export const consultationInitialValues: ConsultationFormValues = {
  name: '',
  mobile: '',
  email: '',
  organization: '',
  location: '',
};

function getUTM(key: string) {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

export function buildConsultationPayload(values: ConsultationFormValues) {
  const mobile = values.mobile || '';

  return {
    name: values.name || '',
    mobile: mobile ? `+91${mobile}` : '',
    email: values.email || '',
    organization: values.organization || '',
    location: values.location || '',
    service: 'Book a Consultation',
    form_name: 'Book a Consultation',
    page_name: 'senthilsir-portfolio',
    // submission_status: 'lead',
    // submitted_at: new Date().toISOString(),
    utm_source: getUTM('utm_source'),
    // utm_medium: getUTM('utm_medium'),
    // utm_campaign: getUTM('utm_campaign'),
    // utm_term: getUTM('utm_term'),
    // utm_content: getUTM('utm_content'),
  };
}

async function getIpAddress() {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    return ipData.ip || '';
  } catch (err) {
    console.error('Unable to fetch IP address', err);
    return '';
  }
}

export async function submitConsultationToGoogleSheet(
  payload: Record<string, string>,
  retries = 3,
  delay = 1500,
): Promise<boolean> {
  const ipAddress = payload.ip_address || (await getIpAddress());
  const payloadWithIp = {
    ...payload,
    ip_address: ipAddress,
    ip: ipAddress,
  };

  const formData = new URLSearchParams();
  Object.entries(payloadWithIp).forEach(([key, value]) => {
    formData.append(key, value ?? '');
  });

  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwZmJd1XHCeLT3gEwIojdsUIiDY71OTkXM7C3UnQSEFzo37txZULGe8-T2wXXGWAxvIFg/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      },
    );

    const text = await res.text();
    console.log('Google Sheet Response:', text);

    if (!res.ok) {
      throw new Error('Sheet responded with non-OK');
    }

    return true;
  } catch (err) {
    console.error(`Google Sheet attempt failed. Retries left: ${retries}`, err);

    if (retries <= 1) {
      throw err;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    return submitConsultationToGoogleSheet(payload, retries - 1, delay);
  }
}
