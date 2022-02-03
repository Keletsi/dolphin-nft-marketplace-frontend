import { Button, Typography } from '@material-ui/core';
import { useBuyNowButton } from './useBuyNowButton';
import { DepositModal } from '../DepositModal/DepositModal';
import { creditCardStatus } from 'app/constants/contants';
import { CustomLoader } from 'infrastructure/components/CustomLoader/CustomLoader';
import { colors } from 'app/constants/contants';
import { useResponsive } from 'app/hooks/useResponsive';
import { nftPack } from 'app/constants/heroletes/remarkablesCarousel';
import { NotificationModal } from '../NotificationModal/NotificationModal';
import useTranslation from 'app/hooks/useTranslation';
import styles from './BuyNowButton.module.scss';

export const BuyNowButton = ({ buttonText = '', className = '', nftsToBuy, packId }: BuyNowButtonProps) => {
  const t = useTranslation();
  const {
    handleBuyNft,
    isSuccess,
    depositSize,
    defaultCreditCard,
    handleOnClick,
    enoughBalance,
    fee,
    isOpen,
    isLoadingData,
    isLoadingBuyNFT,
    depositModalIsOpen,
    handleClose,
    handleCloseDepositModal,
  } = useBuyNowButton({ packId, nftsToBuy });
  const { isMobileView } = useResponsive();

  return (
    <>
      {!isLoadingData ? (
        <>
          {enoughBalance ? (
            <div className={styles.buyNowButton}>
              <Button
                className={className}
                onClick={handleBuyNft}
                variant="outlined"
                disabled={isLoadingBuyNFT}
              >
                {isLoadingBuyNFT ? (
                  <CustomLoader color={colors.orangeCreatures} height={30} width={30} />
                ) : (
                  <Typography variant="h6" component="p">
                    {buttonText ? buttonText : t('creatures.buyCreatures.buyButton')}
                  </Typography>
                )}
              </Button>
            </div>
          ) : (
            <>
              <>
                <Typography component="div">
                  {defaultCreditCard.status === creditCardStatus.approved
                    ? t('creatures.buyCreatures.fundWallet')
                    : t('creatures.buyCreatures.activateWallet')}
                </Typography>
              </>
              <>
                <Button onClick={handleOnClick} variant="outlined">
                  {defaultCreditCard.status === creditCardStatus.approved
                    ? t('creatures.buyCreatures.fundButton')
                    : t('creatures.buyCreatures.activateButton')}
                </Button>
              </>
            </>
          )}
          {!isMobileView && (
            <div className={styles.buyNowButton__typography}>
              <Typography variant="body1"> {t('creatures.buyCreatures.creditDebitCard')}</Typography>
            </div>
          )}
        </>
      ) : (
        <CustomLoader color={colors.orangeCreatures} />
      )}

      <DepositModal
        isOpen={depositModalIsOpen}
        handleClose={handleCloseDepositModal}
        fee={fee}
        depositSize={depositSize}
      />

      <NotificationModal handleClose={handleClose} isOpen={isOpen} isVerificationSuccess={isSuccess} />
    </>
  );
};

interface BuyNowButtonProps {
  buttonText?: string;
  className?: string;
  nftsToBuy?: nftPack;
  packId: string;
}
