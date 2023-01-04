import React from 'react';

const ExpandedContent = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props} />
  )
}

ExpandedContent.displayName = 'ExpandedContent'

export default ExpandedContent;
