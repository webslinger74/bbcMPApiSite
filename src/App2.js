import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DatatablePage from './table';
import Navbar from './navbar';

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {fulldata:[],
                  data:[],
                  dataFiltered:[],
                  isCurrentPostOnly:false}
  }
 
  componentDidMount(){

   axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true/BasicDetails|Constituencies|Staff|Committees')
            .then((data) => {
           const newArr = data.data.Members.Member.map(element => {
            
               return [element.BasicDetails.GivenForename ,element.BasicDetails.GivenSurname, element.Party["#text"],element["@Member_Id"], element.Constituencies];
              });
              this.setState({data:newArr,
                              fulldata:data
            }, ()=> {
              console.log("the data,", this.state.fulldata)
            });
            
                            }).catch(err => console.log(err, "error fetching data"));


   axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true|holdsgovernmentpost=true/BasicDetails|Constituencies|Staff|Committees')
              .then((data) => {
                console.log(data, "the dagta")
               const newArr1 = data.data.Members.Member.map((element) => {
                        return [element.BasicDetails.GivenForename, element.BasicDetails.GivenSurname, element.Party["#text"], element["@Member_Id"], element.Constituencies];
                                })
                                this.setState({
                                  dataFiltered:newArr1
                                })
                                            }).catch(err => console.log(err, "error fetcing data"));
  }


  changeStatefilter = () => {
      this.setState({
        isCurrentPostOnly: !this.state.isCurrentPostOnly
      })
  }

  refreshData = () => {
    console.log("btn clicked!");
    axios.get('http://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true/BasicDetails|Constituencies|Staff|Committees')
    .then((data) => {
   const newArr = data.data.Members.Member.map(element => {
       return [element.BasicDetails.GivenForename ,element.BasicDetails.GivenSurname, element.Party["#text"],element["@Member_Id"],element.Constituencies];
      });
      this.setState({data:newArr,
                      isCurrentPostOnly:false
      });
                    }).catch(err => console.log(err, "error refreshing data"));

  }

  render() { 
    return (  
      <div>
       <Navbar refresh={()=> this.refreshData()} filter={()=> this.changeStatefilter()} />
     
{ this.state.isCurrentPostOnly ? <DatatablePage extraData={this.state.dataFiltered} /> : 
                                <DatatablePage extraData={this.state.data} /> }

      </div>

      
    );
  }
}
 
export default App2;

    
