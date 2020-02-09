import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import Axios from 'axios';
import sendJsonDataMockApi  from './utils/SendJsonDataMockApi';

const DatatablePage = (props) => {

    const importData = props.extraData;

    const [Image, setImage] = useState([]);
    const [showPic, setShowPic] = useState(false);
    const [con,  setcon] = useState([]);
    const [com, setcom] = useState([]);
    const [staff, setStaff] = useState([]);
    const [name, setName] = useState("");
    const [allIndData, setAllIndData] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const [loadImage, setLoadImage] = useState(false);

    

    useEffect(()=> {

    const columns = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Surname',
        field: 'surname',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Party',
        field: 'party',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Select',
        field: 'select',
        sort: 'asc',
        width: 20
      }
    ]
  
  const rows = importData.map(element => {
          
  
    return {    name:element[0],
                surname:element[1],
                party:element[2],
                select:<div><MDBBtn  onClick={() => getIndividualDetails(element[3])} color="blue" size="sm"><span data-testid="btnInd">MP details</span></MDBBtn></div>
            }});
  
    const idea = {columns, rows}
  
    setData(idea);
   setLoad(true);
}, [importData])

const getIndividualDetails = (elementpassed) => {
    setLoadImage(false);
 
    fetch('http://data.parliament.uk/membersdataplatform/services/images/MemberPhoto/' + elementpassed)
    .then((results) => {
      return results;

    }).then(data => {
      const mpImageUrl = data.url;
      setImage(mpImageUrl);
     
      setTimeout(() => {
        setLoadImage(true);
        setShowPic(true);
      },1000);
      }).catch(err => {
        setError(err.message);
      })

Axios.get("http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true|id=" + elementpassed + "/BasicDetails|Constituencies|Committees|Staff")
.then((data) => {

  setAllIndData(data.data.Members.Member);

  if(data.data.Members.Member.Constituencies.Constituency.Name !== undefined){
    setcon(data.data.Members.Member.Constituencies.Constituency.Name)
  } else {
  (data.data.Members.Member.Constituencies.Constituency[0] === null ||  data.data.Members.Member.Constituencies.Constituency[0] === undefined) 
  ? setcon("No Constituency") : setcon(data.data.Members.Member.Constituencies.Constituency[0].Name)
  }

  if(data.data.Members.Member.Committees === null){
        setcom("No Committees");
  }  else if(data.data.Members.Member.Committees.Committee.Name !== undefined){
      setcom(data.data.Members.Member.Committees.Committee.Name)
  } else {
    (data.data.Members.Member.Committees.Committee[0] === null ||  data.data.Members.Member.Committees.Committee[0] === undefined) 
    ? setcom("No Committees") : setcom(data.data.Members.Member.Committees.Committee[0].Name)
  }

    setName(data.data.Members.Member.DisplayAs);
    setStaff(data.data.Members.Member.Staffing)
 
     });
    

  }

  if(load){
      return (
        <ul>
          {error ? <li>{error.message}</li> : <div className="mainView" data-testid="mainView">
    <MDBDataTable
      striped
      bordered
      scrollY
      maxHeight="80vh"
      small
      data={data}
    />
    <div className="right1">
  { showPic ? <div><div data-testid="boldTitle1" className="boldTitle">MP's - Name:<div></div><div className="name"> {name}</div></div>{loadImage ? 
                                      <img src={Image} alt={"MP"}/>:<div className="img-height">image loading...</div>}
                                      <div className="boldTitle" data-testid="titleConstituency">Current Constituency:</div><div> {con}</div>
                                      <div className="boldTitle" data-testid="titleCommittees">Committees:</div><div> {com}</div>
                                      <div className="boldTitle" data-testid="titleStaff">Staff:</div><div> {(staff === null) ? "None" : staff}</div>
                                      <div className="boldTitle" data-testid="titleJson">Send JSON data: <button onClick={() => sendJsonDataMockApi(allIndData)}>Send</button></div>
                                      
                                      </div>
                                      
               : null}
    </div>

</div>}
        </ul>
      )

  } else {
      return (  
        <div>
       
        <MDBDataTable
        striped
        bordered
        scrollY
        maxHeight="50vh"
        small
        data={data}
      />
      </div>
      )
  }
  
}


export default DatatablePage;