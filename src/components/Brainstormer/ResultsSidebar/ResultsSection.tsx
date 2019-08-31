import * as React from 'react';
import * as _ from 'lodash';
import { Collapse, Card, CardHeader, CardBody } from 'reactstrap';

import { SearchResults } from '../GoogleFetcher';
import { ResultsSectionBody } from './ResultsSectionBody';

const loremIpsumDefault = `
Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum,
Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum,`;

/**
 * Represents a grouping of search results
 * @param props
 */
export function ResultsSection(props: ResultsSectionProps) {
    const { state, id, header, results = loremIpsumDefault } = props;
    const [selected, selectSection] = state;
    const isSelected = selected === id;

    const handleClick = () => {
        if (isSelected) {
            selectSection(-1); // Select id -1 to collapse all
        } else {
            selectSection(id);
        }
    };

    const className = 'results-section ' + (isSelected ? 'selected' : '');
    return (
        <Card className={className}>
            <CardHeader onClick={handleClick} style={{ cursor: 'pointer' }}>
                {header}
            </CardHeader>
            <Collapse className="" isOpen={isSelected}>
                {typeof results === 'string' ? (
                    <CardBody>{results}</CardBody>
                ) : (
                    <ResultsSectionBody isImage={props.isImage} results={results} />
                )}
            </Collapse>
        </Card>
    );
}

export interface ResultsSectionProps {
    header: string;
    results?: SearchResults | string | null;
    isImage?: boolean;
    state: [number, React.Dispatch<React.SetStateAction<number>>];
    id: number;
}
