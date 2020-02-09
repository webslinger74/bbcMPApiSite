import React from 'react';
import ReactDOM from "react-dom";
import App from '../MainPage';
import Table from '../Table'
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter()});

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
})




