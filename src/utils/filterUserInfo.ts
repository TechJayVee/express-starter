export const filterUserFields = (user) => {
  if (!user) {
    throw new Error('Invalid input');
  }

  const filteredUser = { ...user }; // Create a copy of the user object

  // Define the fields you want to filter out
  const fieldsToFilter = [
    'password',
    'refreshToken',
    'emailVerified',
    'emailVerificationExpires',
    'passwordResetExpires',
    'emailVerificationToken',
    'passwordResetToken',
    'type',
    'status',
  ];

  // Remove the filtered fields from the user object
  fieldsToFilter.forEach((field) => delete filteredUser[field]);

  return filteredUser;
};
