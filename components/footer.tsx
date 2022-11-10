// @ts-nocheck


function Footer() {
    return (
        <div>
            <div style={{ backgroundImage: "linear-gradient(to right, #01010A, #010529, #171e74, #2673FF)", position: "relative", minHeight: 170, color: "white", }}>
                <div style={{ display: "flex", justifyContent:"center", paddingTop: 70, maxWidth:"100%" }}>
                <div  style={{position: "relative", top: 35, fontSize: 17, left:110, width: "100%", marginRight: 50}}>  
                    <a href={"/terms"} style={{}}>  Terms of Service </a> | Sales Agreements | Privacy Policy
                    </div>
                    <div style={{ width: "100%", position: "relative", bottom: 10, paddingLeft: 125, right: 10}}> <img src="./osfd-small-logo.png" alt="osfd"></img> </div>
                    
                    <div style={{position: "relative", top: 20, fontSize: 19, width:"40%", paddingBottom: 40, top: 35, right: 50}}>© 2022 OSFD All rights reserved</div>
                </div>
            </div>
        </div>
    )
}

export default Footer