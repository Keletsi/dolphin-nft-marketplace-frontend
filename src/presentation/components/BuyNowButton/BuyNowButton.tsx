import { Button, Typography } from '@material-ui/core';
import { useBuyNowButton } from './useBuyNowButton';
import { DepositModal } from '../DepositModal/DepositModal';
import { creditCardStatus } from 'app/constants/contants';
import { CustomLoader } from 'infrastructure/components/CustomLoader/CustomLoader';
import { colors } from 'app/constants/contants';
import { BaseModal } from 'infrastructure/components/Modal/Modal';
import { SuccessVerification } from '../CC/Verification/SuccessVerification';
import { useResponsive } from 'app/hooks/useResponsive';
import useTranslation from 'app/hooks/useTranslation';
import styles from './BuyNowButton.module.scss';

export const BuyNowButton = () => {
  const t = useTranslation();
  const {
    buyNft,
    depositSize,
    defaultCreditCard,
    handleOnClick,
    enoughBalance,
    fee,
    isOpen,
    isLoadingData,
    depositModalIsOpen,
    handleClose,
    handleCloseDepositModal,
  } = useBuyNowButton();
  const { isMobileView } = useResponsive();

  return (
    <>
      {!isLoadingData ? (
        <>
          {enoughBalance ? (
            <div className={styles.buyNowButton}>
              <Button onClick={buyNft} variant="outlined">
                <Typography variant="h6" component="p">
                  {t('creatures.buyCreatures.buyButton')}
                </Typography>
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
      <BaseModal open={isOpen} handleClose={handleClose}>
        <div style={{ textAlign: 'center' }}>
          <SuccessVerification successMsg={t('creatures.buyCreatures.successMsg')} />
        </div>
      </BaseModal>
    </>
  );
};
