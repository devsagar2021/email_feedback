const addCredits = (credits: number) => {
  return {
      type: 'user/ADD_CREDITS',
      payload: credits
  };
}

export default addCredits;
