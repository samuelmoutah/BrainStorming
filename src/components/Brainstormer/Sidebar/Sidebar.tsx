import * as React from 'react';
import SidebarButton from './Buttons/SidebarButton';
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import './Sidebar.scss';
import { FormGroup, Label, Input, FormText, Form } from 'reactstrap';
import InputGroup from 'reactstrap/lib/InputGroup';
import { IGraph } from '../defaultGraphState';
import { read } from 'fs';

export default function Sidebar(props: SidebarProps) {
    const downloadRef = React.useRef<HTMLAnchorElement>(null);
    const handleDownloadRequest = React.useCallback(
        () => {
            const anchor = downloadRef.current;
            if (anchor) {
                const data: string = JSON.stringify(props.onDataRequested(), null, 2);

                const blob = new Blob([data], { type: 'text/json' });
                const url = URL.createObjectURL(blob);

                anchor.setAttribute('href', url);
                anchor.click();
            }
        },
        [props.onDataRequested]
    );

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleUpload = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const input = inputRef.current;
        if (input && input.files) {
            const file = input.files.item(0);
            if (file) {
                const blob = file.slice();
                const reader = new FileReader();
                reader.addEventListener('loadend', e => {
                    const data: string = (e.srcElement! as any).result;
                    const graph: IGraph = JSON.parse(data);

                    props.onFileUploaded(graph);
                });

                reader.readAsText(blob);
            }
        }
    }, []);

    return (
        <section className="side-bar">
            <ListGroup>
                <SidebarButton onIconClick={props.onCustomIdeaClick}>Add Custom idea</SidebarButton>
                <SidebarButton onIconClick={props.onAutoClick}>Add Auto-generated idea</SidebarButton>
                <SidebarButton onIconClick={props.onConnectionClick}>Add Connection</SidebarButton>
            </ListGroup>
            <ListGroupItem>
                <Form onSubmit={handleUpload}>
                    <FormGroup>
                        <Label for="exampleFile" alignment="center">
                            Upload Project File
                        </Label>
                        <input ref={inputRef} type="file" name="file" id="exampleFile" accept=".bst" />
                        <FormText color="muted">
                            Already got a brainstorm going? Upload it here to continue working!
                        </FormText>
                    </FormGroup>

                    <ButtonGroup>
                        <Button type="submit">Load</Button>
                        <Button onClick={handleDownloadRequest}>Save File</Button>
                    </ButtonGroup>
                </Form>
            </ListGroupItem>
            <a ref={downloadRef} style={{ display: 'none' }} hidden download="my-graph.bst" />
        </section>
    );
}

export interface SidebarProps {
    onCustomIdeaClick(): void;
    onAutoClick(): void;
    onConnectionClick(): void;
    onDataRequested(): IGraph;
    onFileUploaded(graph: IGraph): void;
}
