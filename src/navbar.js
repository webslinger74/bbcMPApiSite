import React from 'react';

const Navbar = (props) => {
        const {refresh, filter} = props;
    return (
        <div>
 <nav className="navbar navbar-expand-lg navbar-dark primary-color navMyClass">
   <div className="navbar-brand" data-testid="navbar" >UK Parliament - Members' Names Data Platform</div>
    <div className="collapse navbar-collapse navMyInner" id="navbarNav" >
      <ul className="navbar-nav">
        <li className="nav-item myNavbutton">
         <button onClick={()=> refresh()}>RefreshData</button>
       </li>
       <li className="nav-item myNavButton">
        <button onClick={()=> filter()}>Filter Data</button>
       </li>
     </ul>
   </div>
 </nav>



        </div>
      );
}
 
export default Navbar;

