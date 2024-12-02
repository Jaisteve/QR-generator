import "./QRcoder.css";
import { useState} from "react";

export const QRcoder = () => {

  const [img, setImg] = useState("")
  const [loading, setloading] = useState(false)
  const [qrdata, setqrdata] = useState("")
  const [qrsize, setqrsize] = useState()
  
 async function QRgenerate()
 {
      setloading(true)
      try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)} `;
        setImg(url)
      }
      catch(error){
        console.error("Error in generating QR code",error)
      }
      finally{
        setloading(false)
      }
  }

  function DownloadQR(){
    fetch(img).then((response)=> response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="QRimg.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    });
  }
  return (
    <div className="app-container">
         <h1>QR CODE GENERATOR</h1> 

         {loading && <p>Please wait....</p>}
        {img && <img src={img} className="QR-code" alt="" />}
        
        <div>   
                  
            <label htmlFor="datainput"  className="input-label">Data for QR</label>
            <input type="text" placeholder="Enter a link" value={qrdata} id="datainput"  
            onChange={(e)=> setqrdata(e.target.value)} />

            <label htmlFor="sizeinput" className="input-label">Image size (e.g.,150):</label>
            <input type="text" value={qrsize} placeholder="Enter image size" id="sizeinput" 
            onChange={(e)=> setqrsize(e.target.value)}/>

            <button className="QR-generate" disabled={loading} onClick={QRgenerate}>Generate QR code</button>
            <button className="Download" onClick={DownloadQR}>Download QR code</button>
        
        </div>
    </div>
  )
}
