import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';



function Referral(){
    return(
        <div className="referralProgram" style={{backgroundImage: "radial-gradient(circle at 44.6% 35.17%, #9f25a6 0, #9018a1 25%, #80059c 50%, #6f0097 75%, #5e0092 100%)",minHeight: 800, borderRadius: 50, width: "85%", position: "relative", left: "5%", bottom: 50, }}>
          <div className="textImage" style={{position: "relative", width:"100%", top: 60, maxHeight: 180, paddingRight: 100 }}>
          <a style={{position: "relative", left:"25%", maxHeight:"auto", maxWidth:"200px", outline:"none"}}> <img src="glasses.png" style={{minWidth: "5.255vw", maxWidth: "25.233vw"}}></img></a>
          <strong style={{position: "relative",fontSize: "3.3vw", color: "white", left: "27%", bottom: 25}}>Referral Program</strong>
          </div>

        
          <div className="text1" style={{display: "flex", justifyContent: "center", marginTop: 125, marginRight: 140}}>
            <span style={{position:"relative", bottom: "4%", marginLeft: 40, color: "white", fontSize: "1.25vw", fontWeight: "bold",}}>Enter Wallet REFERRAL LINK</span>
            <TextField sx={{width: 420, marginLeft: 7, position: "relative", backgroundColor: "white", borderRadius: 2, height: 1, fontSize: "1.2vw"}} id="outlined-basic"  size="small" variant="outlined" placeholder="yourEmail@gmail.com"  />
            <Button variant="outlined" size="large" style={{backgroundColor: "white"}} sx={{backgroundColor: "white", marginLeft: 5, width: "5.78vw", fontSize:"0.8vw", borderRadius: 2, position: "relative", bottom: 1.5}}>SEND</Button>
            
          </div>

        
          <div className="text2" style={{display: "flex", justifyContent: "center", marginTop: 25, marginRight: 300}}>
            <strong style={{position:"relative", bottom: "4%", right: 9, marginLeft: 47, color: "white", fontSize: "1.25vw", fontWeight: "bold", paddingRight: 62.5}}>Your REFERRAL LINK</strong> 
            <TextField defaultValue={"https://www.teamnouns.xyz?ref=ref=0xC"} sx={{width: 420, marginLeft: 10, position: "relative", backgroundColor: "white", borderRadius: 2, height: 1, fontSize: "10vw"}} id="outlined-basic"  size="small"  InputProps={{readOnly: true, endAdornment:(<InputAdornment position="start"><ContentCopyIcon /></InputAdornment>)}}  />
          
          </div>
  
          <div style={{display: "flex", justifyContent: "center", height: "1vw", paddingTop: 80, marginRight: "8.9vw", paddingBottom: 175}}>
              <span style={{fontSize: "1.25vw", fontWeight: "bold", color: "white", marginRight: 88}}>Current Reward total for each <br></br>member joining through link</span>
              <span style={{fontSize: "2.7vw", fontWeight: "bold", color: "white", marginLeft: 5}}>$671.24</span>
          </div>
  
          <div style={{position:"relative" ,bottom: -6, width:"100%", display:"flex", justifyContent:"space-between"}}>
            <a style={{position: "relative", left:85}}><img src="group 263.png" style={{minWidth: "5.255vw", maxWidth: "15.233vw"}}></img></a>
            <a style={{position:"relative", left: 230,}}><img src="noun-205.png" style={{minWidth: "5.255vw", maxWidth: "15.233vw"}}></img></a>
            <a style={{position:"relative", marginRight: 25, top: 2, left: 100}}><img src="noun-105.png" style={{minWidth: "5.255vw", maxWidth: "15.233vw"}}></img></a>
            <a><img src="noun-346.png" style={{minWidth: "5.255vw", maxWidth: "15.233vw", position:"relative", left: 150}}></img></a>
            <a style={{position:"relative", marginRight: 75, top: 17}}><img src="noun-227.png" style={{minWidth: "5.255vw", maxWidth: "15.233vw"}}></img></a>
            
          </div>
  
      </div>
    )
}

export default Referral



