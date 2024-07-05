import PropTypes from 'prop-types';

export const GifGridItem = ({title, url, id}) => {
  return (
    <div className="card">
      <img src={url} alt={title}/>
      <p>{id} - {title}</p>
    </div>
  )
}

GifGridItem.PropTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}