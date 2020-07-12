import * as React from 'react';

const Results: React.FC = () => {
  const [state, setState] = React.useState({ showFailures: true });

  return (
    <div className="container pt-16 px-2 sm:pt-24 sm:px-4 mb-8 flex-shrink-0">
      Fail!
    </div>
  );
};

export default Results;