export type PropertyType = 'CONFIG' | 'REPORTED' | 'INFORMATIVE';
export type ThingType = 'GATEWAY' | 'SENSOR' | 'ACTUATOR';

// Filter types.
export type ApplicationsFilter = 'NAME' | 'DESCRIPTION';
export type GatewaysFilter = 'NAME' | 'DESCRIPTION' | 'IP' | 'IS_ALIVE' | 'APPLICATION';
export type ProcessesFilter = 'NAME' | 'DESCRIPTION' | 'IS_ALIVE' | 'GATEWAY';
export type PropertiesFilter = 'TYPE' | 'NAME' | 'VALUE';
