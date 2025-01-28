import PropTypes from "prop-types";

export const FirstApp = ({title='No title!', subtitle='No Subtitle'}) => {
  return (
    <>
      <h1 data-testid="test-title">{title}</h1>
      <p>{subtitle}</p>
      <p>{subtitle}</p>
    </>
  );
};

FirstApp.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

// Esto esta Deprecated
// FirstApp.defaultProps = {
//     title: 'No title!',
//     subtitle: 'Not Subtitle!'
// };
