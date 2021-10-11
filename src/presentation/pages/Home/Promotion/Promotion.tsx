import { Grid, Typography } from '@material-ui/core';
import { Item } from './Item';
import styles from './Promotion.module.scss';
import { usePromotion } from './usePromotion';
import { NFT } from 'app/interfaces/NFT/NFT';
import useTranslation from 'app/hooks/useTranslation';

export const PromotionContent = () => {
  const { nfts, isLoading } = usePromotion();
  const t = useTranslation();

  return (
    <Grid container className={styles.promotionContent}>
      <Grid item xs={12}>
        <Typography variant="h4">Welcome to Dolphin, check what's new...</Typography>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Grid container spacing={4}>
          {nfts.map((nft: NFT) => (
            <Grid item xs={12} md={6} lg={4} key={nft.id}>
              <Item
                styles={styles}
                id={nft.id}
                name={nft.name}
                totalQuantity={nft.totalQuantity}
                image={nft.imageUrl}
                price={nft.offerPrice}
                ftxId={nft.ftx_id}
                verticalId={'verticals/sports'}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};
