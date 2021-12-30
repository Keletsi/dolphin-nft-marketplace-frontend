import { Button, Typography } from '@material-ui/core';
import { ConnectWalletButton } from '@gokiprotocol/walletkit';
import { MintCandyMachine } from '../MintCandyMachine/MintCandyMachine';
import { candyMachineConfig } from 'app/constants/creatures/candyMachineConfig';
import { useWalletKit } from './useWalletKit';
import useTranslation from 'app/hooks/useTranslation';
import styles from './WalletKit.module.scss';

export const WalletKit = () => {
  const t = useTranslation();
  const { connection, treasury, config, candyMachineId, startDateSeed, txTimeout } = candyMachineConfig;
  const { wallet, isValidAddress, disconnect } = useWalletKit();

  return (
    <>
      {wallet ? (
        <>
          <MintCandyMachine
            candyMachineId={candyMachineId}
            config={config}
            connection={connection}
            startDate={startDateSeed}
            treasury={treasury}
            txTimeout={txTimeout}
            wallet={wallet}
            isValidAddress={isValidAddress}
          />
          <Typography
            className={styles.walletKit__disconnect}
            variant="h6"
            onClick={disconnect}
            component="div"
          >
            {t('creatures.whitelist.disconnect')}
          </Typography>
        </>
      ) : (
        <div>
          <Typography gutterBottom variant="h6">
            {t('creatures.whitelist.welcome')}
          </Typography>
          <Typography gutterBottom variant="h6">
            {t('creatures.whitelist.wallet')}
          </Typography>
          <ConnectWalletButton style={WalletButtonStyle} />
        </div>
      )}
    </>
  );
};

const WalletButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  justifyContent: 'center',
  padding: '1.5rem',
  width: '100%',
};
