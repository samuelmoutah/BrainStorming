import {
    SPECIAL_EDGE_TYPE,
    EMPTY_EDGE_TYPE,
    SPECIAL_TYPE,
    SPECIAL_CHILD_SUBTYPE,
    EMPTY_TYPE,
    SKINNY_TYPE,
    POLY_TYPE,
} from './graph-config';
import { INode, IEdge } from 'react-digraph';
import sampleGraph from './sampleGraph.json';
export type IGraph = {
    nodes: INode[];
    edges: IEdge[];
};

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.

export default sampleGraph as IGraph;
