import "./App.css"
import { useFormik } from 'formik';
import {useState} from "react"
import moment from "moment"
import * as yup from "yup";


function App() {

  const date = new Date()
  const format = "YYYY-MM-DD HH:mm:ss"
  const dateSample = moment(date).format(format)
  const [dateDefault,setDateDefault] = useState(dateSample)
  const [timeError,setTimeError] = useState(false)

  const handleChangeTime =(e) => {
      try {
        console.log(e.target.value)
        const time = moment(e.target.value).format(format)
        if(time === "Invalid date"){
          setTimeError(true)
        }
        else{
          setDateDefault(time)
          setTimeError(false)
        }
      } catch (error) {
          console.log(error)
      }
  }

  const formilk = useFormik({
    initialValues:{
      quantity:"",
      pillar:"",
      revenue:"",
      unitPrice:"",
    },
    validationSchema: yup.object({
      quantity: yup
                .string()
                .required("Require")
                .matches(/^(?!.*-)(0|[1-9]\d*)(\.\d+)?$/,"Không đúng định dạng số (số âm,chứa chữ,...)"),
      revenue: yup
                .string()
                .required("Require")
                .matches(/^(?!.*-)(0|[1-9]\d*)(\.\d+)?$/,"Không đúng định dạng số (số âm,chứa chữ,...)"),
      pillar:   yup
                .string()
                .required("Require")
                .oneOf(["P01","P02","P03","P04"]),
      unitPrice: yup
                .string()
                .required("Require")
                .matches(/^(?!.*-)(0|[1-9]\d*)(\.\d+)?$/,"Không đúng định dạng số (số âm,chứa chữ,...)")         
    }),
    onSubmit: (values) =>{
      window.alert("Cập nhật thành công")
      console.log(values)
    }
  })


  return (
    <div className="App">
      <form className="font-medium" onSubmit={formilk.handleSubmit}>
        <header className="flex justify-between shadow-md p-4">
          <div className="flex flex-col">
            <div className="flex  items-center	">
              <svg className="mr-1 w-3 h-3  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
              </svg>
              <span className="text-xs font-medium">Đóng</span>
            </div>
            <h3 className="font-bold text-3xl	mt-2.5">Nhập giao dịch</h3>
          </div>
          <button disabled={timeError} onSubmit={formilk.handleSubmit} type="submit" className="h-8 px-2 font-semibold text-xs text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cập nhật</button>
        </header>
      
     
      <div className="p-2">
         
         <div className="relative mt-3">
            <input value={dateDefault} onChange={(e) => handleChangeTime(e)} type="datetime-local" id="datetime" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="datetime" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Thời gian</label>
            {timeError && (<p className="errorMsg">Thời gian chưa đúng định dạng,nhập lại</p>)}
        </div>
        <div className="relative mt-3">
            <input name="quantity" value={formilk.values.quantity} onChange={formilk.handleChange} onBlur={formilk.handleBlur} type="text" id="quantity" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="quantity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Số lượng</label>
            {formilk.errors.quantity &&(<p className="errorMsg">{formilk.errors.quantity}</p>)}
        </div>
        <div className="relative mt-3">
            <label htmlFor="pillar" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Trụ</label>
            <select id="pillar" name="pillar" onChange={formilk.handleChange} onBlur={formilk.handleBlur} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected disabled></option>
              <option value="P01">Trụ 01</option>
              <option value="P02">Trụ 02</option>
              <option value="P03">Trụ 03</option>
              <option value="P04">Trụ 04</option>
            </select>
            {formilk.errors.pillar &&(<p className="errorMsg">{formilk.errors.pillar}</p>)}
        </div>
        <div className="relative mt-3">
            <input name="revenue" value={formilk.values.revenue} onChange={formilk.handleChange} onBlur={formilk.handleBlur} type="text" id="revenue" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="revenue" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Doanh thu</label>
            {formilk.errors.revenue &&(<p className="errorMsg">{formilk.errors.revenue}</p>)}
        </div>
        <div className="relative mt-3">
            <input name="unitPrice" value={formilk.values.unitPrice} onChange={formilk.handleChange} onBlur={formilk.handleBlur} type="text" id="unitPrice" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="unitPrice" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Đơn giá</label>
            {formilk.errors.unitPrice &&(<p className="errorMsg">{formilk.errors.unitPrice}</p>)}
        </div>
      </div>
      </form>
    </div>
  );
}

export default App;
