'use client';
import React from 'react';

// Define the type for the component props
interface MiscellaneousProps {
  params: {
    param: string; // Assuming 'param' is a string (adjust if needed)
  };
}

const Miscellaneous: React.FC<MiscellaneousProps> = ({ params }) => {
  return <div>miscellaneous {JSON.stringify(params)}</div>;
};

export default Miscellaneous;
