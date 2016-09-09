'use strict';

import React from 'react';
import shallowEqual from 'shallowequal';

class NodeHeader extends React.Component {
    shouldComponentUpdate(nextProps){
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);
        for(let i = 0; i < nextPropKeys.length; i++){
            const key = nextPropKeys[i];
            const isEqual = shallowEqual(props[key], nextProps[key]);
            if(!isEqual){ return true; }
        }
        return false;
    }
    render(){
        const {decorators} = this.props;
        const terminal = !this.props.node.children;
        return (
            <decorators.Container
                decorators={decorators}
                terminal={terminal}
                onClick={this.props.onClick}
                onToggle={this.props.onToggle}
                node={this.props.node}
            />
        );
    }
}

NodeHeader.propTypes = {
    decorators: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func
};

export default NodeHeader;
