import * as React from 'react';
import './ResultsSidebar.scss';
import { SearchResults } from '../GoogleFetcher';
import { ResultsSection } from './ResultsSection';

interface ResultsSidebarProps {
    searchResults: SearchResults | null;
    imageResults: SearchResults | null;
}
export default function ResultsSidebar({ searchResults, imageResults }: ResultsSidebarProps) {
    const state = React.useState(0);

    return (
        <section className="results side-bar">
            <ResultsSection id={0} header="Image results" state={state} isImage results={imageResults} />
            <ResultsSection id={1} header="Web results" state={state} results={searchResults} />
            <ResultsSection id={2} header="Video results" state={state} results={imageResults} />
            <ResultsSection id={3} header="News results" state={state} results={imageResults} />
        </section>
    );
}
