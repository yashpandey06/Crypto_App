
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";

import axios from "axios";
const App = () => {
  const[data,setData]=useState([]);
  // const [value, setValue] = useState("");
  const [filterdata, setFilterData] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setFilterData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function handelchange(e) {
    const ev=e.target.value;
    const newdata = data.filter((item)=>{
      return item.id.startsWith(ev.toLowerCase()) 
    }) 
    // console.log(newdata)
    setFilterData(newdata);



  }

  return (
    <div className=" text-white bg-gradient-to-b from-blue-gray-900 via-black to-blue-gray-900   w-screen min-h-screen">
      <div className="flex flex-col w-full h-full   justify-center items-center ">
        <form
          className="w-72 m-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input label="Enter crypto name" onChange={handelchange} />
        </form>
        {/* {console.log(first)} */}
        <div>
          {filterdata.map((item) => (
            <div className="flex justify-between md:w-full items-center shadow-md shadow-gray-500 m-8  py-4 px-8">
              <img src={item.image} width={28} height={28}  alt="" />
              <div>{item.id}</div>
              <div>{`${item.current_price} $`}</div>
            </div>
          ))}
        </div>
        {/* <Container first={first}  /> */}
      </div>
    </div>
  );
};

export default App;
