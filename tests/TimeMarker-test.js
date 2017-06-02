/* eslint-env mocha */
import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { spy } from 'sinon'

chai.use(chaiEnzyme())

import TimeMarker, { TimeMarkerType } from '../src/components/TimeMarker.js'
import FormattedTime from '../src/components/FormattedTime.js'

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

    mount(
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

  it('accepts a custom className', () => {
    const marker = shallow(<TimeMarker className="MyClassName" />)
    expect(marker.props().className).to.include('MyClassName')
  })

  it('should have a default className', () => {
    const marker = shallow(<TimeMarker />)
    expect(marker.props().className).to.contain('TimeMarker')
  })

  it('accepts custom child classes', () => {
    const childClasses = {
      firstMarker: 'MyFirstMarker',
      secondMarker: 'MySecondMarker',
      separator: 'MySeparator',
    }

    const marker = shallow(<TimeMarker childClasses={childClasses} markerSeparator=" / " />)
    expect(marker.find(FormattedTime).at(0).prop('extraClasses')).to.contain('MyFirstMarker')
    expect(marker.find(FormattedTime).at(1).prop('extraClasses')).to.contain('MySecondMarker')
    expect(marker.find('.MySeparator')).to.have.length(1)
  })

  it('should accept custom styles', () => {
    const marker = shallow(<TimeMarker style={{ fontSize: 100 }} />)
    expect(marker.props().style).to.eql({ fontSize: 100 })
  })

  it('should accept custom children styles', () => {
    const style = { fontSize: 100 }
    const childrenStyles = {
      firstMarker: { ...style },
      secondMarker: { ...style },
      separator: { ...style },
    }

    const marker = mount(<TimeMarker markerSeparator={' / '} childrenStyles={childrenStyles} />)
    expect(marker.find('.TimeMarker-firstMarker').props().style).to.include(style)
    expect(marker.find('.TimeMarker-secondMarker').props().style).to.include(style)
    expect(marker.find('.TimeMarker-separator').props().style).to.include(style)
  })
})
