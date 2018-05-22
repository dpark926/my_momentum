function handleClick() {
  return {
    type: 'addCityToggle',
  }
}

function handleInput(data) {
  return {
    type: 'typedCityInput',
    payload: {
      cityInput: data
    }
  }
}

export default {
  handleClick,
  handleInput,
  // handleTicketType,
  // handleTicket
};
