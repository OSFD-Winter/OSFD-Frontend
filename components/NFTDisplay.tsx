import { useEffect, useState } from "react";
import NftCard from './nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';

type displayProps = {
  owner: string;
};

function NFTDisplay({ owner }: displayProps) {
  const [NFTs, setNFTs]: any = useState("");
  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchNFTs(owner, setNFTs);
    }
    fetchData();
}, [owner])

                       
NFTs ? NFTs.map((NFT: { media: { gateway: any; }[]; id: { tokenId: any; }; title: any; contract: { address: any; }; description: any; metadata: { attributes: any; }; }) => {
                       
  return (
     <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} ></NftCard>
  )
}): <div>No NFTs found</div>
 
}

export default NFTDisplay;