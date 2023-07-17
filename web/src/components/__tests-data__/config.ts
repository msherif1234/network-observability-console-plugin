export const ConfigResultSample = {
  recordTypes: ['flowLog'],
  portNaming: {
    enable: true,
    portNames: new Map([['3100', 'loki']])
  },
  quickFilters: [],
  sampling: 1,
  features: ['pktDrop', 'dnsTracking']
};
