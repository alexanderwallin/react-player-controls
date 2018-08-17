/* eslint-env mocha */
import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import Button from '../src/components/Button.js'
import { CustomPlayIcon } from "./helpers/custom-icon";


const noop = () => {}

describe('<Button />', () => {

  it('renders a custom icon instead of default icon if passed as icon prop', () => {
    const btn = mount(<Button icon={<CustomPlayIcon/>} onClick={noop} />)
    const btnDefault = mount(<Button onClick={noop} />)

    expect(btn.find('.Icon')).to.have.length(1)

    // Check to make sure custom icon has been loaded instead of default icon
    expect(btn.find('.Icon')).to.not.eql(btnDefault.find('.Icon'))
  })

})
