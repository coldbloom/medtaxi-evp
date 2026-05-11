import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingSectionProps extends React.PropsWithChildren {
  tag?: HeadingLevel;
  id?: string;
}

export const HeadingSection = ({ children, tag = 'h3', id }: HeadingSectionProps) => {
  const Component = tag;

  return (
    <Component id={id} className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-12 text-center">{children}</Component>
  );
};