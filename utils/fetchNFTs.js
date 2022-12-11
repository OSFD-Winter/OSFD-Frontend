import { API_BASE_URL, API_PLACE_HOLDER } from "../utils/constants";


export const fetchNFTs = async (owner, setNFTs, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${API_BASE_URL}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${API_BASE_URL}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(API_BASE_URL, owner, setNFTs, retryAttempt+1)
        }

        setNFTs(data.ownedNfts)
        return data
    }
}
