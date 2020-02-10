import React from 'react';
import ReactDOM from "react-dom";
import App from '../MainPage';
import Table from '../Table'
import { render, fireEvent, getByTestId, waitForElement, getByRole, getByText, wait } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axiosMock from 'axios';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import { act } from 'react-test-renderer';
import fetch from 'node-fetch';
import MainPage from '../MainPage';


/* configure({ adapter: new Adapter()});

describe('<table /> with no props', () => {
    const container = shallow(<Table />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    })
    
})

describe('<App /> with no props', () => {
    const container = shallow(<App />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    })
})

describe('<navbar /> with no props', () => {
    const container = shallow(<navbar />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    })
})


it("App renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
})

it("App loads Data loading header at render", () => {
    const { container } = render(<App /> );
    const isCurrentPostOnly = getByTestId(container, "loadingApi");
    expect(isCurrentPostOnly.textContent).toBe("Data is loading from MP Api...");
})

it("App loads with the navbar component at render", ()=> {
    const { container } = render(<App /> );
    const navbar = getByTestId(container, "navbar");
    expect(navbar.textContent).toBe("UK Parliament - Members' Names Data Platform");
}) 

 it("should contain the following header text in the document table headers", () => {
    const mydata = [["steven", "webster", "labour", 40]];
    const  { getByText } = render(<Table extraData={mydata} />)
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Surname')).toBeInTheDocument();
    expect(getByText('Party')).toBeInTheDocument();
    expect(getByText('Select')).toBeInTheDocument();
})      */

jest.mock('axios');

test('it loads and displays greeting', async () => {
   
    const mydata = [["steven","webster", "Labour", 100, "Bolton North"]];

    axiosMock.get.mockResolvedValueOnce({data:{
        Members:{
            Member: {   Name:"luxy",
                        Surname:"webster",
                        Party: "Labour",
                        MemberId: 100,
                        DisplayAs:"Lucy Webster",
                        Committees:{
                            Committee:{
                                Name:"Dog Walking"
                            }},
                        Staffing:"None",
                        Constituencies: {
                            Constituency:{
                            Name:"Bolton North"
                            }
        }
    }}}}
    )
    global.fetch = fetch;
    fetchMock.mock("http://data.parliament.uk/membersdataplatform/services/images/MemberPhoto/100", 
                    {}
                    );
                    
                    
    const { getByText,getByTestId, getByRole, debug } = render(<Table  extraData={mydata} />);              

    act(() =>  {
       
        fireEvent.click(getByText("MP details"))
     } )
    
       
        
    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    await wait(() => {
        expect(getByText("MP's - Name:")).toBeInTheDocument();
    })
    debug();
        expect(getByText("Bolton North")).toBeInTheDocument();
        expect(getByText("Dog Walking")).toBeInTheDocument();
        expect(getByText("Lucy Webster")).toBeInTheDocument();
        expect(getByText("None")).toBeInTheDocument();
        expect(getByText("Send JSON data:")).toBeInTheDocument();

    act(() => {
        fireEvent.click(getByTestId("titleJson"));
    })

    });

    
  

/* test('it should filter when navbar filter button pressed', async () => {
    axiosMock.get.mockResolvedValueOnce({data:{
        Members:{
            Member: {  BasicDetails :{
                                GivenForeName:"terry",
                                GivenSurname:"smith" },
                       Party:{ text:"Conservative" },
                       MemberId:100,
                       Constituencies: {
                            Constituency:{
                            Name:"Cheadle South"
                            }
        }
    }}}}
    )

   const { getByText,getByTestId, getByRole, debug } = render(<MainPage />);  
   

    act(() => {
        fireEvent.click(getByText("RefreshData"));

    })
    debug();
    expect(getByText("terry")).toBeInTheDocument();



}) */



