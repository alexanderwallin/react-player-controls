import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import MuteToggleButton from '../src/components/MuteToggleButton.js'
import SoundOnButton from '../src/components/SoundOnButton.js'
import SoundOffButton from '../src/components/SoundOffButton.js'

describe('<MuteToggleButton />', () => {

  it('is enabled by default', () => {
    const btn = mount(<MuteToggleButton />)
    expect(btn.props().isEnabled).to.be.true
  })

  it('is unmunted by default', () => {
    const btn = mount(<MuteToggleButton />)
    expect(btn.props().isMuted).to.be.false
  })

  it('accepts extra classes', () => {
    const classes = 'TestClass'

    let btn = mount(<MuteToggleButton extraClasses={classes} />)
    expect(btn.props().extraClasses).to.equal(classes)

    btn = shallow(<MuteToggleButton extraClasses={classes} />)
    expect(btn.props().className).to.contain(classes)
  })

  it('renders <SoundOnButton /> when unmuted', () => {
    const btn = mount(<MuteToggleButton isMuted={false} />)
    expect(btn.find(SoundOnButton)).to.have.length(1)
  })

  it('renders <SoundOffButton /> when muted', () => {
    const btn = mount(<MuteToggleButton isMuted={true} />)
    expect(btn.find(SoundOffButton)).to.have.length(1)
  })

  it('triggers an onMuteChange() callback when enabled', () => {
    const callback = spy()
    const btn = mount(<MuteToggleButton isEnabled={false} isMuted={false} onMuteChange={callback} />)

    // TODO: Sound*Button components should be mocked

    btn.find(SoundOnButton).simulate('click')
    expect(callback.callCount).to.equal(0)

    btn.setProps({ ...btn.props(), isEnabled: true })
    btn.find(SoundOnButton).simulate('click')
    expect(callback.callCount).to.equal(1)

    btn.setProps({ ...btn.props(), isMuted: true })
    btn.find(SoundOffButton).simulate('click')
    expect(callback.callCount).to.equal(2)

    btn.setProps({ ...btn.props(), isEnabled: false })
    btn.find(SoundOffButton).simulate('click')
    expect(callback.callCount).to.equal(2)
  })

})
