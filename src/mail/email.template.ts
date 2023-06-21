import 'dotenv/config';

export const emailTemplate = (
  token?: string,
  heading?: string,
  subHeading?: string,
  email?: string
) => {
  const logoUrl = `https://lh3.googleusercontent.com/ogw/AOLn63Hy8LPa6e0yKzt-DpAzJKFgjsR3y7MLyGXBLYnrWw=s32-c-mo`;
  const isEmailVerificationUrl = `${process.env.FRONTEND_URL}/forgot-password/${token}?email=${email}`;
  return `
      <div style="font-family: sans-serif; border-radius: 10px; border: 1px solid #ccc; width: 500px; margin: auto;">
        <div style="background-color: #f1f1f1; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center;">
          <img src="${logoUrl}" alt="Jobbrew Logo" style="max-width: 150px; display: block; margin: 0 auto;">
        </div>
        <div style="background-color: #fff; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; text-align: center; ">
          <h3 style="font-weight: bold;">${heading}</h3>
          <p>${subHeading}</p>
          <a href="${isEmailVerificationUrl}" style="text-decoration: none;">
            <div style="background-color:#f1f1f1; color: #007bff; padding: 10px; border-radius: 5px; display: inline-block;">
              <p style="font-size: 20px; font-weight: bold; margin: 0;">${token}</p>
            </div>
          </a>
          <p>If you did not make this request, please ignore this email.</p>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; text-align: center;">
          <p>Thank you for using This Platform!</p>
          <p style="font-size: 12px;">This is a system generated email by this platform. Please do not reply.</p>
        </div>
      </div>
    `;
};
