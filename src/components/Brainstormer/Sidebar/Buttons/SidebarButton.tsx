import * as React from 'react';
import { Icon } from '../../../Common';
import { ListGroupItem } from 'reactstrap';

import './SidebarButton.scss';

export default class SidebarButton extends React.PureComponent<SidebarButtonProps> {
    public render() {
        return (
            <ListGroupItem>
                <div className="SidebarButton clearfix">
                    <span>{this.props.children}</span>
                    <Icon
                        name="plus-circle"
                        size={2}
                        className="add-node pull-right"
                        onClick={this.props.onIconClick}
                    />
                </div>
            </ListGroupItem>
        );
    }
}

export interface SidebarButtonProps {
    onIconClick?: () => void;
}
