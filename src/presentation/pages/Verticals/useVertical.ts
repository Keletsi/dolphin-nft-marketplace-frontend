import { useEffect, useState } from 'react';
import { useGetNftsPrimaryMutation } from 'infrastructure/services/nft/NftService';
import { NFT } from 'app/interfaces/NFT/NFT';

export const useVertical = () => {
  const [getNftsPrimary, { isError, isLoading, isSuccess }] = useGetNftsPrimaryMutation();
  const [nfts, setNfts] = useState<NFT[]>([]);

  const loadData = async () => {
    const data: any = await getNftsPrimary();
    setNfts(data.data);
  };

  useEffect(() => {
    loadData();

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return {
    nfts,
    isLoading,
    isError,
    isSuccess,
  };
};
