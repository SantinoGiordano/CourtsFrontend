// components/email-template.tsx

import React from 'react';

type EmailTemplateProps = {
  firstName: string;
};

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Thanks for signing up.</p>
    </div>
  );
};
