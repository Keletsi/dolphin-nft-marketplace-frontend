import { Button, Typography, Link } from '@material-ui/core';
import FantasyLeague from 'app/assets/VerticalPromotionFantasyLeague.png';
import { HallOfFame } from '../HallOfFame/HallOfFame';
import { Promotion } from '../Promotion/Promotion';
import useTranslation from 'app/hooks/useTranslation';
import { useParams } from 'react-router-dom';
import { useMain } from './useMain';
import styles from './Main.module.scss';
import { BackgroundImageLayout } from 'infrastructure/components/BackgroundImageLayout/BackgroundImageLayout';

export const Main = () => {
  const { verticalId } = useParams<{ verticalId?: string }>();
  const { nfts } = useMain();
  const t = useTranslation();

  return (
    <>
      <BackgroundImageLayout>
        <div className={styles.mainContent__title}>
          <Typography component="div" variant="h5" className={styles.mainContent__titleFeatured}>
            {t('verticals.preTitle')}
          </Typography>
          <Typography component="div" variant="h2" className={styles.mainContent__titleIssuer}>
            {t('verticals.title')}
          </Typography>
          <div>
            <Link href="#hallOfFame" underline="none">
              <Button className={styles.mainContent__titleButton}> {t('verticals.actionButton')}</Button>
            </Link>
          </div>
        </div>
      </BackgroundImageLayout>

      <HallOfFame />

      <div className={styles.mainContent__fantasyLeague}>
        <Promotion
          imgSrc={FantasyLeague}
          subtitle={t('verticals.fantasyLeague.title')}
          primaryText={t('verticals.fantasyLeague.primaryText')}
          secondaryText={t('verticals.fantasyLeague.secondaryText')}
          buttonText={t('verticals.fantasyLeague.actionButton')}
          link={`${verticalId}/${nfts[nfts.length - 1]?.id}`}
        />
      </div>
    </>
  );
};
