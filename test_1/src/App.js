import { useState } from "react";
import * as XLSX from "xlsx";
import ClipLoader from "react-spinners/ClipLoader";
import Example from "./time";
import image from "./Assets/Images/image.jpg"

const initalHour = {
  hour:null,
  minute:null,
  second:null,
}


function App() {
  const [excelFile, setexecelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameReport,setNameReport] = useState(null) 
  const [timeStart,setTimeStart] = useState(initalHour)
  const [timeEnd,setTimeEnd] = useState(initalHour)
  const [result,setResult]   = useState(null)

  const handleFile = (e) => {
    const fileExtentsion = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile)
      setNameReport(selectedFile.name)
      if (fileExtentsion.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          console.log(e.target.result);
          setexecelFile(e.target.result);
        };
        setTypeError("")
      } else {
        setTypeError("formatError");
        setexecelFile(null);
        setResult(null)
        setTimeEnd(initalHour)
        setTimeStart(initalHour)
        e.target.value = "";
        console.log("Type error");
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      setLoading(true);
      const startTime = performance.now();
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setExcelData(data.slice(4));
      // console.log(data.slice(4))
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      setResult(null)
      setTimeEnd(initalHour)
      setTimeStart(initalHour)
      setTimeout(
        () => setLoading(false),
        executionTime > 1000 ? executionTime : 1500
      );
    } else {
      console.log("Please up your file here");
    }
  };


  const conver2Second = (timeObject)=>{
    const {hour,minute,second} = timeObject
    return (hour * 3600) + (minute * 60) + second;
  }
  
  const convertTimeStringToObject = (timeStr) => {
    const [hour, minute, second] = timeStr.split(':').map(Number); // Split and convert to numbers

    return {
        hour: hour,
        minute: minute,
        second: second,
    };
  };

  const handleCal = (e) =>{
    e.preventDefault();
    if(!timeEnd.hour && !timeStart.hour){
      return;
    }
    const startT = conver2Second(timeStart)
    const endT   = conver2Second(timeEnd)
    console.log("time start " + startT)
    console.log("time end "  + endT)
    if(startT > endT){    
      setResult(null)
      setTypeError("dateError")
      return 
    }
    setTypeError("")

    const total = excelData?.reduce((accumulator,curValue,index) => {
      if(index > 0){
        if(curValue?.__EMPTY_1){
          const timeCellObjet = convertTimeStringToObject(curValue?.__EMPTY_1)
          const timeCell      = conver2Second(timeCellObjet)
          if(timeCell >= startT && timeCell <= endT){
            return accumulator + curValue.__EMPTY_7
          }
          else{
            return accumulator
          }
        }
        else{
          return accumulator
        }
      }
      else{
        return accumulator
      }
    },0)
    if(total === isNaN){
      setResult(null)
    }
    console.log(total)
    setResult(total)
  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="flex flex-col items-center	justify-items-center mt-10">  
        <div className="flex-col items-center justify-center w-30">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file của bạn</label>
          <input placeholder="Upload" required onChange={handleFile} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
        </div>
        <button type="submit" className="w-24 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Gửi</button>
        {typeError == "formatError" ?
        (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Format error!</span> File của bạn chưa đúng format.
          </div>
        ):
        (
          <> </>
        )}
        {(!excelFile&&!loading) ? 
          <>
            <h2 className="text-center text-4xl font-extrabold dark:text-white">Ôi không chúng ta chưa có dữ liệu của bạn !!!</h2> 
            <figure className="max-w-lg h-60">
              <img className="h-96 max-w-full rounded-lg" src={image} alt="image description" />
            </figure>
          </>
        :
        <></> 
        }
        {
          loading ?<h2 className="text-center text-4xl font-extrabold dark:text-white">Đợi trông giây lát</h2>:<></>
        }
      </form>

      {loading ? (
        <div className="flex flex-col mt-10 items-center	justify-items-center">
            <ClipLoader color={{ color: "000" }} loading={loading} size={150} />
            <h2>File đang tải lên</h2>
        </div>
      ) : 
      (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {excelData&&excelFile ? (
            <table className="w-full text-sm text-center rtl:text-center ">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {nameReport}
                <form onSubmit={handleCal} className="flex items-center">
                  <div className="mr-10 flex flex-col">
                    <label htmlFor="time-start">
                     <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                      <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                      </svg>
                      Time start
                    </span>
                    </label>
                    <Example value={timeStart} setValue ={setTimeStart} id={"time-start"}/>
                  </div>
                  <div className="mr-10 flex flex-col">
                    <label htmlFor="time-end">
                     <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                      <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                      </svg>
                      Time end
                    </span>
                    </label>
                    <Example value={timeEnd} setValue ={setTimeEnd} id={"time-end"}/>
                  </div>
                  <button type="submit" className="h-10 w-12 mt-3 py-1 px-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Tính</button>
                </form>
                  {result !== null ? 
                    <>Tổng thành tiền: <b>{result}</b></> 
                    : 
                    <></>
                  }
                  {typeError === "dateError" ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">Time error!</span> Time end must after time start.
                    </div>
                  ):(
                    <></>
                  )}
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {Object.values(excelData[0]).map((key) => {
                    return <th key={key} scope="col" className="px-6 py-3">{key}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row,index) => {
                  if(index >=1){
                    return (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                        {Object.values(row).map((value, key) => {
                          return <td key={key}>{value}</td>;
                        })}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          ) : 
            <></>
          }
        </div>
      )}
    </div>
  );
}

export default App;


