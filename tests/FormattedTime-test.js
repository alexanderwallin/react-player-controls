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

  it('renders negative time', () => {
    const time1 = mount(<FormattedTime numSeconds={-82} />)
    expect(time1.text()).to.equal('-1:22')

    const time2 = mount(<FormattedTime numSeconds={-(3600 + 20*60 + 10)} />)
    expect(time2.text()).to.equal('-1:20:10')
  })

  it('renders hours when needed', () => {
    const time = mount(<FormattedTime numSeconds={3601} />)
    expect(time.text()).to.equal('1:00:01')
  })

  it('rounds rendered time to integers', () => {
    const time1 = mount(<FormattedTime numSeconds={3601.12874773} />)
    expect(time1.text()).to.equal('1:00:01')

    const time2 = mount(<FormattedTime numSeconds={3601.88999898} />)
    expect(time2.text()).to.equal('1:00:02')
  })

  it('should accept a className', () => {
    let time = shallow(<FormattedTime className="CustomClassName" />)
    expect(time.props().className).to.contain('CustomClassName')
  })

  it('should have a default className', () => {
    let time = shallow(<FormattedTime />)
    expect(time.props().className).to.contain('FormattedTime')
  })

  it('should accept extra classes', () => {
    const classes = 'TestClass'

    let time = mount(<FormattedTime extraClasses={classes} onClick={noop} />)
    expect(time.props().extraClasses).to.equal(classes)

    time = shallow(<FormattedTime extraClasses={classes} onClick={noop} />)
    expect(time.props().className).to.contain(classes)
  })

  it('should accept custom styles', () => {
    const time = shallow(<FormattedTime style={{ fontSize: 100 }} />)
    expect(time.props().style).to.eql({ fontSize: 100 })
  })

})
