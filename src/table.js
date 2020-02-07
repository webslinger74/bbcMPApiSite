import React from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';


const DatatablePage = (props) => {


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
                select:<MDBBtn onClick={() => getIndividualDetails(element[3])} color="purple" size="sm">MP details</MDBBtn>
            }});
            
  

const data = {columns, rows}

const getIndividualDetails = (elementpassed) => {
  console.log("in the function", elementpassed);
  const url = elementpassed;

     fetch('http://data.parliament.uk/membersdataplatform/services/images/MemberPhoto/' + elementpassed)
    .then((results) => {
      console.log(results.json());
      return results.json();

    }).then(data => {
      const pictures = data.results.map((pic) => {
        return (
          <div key={pic.results}>
            <img src={pic.picture} />
          </div>
        )
      })
    }) 


  }
  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}


export default DatatablePage;