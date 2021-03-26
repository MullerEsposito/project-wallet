import PropTypes from 'prop-types';

const expenseType = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default expenseType;
