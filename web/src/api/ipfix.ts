/* eslint-disable max-len */
import { RecordType } from '../model/flow-query';

// Please keep this file documented: it is used in doc generation
// To regenerate doc, run `make generate-doc` - and also check this page:
// eslint-disable-next-line max-len
// https://github.com/netobserv/network-observability-operator/blob/main/docs/GeneratingAsciidocAPI.md#generate-asciidoc-for-flows-json-format-reference

export interface Record {
  labels: Labels;
  key: number;
  fields: Fields;
}

export interface Labels {
  /** Source namespace */
  SrcK8S_Namespace?: string;
  /** Destination namespace */
  DstK8S_Namespace?: string;
  /** Source owner, such as Deployment, StatefulSet, etc. */
  SrcK8S_OwnerName?: string;
  /** Destination owner, such as Deployment, StatefulSet, etc. */
  DstK8S_OwnerName?: string;
  /** Flow direction from the node observation point */
  FlowDirection: FlowDirection;
  /** Type of record: 'flowLog' for regular flow logs, or 'allConnections',
   * 'newConnection', 'heartbeat', 'endConnection' for conversation tracking */
  _RecordType?: RecordType;
}

export enum FlowDirection {
  /** Incoming traffic, from node observation point */
  Ingress = '0',
  /** Outgoing traffic, from node observation point */
  Egress = '1'
}

export interface Fields {
  /** Source IP address (ipv4 or ipv6) */
  SrcAddr: string;
  /** Destination IP address (ipv4 or ipv6) */
  DstAddr: string;
  /** Source MAC address */
  SrcMac: string;
  /** Destination MAC address */
  DstMac: string;
  /** Name of the source matched Kubernetes object, such as Pod name, Service name, etc. */
  SrcK8S_Name?: string;
  /** Name of the destination matched Kubernetes object, such as Pod name, Service name, etc. */
  DstK8S_Name?: string;
  /** Kind of the source matched Kubernetes object, such as Pod, Service, etc. */
  SrcK8S_Type?: string;
  /** Kind of the destination matched Kubernetes object, such as Pod name, Service name, etc. */
  DstK8S_Type?: string;
  /** Source port */
  SrcPort: number;
  /** Destination port */
  DstPort: number;
  /** Kind of the source Kubernetes owner, such as Deployment, StatefulSet, etc. */
  SrcK8S_OwnerType?: string;
  /** Kind of the destination Kubernetes owner, such as Deployment, StatefulSet, etc. */
  DstK8S_OwnerType?: string;
  /** Source node IP */
  SrcK8S_HostIP?: string;
  /** Destination node IP */
  DstK8S_HostIP?: string;
  /** Source node name */
  SrcK8S_HostName?: string;
  /** Destination node name */
  DstK8S_HostName?: string;
  /** L4 protocol */
  Proto: number;
  /** Network interface */
  Interface?: string;
  /** TCP flags */
  Flags?: number;
  /** Number of packets in this flow */
  Packets: number;
  /** In conversation tracking, A to B packets counter per conversation */
  Packets_AB?: number;
  /** In conversation tracking, B to A packets counter per conversation */
  Packets_BA?: number;
  /** Number of bytes in this flow */
  Bytes: number;
  /** In conversation tracking, A to B bytes counter per conversation */
  Bytes_AB?: number;
  /** In conversation tracking, B to A bytes counter per conversation */
  Bytes_BA?: number;
  /** ICMP type */
  IcmpType?: number;
  /** ICMP code */
  IcmpCode?: number;
  /** TCP state for drops */
  TcpDropLatestState?: string;
  /** TCP cause for drops */
  TcpDropLatestDropCause?: string;
  /** TCP flags for drops */
  TcpDropLatestFlags?: number;
  /** Number of packets dropped in this flow */
  TcpDropPackets?: number;
  /** In conversation tracking, A to B packets dropped counter per conversation */
  TcpDropPackets_AB?: number;
  /** In conversation tracking, B to A packets dropped counter per conversation */
  TcpDropPackets_BA?: number;
  /** Number of bytes dropped in this flow */
  TcpDropBytes?: number;
  /** In conversation tracking, A to B bytes dropped counter per conversation */
  TcpDropBytes_AB?: number;
  /** In conversation tracking, B to A bytes dropped counter per conversation */
  TcpDropBytes_BA?: number;
  /** DNS record id */
  DnsId?: number;
  /** TCP flags for DNS record */
  DnsFlags?: number;
  /** Timestamp of DNS request, in milliseconds */
  DnsRequestTimeMs?: number;
  /** Timestamp of DNS response, in milliseconds */
  DnsResponseTimeMs?: number;
  /** Calculated time between response and request, in milliseconds */
  DnsLatencyMs?: number;
  /** Start timestamp of this flow, in milliseconds */
  TimeFlowStartMs: number;
  /** End timestamp of this flow, in milliseconds */
  TimeFlowEndMs: number;
  /** Timestamp when this flow was received and processed by the flow collector, in seconds */
  TimeReceived: number;
  /** In conversation tracking, the conversation identifier */
  _HashId?: string;
  /** In conversation tracking, a flag identifying the first flow */
  _IsFirst?: string;
  /** In conversation tracking, a counter of flow logs per conversation */
  numFlowLogs?: number;
}
