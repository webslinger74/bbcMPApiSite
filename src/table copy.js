import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';


class DatatablePage extends Component {
    constructor(props){
    super(props)
    this.state = {
      Image:"",
      showPic:false,
      dataTable:{}

    }

    }

    componentDidUpdate(){
      
      const importData = this.props.extraData;
      console.log(importData, "has the data arrived yet");

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
                    select:<MDBBtn onClick={() => this.getIndividualDetails(element[3], element)} color="purple" size="sm">MP details</MDBBtn>
                }});
                
      console.log(rows, "the rows");
    
    const data = {columns, rows};
                  this.setState({
                    dataTable:data
                  },() => {
                    console.log(this.state.dataTable);
                  })
  
              }
    

    componentDidMount(){
    
    }
        

    getIndividualDetails = (elementpassed, fullelement) => {
    console.log("in the function", elementpassed,  "the full", fullelement[4]);
      
   
      fetch('http://data.parliament.uk/membersdataplatform/services/images/MemberPhoto/' + elementpassed)
      .then((results) => {
        console.log(results);
        return results;
  
      }).then(data => {
        console.log(data.url);
        const mpImageUrl = data.url;
        this.setState({
            Image:mpImageUrl,
            showPic:true
        }, () => {
          console.log(this.state.Image, " the image url in hook state");
        })
        return (
            <div>
              <img src={data.url} />
            </div>
          )
        })
  
    }
  
    render(){

  return (
    <div className="mainView">
    <MDBDataTable
      striped
      bordered
      scrollY
      maxHeight="80vh"
      small
      data={this.state.dataTable}
    />
    <div className="right1">
  { this.state.showPic ? <div><img src={Image} /><div>{}</div></div>
              : null}
    </div>
</div>
  );
}
    }

export default DatatablePage;