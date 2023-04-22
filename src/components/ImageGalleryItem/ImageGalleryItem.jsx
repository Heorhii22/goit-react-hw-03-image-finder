import PropTypes from 'prop-types';
import css from 'components/Styles.module.css';

export default function ImageGalleryItem({ src, tags, dataSrc, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img
        src={src}
        alt={tags}
        data-src={dataSrc}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
};
