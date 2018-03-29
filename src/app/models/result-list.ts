import { ResultDto } from './result';

export interface ResultList {
	resultsVersion: number;
	resultsList: Array<ResultDto>;
}