function Refferal(){
  return(
      <div className="referralProgram" style={{backgroundImage: "radial-gradient(circle at 44.6% 35.17%, #9f25a6 0, #9018a1 25%, #80059c 50%, #6f0097 75%, #5e0092 100%)",minHeight: 800, borderRadius: 50,  width: "85%", position: "relative", left: "5%", bottom: 50, }}>
        <div className="textImage" style={{position: "relative", width:"100%", top: 50, maxHeight: 180, paddingRight: 100 }}>
        
        <a style={{position: "relative", left:"25%", maxHeight:"auto", maxWidth:"200px", outline:"none"}}> <img src="glasses.png"></img></a>
        <strong style={{position: "relative",fontSize: "3.3vw", color: "white", left: "27%", bottom: 25}}>Referral Program</strong>
        </div>

        <div className="text1" style={{display: "flex", justifyContent: "center", marginTop: 140, marginRight: 140}}>
          <strong style={{position:"relative", bottom: 5, marginLeft: 40, color: "white", fontSize: "1.35vw", fontWeight: "bold",}}>Enter Wallet REFERRAL LINK</strong>
          <input style={{width: "22.5vw", height: 30, position: "relative", marginLeft:"4vw", borderRadius: 5, paddingTop: 10, outline:"none", boxShadow:"none"}}></input>
          <button style={{position: "relative", marginLeft: "4vw", borderRadius: 11, fontSize:"1vw", fontWeight: "bold", bottom: 3 ,padding: "0.05vw 1.5vw", color: "#373C75", }}>SEND</button>
        </div>

        <div className="text2" style={{display: "flex", justifyContent: "center", marginTop: 10, marginRight: "16.5vw", }}>
        <strong style={{position:"relative", bottom: 5, left:"0vw",  color: "white", fontSize: "1.35vw", fontWeight: "bold"}}>Referral Program</strong>
          <input style={{width: "22.5vw", height: 30, position: "relative", marginLeft:"10vw", borderRadius: 5, paddingTop: 10, outline:"none", boxShadow:"none", right: "-1.2vw"}}></input>
          
        </div>

        <div style={{display: "flex", justifyContent: "center", height: "1vw"}}>
            <span>Current Reward total for each member <br></br>joining through link</span>
        </div>

        <div style={{}}>

        </div>

    </div>
  )
}

export default Refferal