import React from 'react';
import CSS from 'csstype';

type addressProps = {
    addressList: string[];
};

const divStyle: CSS.Properties = {
    // Temp styles to make component scrollable
    overflowX : 'auto',
    height:'100px',
    width:'330px',
    fontSize:"12px"
};

const addressStyle: CSS.Properties = {
    cursor: 'pointer'
};

function MintLogs({ addressList }: addressProps) {

    // Redirect to etherscan when the address is clicked
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleAddressClick = (address: string) => {
        openInNewTab(`https://etherscan.io/address/${address}`)
    };
    
    return(
        <div style={divStyle}>
            {/* Reverse the list to make the element just appended come first */} 
            {addressList?.slice(0).reverse().map((address: any) => {
                    return(
                        <div key={address}>
                            <p>
                                <span style={addressStyle} onClick={() =>handleAddressClick(address)}>
                                    {address}
                                </span>
                                <span>
                                    &nbsp;&nbsp;minted!
                                </span>     
                            </p>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default MintLogs;