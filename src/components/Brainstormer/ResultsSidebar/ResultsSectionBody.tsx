import * as React from 'react';
import * as _ from 'lodash';
import { ListGroup, Card } from 'reactstrap';
import { SearchResults } from '../GoogleFetcher';
import { ResultsSectionBodyItem } from './ResultsSectionBodyItem';

/**
 * Represents a list of search results
 * @param props
 */
export function ResultsSectionBody(props: ResultsSectionBodyProps) {
    if (props.results == null) {
        return <Card body>No results currently available</Card>;
    }
    return (
        <ListGroup className={'results-section-body ' + props.className}>
            {_.map(props.results.items, (item, i) => (
                <ResultsSectionBodyItem key={i} item={item} isImage={props.isImage} />
            ))}
        </ListGroup>
    );
}

interface ResultsSectionBodyProps {
    /**
     * The results of the api call
     */
    results: SearchResults | null;

    /**
     * Set to true if all results are from image search
     */
    isImage?: boolean;
    className?: string;
}
