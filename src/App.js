import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



const App = () => {

const [Data, setData] = useState([[]])

useEffect(() => {
  axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true')
  .then((data) => {
    console.log(data.data.Members.Member);
    const dataArray = data.data.Members.Member;
          setData(dataArray);
   /*  console.log(data.data.Members.Member);
      const newArr1 = data.data.Members.Member.filter(element => {
         return element.CurrentStatus["@IsActive"] === "True";
      })
      console.log(newArr1, "the filter array");
      setData(newArr1);
      console.log(Data, "the state in data"); */

/*  const newArr = data.data.Members.Member.map(element => {
     return element.DisplayAs + " " +  element.Party["#text"];
    });
    console.log(newArr);
                  }).catch(err => console.log(err, "the error")); */
})},[]);

const getData2 = () => {

}

const getData = () => {
return  Data.map((data, index) => {
         console.log(data.Party);
     //    console.log(vals["#text"]);
         return (
         <div key={index}><span>{data.DisplayAs}</span>{ <span>{}</span>}</div>
         )

})
}
return (
  <div>
      { getData()  }



  </div>
)
}


export default App;
