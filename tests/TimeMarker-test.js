import React from 'react'
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import TimeMarker, { TimeMarkerType } from '../src/components/TimeMarker.js'

describe('<TimeMarker />', () => {

  it('renders two <FormattedTime />', () => {
    const marker = shallow(<TimeMarker />)
    expect(marker.find('FormattedTime')).to.have.length(2)
  })

  it('renders a separator when `markerSeparator` is provided', () => {
    const marker = shallow(<TimeMarker />)
    expect(marker.find('.TimeMarker-separator')).to.have.length(0)

    const marker2 = shallow(<TimeMarker markerSeparator={' of '} />)
    const sep = marker2.find('.TimeMarker-separator')
    expect(sep).to.have.length(1)
    expect(sep.first().text()).to.equal(' of ')
  })

  it('applies specified marker types', () => {
    spy(TimeMarker.prototype, 'getSecondsForTimeWithMarkerType')

    const marker = mount(
      <TimeMarker
        firstMarkerType={TimeMarkerType.DURATION}
        secondMarkerType={TimeMarkerType.LEFT_NEGATIVE}
      />
    )

    const spiedOn = TimeMarker.prototype.getSecondsForTimeWithMarkerType
    expect(spiedOn.callCount).to.equal(2)
    expect(spiedOn.args[0][0]).to.equal(TimeMarkerType.DURATION)
    expect(spiedOn.args[1][0]).to.equal(TimeMarkerType.LEFT_NEGATIVE)
  })

  it('should accept custom styles', () => {
    const marker = shallow(<TimeMarker style={{ fontSize: 100 }} />)
    expect(marker.props().style).to.eql({ fontSize: 100 })
  })

})
