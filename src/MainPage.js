import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import DatatablePage from './Table';
import Navbar from './Navbar';


const MainPage = () => {
      const [ data, setdata ] = useState([])
      const [ dataFiltered, setdataFiltered ] = useState([])
      const [ isCurrentPostOnly, setisCurrentlyPostOnly ] = useState(false)
      const [ loadingDataTitle, setloadingDataTitle ] = useState(true)
 
        useEffect(() => {
        axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true/BasicDetails|Constituencies|Staff|Committees')
        .then((data) => {
       const newArr = data.data.Members.Member.map(element => {
        
           return [element.BasicDetails.GivenForename ,element.BasicDetails.GivenSurname, 
                   element.Party["#text"],element["@Member_Id"], element.Constituencies];
          });
          setdata(newArr)
          setloadingDataTitle(false)
                    }).catch(err => console.log(err, "error fetching data"));


        axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true|holdsgovernmentpost=true/BasicDetails|Constituencies|Staff|Committees')
          .then((data) => {
           const newArr1 = data.data.Members.Member.map((element) => {
                    return [element.BasicDetails.GivenForename, element.BasicDetails.GivenSurname, 
                            element.Party["#text"], element["@Member_Id"], element.Constituencies];
                            })
                            setdataFiltered(newArr1);
                            }).catch(err => console.log(err, "error fetcing data"));

      },[])
  
        const changeStatefilter = () => {
          setisCurrentlyPostOnly(!isCurrentPostOnly)
          }

        const refreshData = () => {
            axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true/BasicDetails|Constituencies|Staff|Committees')
            .then((data) => {
           const newArr = data.data.Members.Member.map(element => {
               return [element.BasicDetails.GivenForename ,element.BasicDetails.GivenSurname, 
                       element.Party["#text"],element["@Member_Id"],element.Constituencies];
              });
              setdata(newArr)
              setisCurrentlyPostOnly(false)
              }).catch(err => console.log(err, "error refreshing data"));
          }

  return (  
    <div>
 <div>
       <Navbar refresh={()=> refreshData()} filter={()=> changeStatefilter()} />
    {loadingDataTitle ?  <div>
         <h3 className="dataLoadingTitle" data-testid="loadingApi">
          Data is loading from MP Api...
         </h3>
       </div>: null}
      
     
{ isCurrentPostOnly ? <DatatablePage extraData={dataFiltered} /> : 
                                <DatatablePage extraData={data} /> }

      </div>
    </div>
  );
}
 
export default MainPage;

 

  


 

 



    
