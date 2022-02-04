/* eslint-disable jsx-a11y/media-has-caption */
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useTranslation from 'app/hooks/useTranslation';
import styles from './MyCollection.module.scss';
import React from 'react';

export const Item = ({ id, name, image, animation, video, offerPrice, issuer }: ItemProps) => {
  const t = useTranslation();

  const onMouseEnter = (e: React.SyntheticEvent) => {
    (e.currentTarget as HTMLVideoElement).play();
  };

  const onMouseLeave = (e: React.SyntheticEvent) => {
    (e.currentTarget as HTMLVideoElement).pause();
  };

  return (
    <ItemWrapper id={id} issuer={issuer}>
      <div className={styles.list__itemContent}>
        {offerPrice && (
          <div className={styles.list__itemContentSale}>
            {' '}
            <Typography variant="body1">{t('nft.sellNft.indicator')}</Typography>
          </div>
        )}

        {animation && (
          <video
            className={styles.list__itemContentImg}
            controls={false}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <source src={animation} type="video/mp4" />
          </video>
        )}

        {!animation && image && <img src={image} alt="Promotion" className={styles.list__itemContentImg} />}

        {!animation && !image && video && (
          <iframe
            className={styles.list__itemContentImg}
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            src={video}
            title="galleryVideo"
          />
        )}

        <div className={styles.list__itemContentHidden}>
          <Typography className={styles.list__itemContentHiddenTitle} variant="h5" component="div">
            {name}
          </Typography>
        </div>
      </div>
    </ItemWrapper>
  );
};

interface ItemProps {
  animation: string;
  id: string;
  image: string;
  issuer: string;
  name: string;
  offerPrice: number;
  video: string;
}

const ItemWrapper = ({ children, issuer, id }: ItemWrapperProps) => {
  return issuer !== 'Heroletes' ? <Link to={`secondary/${id}`}>{children}</Link> : <div>{children}</div>;
};

interface ItemWrapperProps {
  children: JSX.Element;
  id: string;
  issuer: string;
}
