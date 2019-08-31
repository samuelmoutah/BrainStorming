import * as React from 'react';
import * as googleFetcher from './GoogleFetcher';
import * as _ from 'lodash';

import { GraphView, INode, IEdge } from 'react-digraph';
import graphState, { IGraph } from './defaultGraphState';

import GraphConfig, {
    EMPTY_EDGE_TYPE,
    EMPTY_TYPE,
    NODE_KEY,
    SPECIAL_EDGE_TYPE,
    SPECIAL_TYPE,
} from './graph-config'; // Configures node/edge types
import { Sidebar } from './Sidebar';

import './Brainstormer.scss';
import { ResultsSidebar } from './ResultsSidebar';

type GraphProps = {
    onSelected(selected: INode | null): any;
};

type GraphState = {
    graph: IGraph;
    selected: INode | IEdge | null;
    totalNodes: number;

    searchResults: googleFetcher.SearchResults | null;
    imageResults: googleFetcher.SearchResults | null;
};

const DEBOUNCE_MS = 250;

class Graph extends React.Component<GraphProps, GraphState> {
    constructor(props: GraphProps) {
        super(props);

        this.state = {
            graph: graphState,
            selected: graphState.nodes[0],
            totalNodes: graphState.nodes.length,
            searchResults: null,
            imageResults: null,
        };

        this.handleGoogleSearch = _.throttle(this.handleGoogleSearch.bind(this), DEBOUNCE_MS);
    }

    public readonly state: GraphState;

    //#region Handlers copied from react-digraph sample graph
    // Helper to find the index of a given node
    getNodeIndex(searchNode: INode | any) {
        return this.state.graph.nodes.findIndex((node: INode) => {
            return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    }

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge: IEdge) {
        return this.state.graph.edges.findIndex((edge: IEdge) => {
            return edge.source === searchEdge.source && edge.target === searchEdge.target;
        });
    }
    addStartNode = () => {
        // @ts-ignore
        const input = (window as any).prompt('Name this node:') || 'New input';
        this.addNode(input);
    };
    addRandomNode = () => {
        this.addNode('Auto-generated node');
    };

    addNode = (title: string) => {
        const graph = this.state.graph;
        // using a new array like this creates a new memory reference
        // this will force a re-render

        const newNode: INode = {
            id: Date.now(),
            title,
            type: SPECIAL_TYPE,
            x: 50,
            y: 50,
        };

        graph.nodes = [newNode, ...this.state.graph.nodes];
        this.setState({
            graph,
            selected: newNode,
        });
    };

    /*
     * Handlers/Interaction
     */

    // Called by 'drag' handler, etc..
    // to sync updates from D3 with the graph
    onUpdateNode = (viewNode: INode) => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);

        graph.nodes[i] = viewNode;
        this.setState({ graph });
    };

    onSelectNode = (viewNode: INode | null) => {
        this.setState({ selected: viewNode });
        this.handleGoogleSearch(viewNode);
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge: IEdge) => {
        this.setState({ selected: viewEdge });
    };

    // Updates the graph with a new node
    onCreateNode = (x: number, y: number) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = Math.random() < 0.25 ? SPECIAL_TYPE : EMPTY_TYPE;

        const viewNode = {
            id: Date.now(),
            title: '',
            type,
            x,
            y,
        };

        graph.nodes = [...graph.nodes, viewNode];
        this.setState({ graph });
    };

    // Deletes a node from the graph
    onDeleteNode = (viewNode: INode, nodeId: string, nodeArr: INode[]) => {
        const graph = this.state.graph;
        // Delete any connected edges
        const newEdges = graph.edges.filter((edge: IEdge, i: number) => {
            return edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY];
        });
        graph.nodes = nodeArr;
        graph.edges = newEdges;

        this.setState({ graph, selected: null });
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
        const graph = this.state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type,
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges = [...graph.edges, viewEdge];
            this.setState({
                graph,
                selected: viewEdge,
            });
        }
    };

    // Called when an edge is reattached to a different target.
    onSwapEdge = (sourceViewNode: INode, targetViewNode: INode, viewEdge: IEdge) => {
        const graph = this.state.graph;
        const i = this.getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;
        // reassign the array reference if you want the graph to re-render a swapped edge
        graph.edges = [...graph.edges];

        this.setState({
            graph,
            selected: edge,
        });
    };

    // Called when an edge is deleted
    onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
        const graph = this.state.graph;
        graph.edges = edges;
        this.setState({
            graph,
            selected: null,
        });
    };

    //#endregion

    public componentDidMount() {
        this.handleGoogleSearch(this.state.graph.nodes[0]);
    }

    private handleGoogleSearch(viewNode: INode | null) {
        if (viewNode !== null) {
            Promise.all([
                googleFetcher.search(viewNode.title).then(searchResults => {
                    this.setState({ searchResults });
                }),

                googleFetcher.imageSearch(viewNode.title).then(imageResults => {
                    this.setState({ imageResults });
                }),
            ]);
        } else {
            this.setState({ imageResults: null, searchResults: null });
        }
    }

    public render() {
        const { nodes, edges } = this.state.graph;
        const selected = this.state.selected;
        const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

        return (
            <>
                <Sidebar
                    onFileUploaded={graph => this.setState({ graph })}
                    onDataRequested={() => this.state.graph}
                    onCustomIdeaClick={this.addStartNode}
                    onAutoClick={this.addRandomNode}
                    onConnectionClick={() => this.onCreateEdge(nodes[nodes.length - 1], nodes[0])}
                />
                <section id="graph">
                    <GraphView
                        nodeKey={NODE_KEY}
                        nodes={nodes}
                        edges={edges}
                        selected={selected}
                        nodeTypes={NodeTypes}
                        nodeSubtypes={NodeSubtypes}
                        edgeTypes={EdgeTypes}
                        onSelectNode={this.onSelectNode}
                        onCreateNode={this.onCreateNode}
                        onUpdateNode={this.onUpdateNode}
                        onDeleteNode={this.onDeleteNode}
                        onSelectEdge={this.onSelectEdge}
                        onCreateEdge={this.onCreateEdge}
                        onSwapEdge={this.onSwapEdge}
                        onDeleteEdge={this.onDeleteEdge}
                    />
                </section>
                <ResultsSidebar
                    searchResults={this.state.searchResults}
                    imageResults={this.state.imageResults}
                />
            </>
        );
    }
}

export default Graph;
