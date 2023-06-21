export const filterSensitiveProperties = (results) => {
  if (!results || !results.items || !Array.isArray(results.items)) {
    throw new Error('Invalid input');
  }

  const sensitiveProperties = [
    'password',
    'refreshToken',
    'emailVerified',
    'emailVerificationExpires',
    'passwordResetExpires',
    'emailVerificationToken',
    'passwordResetToken',
    'type',
    'status',
    'emailVerified',
  ];

  const filteredResults = {
    ...results,
    items: results.map((result) => {
      const filteredUser = { ...result.user };
      sensitiveProperties.forEach((property) => {
        delete filteredUser[property];
      });
      return { ...result, jbrewUser: filteredUser };
    }),
  };

  return filteredResults;
};
