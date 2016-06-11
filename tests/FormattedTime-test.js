import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme())

import FormattedTime from '../src/components/FormattedTime.js'

const noop = () => {}

describe('<FormattedTime />', () => {

  it('defaults to 0:00', () => {
    const time = mount(<FormattedTime />)

    expect(time.props().numSeconds).to.equal(0)
    expect(time.text()).to.equal('0:00')
  })

  it('renders a formatted time of mm:ss', () => {
    const time = mount(<FormattedTime numSeconds={700} />)
    expect(time.text()).to.equal('11:40')
  })

  it('renders m:ss when less than 10 minutes', () => {
    const time = mount(<FormattedTime numSeconds={82} />)
    expect(time.text()).to.equal('1:22')
  })

  it('renders hours when needed', () => {
    const time = mount(<FormattedTime numSeconds={3601} />)
    expect(time.text()).to.equal('1:00:01')
  })

})
