import * as React from 'react';
import { Radio, Select } from '@patternfly/react-core';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import QueryOptionsDropdown, { QueryOptionsDropdownProps, QueryOptionsPanel } from '../query-options-dropdown';

describe('<QueryOptionsDropdown />', () => {
  const props: QueryOptionsDropdownProps = {
    recordType: 'allConnections',
    reporter: 'destination',
    allowFlow: true,
    allowConnection: true,
    allowReporterBoth: true,
    allowTcpDrops: true,
    useTopK: false,
    limit: 100,
    match: 'all',
    packetLoss: 'all',
    setLimit: jest.fn(),
    setMatch: jest.fn(),
    setPacketLoss: jest.fn(),
    setReporter: jest.fn(),
    setRecordType: jest.fn()
  };
  it('should render component', async () => {
    const wrapper = shallow(<QueryOptionsDropdown {...props} />);
    expect(wrapper.find(QueryOptionsDropdown)).toBeTruthy();
    expect(wrapper.find(Select)).toBeTruthy();
  });
});

describe('<QueryOptionsPanel />', () => {
  const props: QueryOptionsDropdownProps = {
    recordType: 'allConnections',
    reporter: 'destination',
    allowFlow: true,
    allowConnection: true,
    allowReporterBoth: true,
    allowTcpDrops: true,
    useTopK: false,
    limit: 100,
    match: 'all',
    packetLoss: 'all',
    setLimit: jest.fn(),
    setMatch: jest.fn(),
    setPacketLoss: jest.fn(),
    setReporter: jest.fn(),
    setRecordType: jest.fn()
  };
  beforeEach(() => {
    props.setLimit = jest.fn();
    props.setReporter = jest.fn();
    props.setMatch = jest.fn();
  });
  it('should render component', async () => {
    const wrapper = shallow(<QueryOptionsPanel {...props} />);
    expect(wrapper.find('.pf-c-select__menu-group').length).toBe(5);
    expect(wrapper.find('.pf-c-select__menu-group-title').length).toBe(5);
    expect(wrapper.find(Radio)).toHaveLength(15);

    //setOptions should not be called at startup, because it is supposed to be already initialized from URL
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setReporter).toHaveBeenCalledTimes(0);
    expect(props.setMatch).toHaveBeenCalledTimes(0);
  });
  it('should set options', async () => {
    const wrapper = shallow(<QueryOptionsPanel {...props} />);
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setReporter).toHaveBeenCalledTimes(0);
    expect(props.setMatch).toHaveBeenCalledTimes(0);

    act(() => {
      wrapper.find('#reporter-source').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setReporter).toHaveBeenNthCalledWith(1, 'source');
    expect(props.setMatch).toHaveBeenCalledTimes(0);
    wrapper.setProps({ ...props, reporter: 'source' });

    act(() => {
      wrapper.find('#reporter-both').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setReporter).toHaveBeenNthCalledWith(2, 'both');
    expect(props.setMatch).toHaveBeenCalledTimes(0);
    wrapper.setProps({ ...props, reporter: 'both' });

    act(() => {
      wrapper.find('#limit-1000').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenNthCalledWith(1, 1000);
    expect(props.setReporter).toHaveBeenNthCalledWith(2, 'both');
    expect(props.setMatch).toHaveBeenCalledTimes(0);
    wrapper.setProps({ ...props, limit: 1000 });

    act(() => {
      wrapper.find('#match-any').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenNthCalledWith(1, 1000);
    expect(props.setReporter).toHaveBeenNthCalledWith(2, 'both');
    expect(props.setMatch).toHaveBeenNthCalledWith(1, 'any');
  });
});
