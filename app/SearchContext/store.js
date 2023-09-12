import React from 'react';

const ResultsContext = React.createContext({
  results: [],
  requirement: 0,
  groupName: '',
  setResults: () => {},
  setRequirement: () => {},
  setGroupName: () => {},
});

export default ResultsContext;