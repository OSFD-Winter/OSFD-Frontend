// @ts-nocheck


function Footer() {
    return (
        <div>
            <div style={{ backgroundImage: "linear-gradient(to right, #01010A, #010529, #171e74, #2673FF)", position: "relative", minHeight: 170, color: "white" }}>
                <div style={{ display: "flex", justifyContent:"center", paddingTop: 70, paddingLeft: 100 }}>
                    <div style={{alignSelf: "center"}}> <img src="./osfd-small-logo.png" alt="osfd"></img> </div>
                    <div  style={{position: "absolute", left: 200, bottom: 40, fontSize: 17}}>  
                    <a href={"/terms"} style={{}}>  Terms of Service </a> | Sales Agreements | Privacy Policy
                    </div>
                    <div style={{position: "absolute", right: 100, bottom: 40, fontSize: 22,}}>© 2022 OSFD All rights reserved</div>
                </div>
            </div>
        </div>
    )
}

export default Footer