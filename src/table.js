import React from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { useState } from 'react';
import Axios from 'axios';


const DatatablePage = (props) => {


    const [Image, setImage] = useState([]);
    const [showPic, setShowPic] = useState(false);
    const [con,  setcon] = useState([]);
    const [com, setcom] = useState([]);
    const [staff, setStaff] = useState([]);
    const [name, setName] = useState("");
    const [allIndData, setAllIndData] = useState([]);
    const importData = props.extraData;
    console.log(importData, "import data");

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
                select:<MDBBtn onClick={() => getIndividualDetails(element[3], element)} color="blue" size="sm">MP details</MDBBtn>
            }});
            
  

const data = {columns, rows}

const getIndividualDetails = (elementpassed, fullelement) => {
  console.log("in the function", elementpassed,  "the full", fullelement[4]);
  
 
    fetch('http://data.parliament.uk/membersdataplatform/services/images/MemberPhoto/' + elementpassed)
    .then((results) => {
      console.log(results);
      return results;

    }).then(data => {
      console.log(data.url);
      const mpImageUrl = data.url;
      setImage(mpImageUrl);
      setShowPic(true);
      console.log(Image, " the image url in hook state");
      return (
          <div>
            <img src={data.url} />
          </div>
        )
      })

Axios.get("http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true|id=" + elementpassed + "/BasicDetails|Constituencies|Committees|Staff")
.then((data) => {

  setAllIndData(data.data.Members.Member);
  console.log(data.data.Members.Member, "the bloody data is nowhere to be seen");
  console.log(data.data.Members.Member.Constituencies.Constituency[0], "the const")
//  console.log(data.data.Members.Member.Committees, "the committees");
  console.log(data.data.Members.Member.Staffing, "the staff");

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

  console.log(data.data.Members.Member.DisplayAs);
    setName(data.data.Members.Member.DisplayAs);

    setStaff(data.data.Members.Member.Staffing)
 
     });
    

  }

  const sendJsonDataMockApi = (indData) => {
    const urlPOST = "http://localhost:3000/mockApi";
      console.log(indData, "the ind data in function");
      const dt = { data: { value: indData }};
      const request = Axios.post(urlPOST, dt);
      console.log(request, "the failed mock api return")
  }


  return (
    <div className="mainView">
    <MDBDataTable
      striped
      bordered
      scrollY
      maxHeight="80vh"
      small
      data={data}
    />
    <div className="right1">
  { showPic ? <div><div className="boldTitle">MP's - Name:<div></div><div className="name"> {name}</div></div><img src={Image} />
                                      <div className="boldTitle">Current Constituency:</div><div> {con}</div>
                                      <div className="boldTitle">Committees:</div><div> {com}</div>
                                      <div className="boldTitle">Staff:</div><div> {(staff === null) ? "None" : staff}</div>
                                      <div className="boldTitle">Send JSON data: <button onClick={() => sendJsonDataMockApi(allIndData)}>Send</button></div>
                                      
                                      </div>
                                      
               : null}
    </div>

</div>
  );
}


export default DatatablePage;