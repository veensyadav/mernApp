const config: any = {
    local: {
      apiUrl: 'http://localhost:8080/',
    },
  
    development: {
      apiUrl: 'http://localhost:8080/',
    },
  
    testing: {
      apiUrl: 'http://localhost:8080/',
    },
  
    staging: {
      apiUrl: '',
    },
  
    prod: {
      apiUrl: '',
    },
  };
  
  export default config[process.env.REACT_APP_ENV || 'local'];
  