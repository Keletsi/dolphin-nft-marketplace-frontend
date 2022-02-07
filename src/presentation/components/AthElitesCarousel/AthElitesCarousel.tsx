import { CarouselItem } from 'app/constants/heroletes/remarkablesCarousel';
import { packIds } from 'app/constants/contants';
import { CarouselItemDescription } from './CarouselItemDescription';
import { CarouselItemImage } from './CarouselItemImage';
import { CarouselButtons } from './CarouselButtons';
import { useCarousel } from './useCarousel';
import { BuyNowButton } from '../BuyNowButton/BuyNowButton';
import styles from './AthElitesCarousel.module.scss';

export const AthElitesCarousel = ({ carouselItems }: CarouselProps) => {
  const { index, handleOnClick, areButtonsVisible } = useCarousel(carouselItems);

  return (
    <>
      <div className={styles.carousel} id="athelites">
        <CarouselItemDescription
          collectiblesPerPack={carouselItems[index].collectiblesPerPack}
          costPerPack={carouselItems[index].costPerPack}
          date={carouselItems[index].date}
          price={carouselItems[index].price}
          text={carouselItems[index].text}
          title={carouselItems[index].title}
        />

        <CarouselItemImage tier={carouselItems[index].tier} image={carouselItems[index].image} />
      </div>

      {areButtonsVisible && (
        <CarouselButtons handleOnClick={handleOnClick} index={index} lenght={carouselItems.length} />
      )}

      {carouselItems[index].isPackForSale && (
        <div className={styles.carousel__buy}>
          <BuyNowButton
            buttonText="Buy Now"
            className={styles.carousel__buyButton}
            nftsToBuy="common"
            packId={packIds.common}
          />
        </div>
      )}
    </>
  );
};

interface CarouselProps {
  carouselItems: CarouselItem[];
}
