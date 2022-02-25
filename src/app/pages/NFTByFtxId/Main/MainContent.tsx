import { useResponsive } from 'app/hooks/useResponsive';
import { NFT } from '../../../interfaces/NFT/NFT';

export const MainContent = ({ nft }: MainContentProps) => {
  const { isTabletView, isSmallDeviceView } = useResponsive();

  return (
    <div>
      {nft?.videoUrl ? (
        <iframe
          height={isSmallDeviceView || isTabletView ? '300' : '540'}
          width={isSmallDeviceView || isTabletView ? '300' : '540'}
          allow="autoplay; encrypted-media;"
          src={`${nft?.videoUrl}?autoplay=true&muted=true&loop=true`}
          title={nft?.name}
        />
      ) : nft?.animationUrl ? (
        <video
          height={isSmallDeviceView || isTabletView ? '300' : '540'}
          width={isSmallDeviceView || isTabletView ? '300' : '540'}
          muted
          autoPlay
        >
          <source src={nft?.animationUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={nft?.imageUrl} alt="Herolete" />
      )}
    </div>
  );
};

interface MainContentProps {
  nft: NFT;
}
