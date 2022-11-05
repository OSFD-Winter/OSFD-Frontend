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

function MintLogs({ addressList }: addressProps) {
    // Redirect to etherscan when the address is clicked
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    
    return(
        <div style={divStyle}>
            {/* Reverse the list to make the element just appended come first */} 
            {addressList?.slice(0).reverse().map((address: any) => {
                    return(
                        <div key={address}>
                            <p>
                                <span style={{cursor: 'pointer'}} onClick={() => openInNewTab(`https://etherscan.io/address/${address}`)}>
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