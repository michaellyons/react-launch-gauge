import React from 'react';
import BarGauge from '../../src/BarGauge';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) BarGauge', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<BarGauge height={100} value={42} max={100} />);
  })

  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {
    it('Should have a height property.', () => {
      expect( _component.props().height ).to.be.defined;
    })
    it('Could a title property.', () => {
      expect( _component.props().title ).to.be.defined;
    })
  })

})
