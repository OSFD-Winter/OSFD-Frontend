// @ts-nocheck


function Footer() {
    return (
        <div style={
            {width: "100%"}
        }>
            <div style={{ backgroundImage: "linear-gradient(to right, #01010A, #010529, #171e74, #2673FF)", position: "relative", minHeight: 180, color: "white", }}>
                <div style={{ display: "flex", justifyContent:"center", paddingTop: 70, maxWidth:"100%" }}>
                <div  style={{position: "relative", top: 35, fontSize: ("calc(12px + 0.5vw)"), left:"4vw", width: "100%", marginRight: "3vw"}}>  
                    <a href={"/terms"} style={{}}>  Terms of Service </a> | Sales Agreements | Privacy Policy
                    </div>
                    <div style={{ width: "100%", position: "relative", bottom: "-0.2vw", paddingLeft: "5vw", right: "0.5vw"}}> <img src="./osfd-small-logo.png" alt="osfd" style={{width:"calc(85px + 3vw)"}}></img> </div>
                    
                    <div style={{position: "relative", top: 20, fontSize: ("calc(9px + 0.5vw)"), width:"40%", paddingBottom: "3vw", top: 35, right: "2vw"}}>© 2022 OSFD All rights reserved</div>
                </div>
            </div>
        </div>
    )
}

export default Footer