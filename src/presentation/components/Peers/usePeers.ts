import { useEffect, useState } from 'react';
import { useGetNftsMutation } from 'infrastructure/services/nft/NftService';
import { NFT } from 'app/interfaces/NFT/NFT';

export const usePeers = () => {
  const [getNfts, { isError, isLoading, isSuccess }] = useGetNftsMutation();
  const [nfts, setNfts] = useState<NFT[]>([]);

  const loadData = async () => {
    const data: any = await getNfts(process.env.REACT_APP_ISSUER!);
    setNfts(data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    nfts,
    isLoading,
    isError,
    isSuccess,
  };
};
