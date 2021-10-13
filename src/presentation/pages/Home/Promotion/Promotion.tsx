import { Grid } from '@material-ui/core';
import { Item } from './Item';
import { usePromotion } from './usePromotion';
import { NFT } from 'app/interfaces/NFT/NFT';
import { Arrow } from 'infrastructure/components/Arrow/Arrow';
import { useState } from 'react';
import { PromotionText } from './PromotionText';
import useTranslation from 'app/hooks/useTranslation';
import styles from './Promotion.module.scss';

export const PromotionContent = () => {
  const t = useTranslation();
  const { carouselContent, handleOnClick } = usePromotion();

  return (
    <Grid container className={styles.promotionContent} alignItems="center">
      <Grid item lg={1}></Grid>
      <Grid item lg={2} className={styles.promotionContent__item}>
        <PromotionText
          textContent="Welcome to Dolphin Marketplace, check what’s new"
          textButton="Know How ↓"
          styles={styles}
        />
      </Grid>

      <Grid item lg={9}>
        <Grid container spacing={1} className={styles.promotionContent__carousel}>
          <Grid item lg={3}></Grid>
          {carouselContent && (
            <>
              <Arrow handleOnClick={() => handleOnClick('left')} direction="left" />
              {carouselContent.map((item: NFT) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Item
                    styles={styles}
                    id={item.id}
                    name={item.name}
                    totalQuantity={item.totalQuantity}
                    image={item.imageUrl}
                    price={item.offerPrice}
                    ftxId={item.ftx_id}
                    verticalId={'verticals/sports'}
                  />
                </Grid>
              ))}

              <Arrow handleOnClick={() => handleOnClick('right')} direction="right" />
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

/* 

*/
