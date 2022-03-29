import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";

import Loading from "../components/Loading/Loading.jsx";
import NotFound from "../components/NotFound/NotFound.jsx"
import imageNF from '../Components/NotFound/NotFoundDog.png'
import gifLoading from "../Components/Loading/dog2.gif"

configure({ adapter: new Adapter() });

describe("<NotFound />", () => {
  let notFound  = shallow(<NotFound />);

  it("Deberia renderizar un H2 en <NotFound />", () => {
    expect(notFound.find('h2')).toHaveLength(1);
  });
  it('Debe contener una etiqueta <img/>.', () => {
    expect(notFound.find('img').at(0).find('img').prop('src')).toEqual(imageNF)
  });
});
describe("<NavBar />", () => {
  let loading = shallow(<Loading />);
  
  it("Deberia renderizar un H2 en <NotFound />", () => {
    expect(loading.find('h2')).toHaveLength(1);
    expect(loading.find('h2').at(0).text()).toEqual("Loading...");
  });
  it('Debe contener una etiqueta <img/>.', () => {
    expect(loading.find('img').at(0).find('img').prop('src')).toEqual(gifLoading)
    expect(loading.find('img').at(0).find('img').prop('alt')).toEqual('Dog')
  });
})