import * as datasources from '../../datasources.json';

export function getDataSources() {
	return datasources;
}

export function getDataBaseNames() {
	return datasources.map(ds => ds.name);
}