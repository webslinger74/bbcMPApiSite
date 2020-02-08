import React from 'react';

const Navbar = (props) => {
        const {refresh, filter} = props;
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark primary-color">
  <a class="navbar-brand" href="">UK Parliament - Members' Names Data Platform</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#"><button onClick={()=> refresh()}>RefreshData</button><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><button onClick={()=> filter()}>Filter Data</button></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#"></a>
      </li>
    </ul>
  </div>
</nav>



        </div>
      );
}
 
export default Navbar;

