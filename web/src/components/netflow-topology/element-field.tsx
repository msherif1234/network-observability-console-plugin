import { Flex, FlexItem, Text, TextContent, TextVariants } from '@patternfly/react-core';
import * as React from 'react';
import { NodeType } from '../../model/flow-query';
import { TopologyMetricPeer } from '../../api/loki';
import { Filter, FilterDefinition } from '../../model/filters';
import { SummaryFilterButton } from '../filters/summary-filter-button';
import { PeerResourceLink } from './peer-resource-link';

export const ElementField: React.FC<{
  id: string;
  label: string;
  filterType: NodeType;
  forcedText?: string;
  peer: TopologyMetricPeer;
  activeFilters: Filter[];
  setFilters: (filters: Filter[]) => void;
  filterDefinitions: FilterDefinition[];
}> = ({ id, label, filterType, forcedText, peer, activeFilters, setFilters, filterDefinitions }) => {
  return (
    <TextContent id={id} className="record-field-container">
      <Text component={TextVariants.h4}>{label}</Text>
      <Flex>
        <FlexItem flex={{ default: 'flex_1' }}>
          {forcedText ? <Text>{forcedText}</Text> : <PeerResourceLink peer={peer} />}
        </FlexItem>
        <FlexItem>
          <SummaryFilterButton
            id={id + '-filter'}
            activeFilters={activeFilters}
            filterType={filterType}
            fields={peer}
            setFilters={setFilters}
            filterDefinitions={filterDefinitions}
          />
        </FlexItem>
      </Flex>
    </TextContent>
  );
};
