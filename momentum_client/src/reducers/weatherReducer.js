const initialState = {
  addCityToggleButton: false,
  input: '',
  zipCodeData: [],
  error: '',
}

const weatherReducer = ( state = initialState, { type, payload } ) => {
    switch ( type ) {
      case 'addCityToggle':
        return {
          ...state,
          addCityToggleButton: !state.addCityToggleButton
        };
      case 'typedCityInput':
        return {
          ...state,
          input: payload.cityInput
        };
      // case 'ticketType':
      //   return {
      //     ...state,
      //     ticketType: payload.ticketType
      //   }
      // case 'ticket':
      //   return {
      //     ...state,
      //     ticket: payload.ticket,
      //     cost: payload.cost
      //   };
      default:
        return state;
    }
}

export default weatherReducer;