import React from 'react';
import CircleGauge from '../../src/CircleGauge';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) CircleGauge', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<CircleGauge height={100} value={42} max={100} />);
  })

  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {
    it('Should have a height property.', () => {
      expect( _component.props().height ).to.be.defined;
    })
  })

})
