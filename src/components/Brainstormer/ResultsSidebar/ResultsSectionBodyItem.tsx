import * as React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    ListGroupItem,
    CardTitle,
    CardImg,
    CardFooter,
    CardText,
    CardLink,
} from 'reactstrap';
import { SearchResultItem } from '../GoogleFetcher';

/**
 * Represents a single search result item
 * @param props
 */
export function ResultsSectionBodyItem({ item, isImage }: ResultsSectionBodyItemProps) {
    let content: React.ReactNode;
    if (isImage) {
        content = (
            <>
                <CardHeader>
                    <CardTitle className="title">{item.title}</CardTitle>
                </CardHeader>
                <CardImg src={item.link} alt={item.title} />
            </>
        );
    } else {
        content = (
            <>
                <CardHeader>
                    <CardTitle className="title">{item.title}</CardTitle>
                </CardHeader>
                <CardBody className="snippet">{item.snippet}</CardBody>
            </>
        );
    }
    return (
        <ListGroupItem className="item">
            <Card>
                {content}
                <CardFooter>
                    <CardText>
                        <CardLink href={item.link} target="_blank" rel="noopener noreferrer">
                            View
                        </CardLink>
                    </CardText>
                </CardFooter>
            </Card>
        </ListGroupItem>
    );
}
interface ResultsSectionBodyItemProps {
    item: SearchResultItem;

    /**
     * Set to true if all results are from image search
     */
    isImage?: boolean;
}
