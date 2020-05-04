const handleErrors = (error) => {
  alert(JSON.stringify(error) + 'error');
  throw error;
};

export default handleErrors;
