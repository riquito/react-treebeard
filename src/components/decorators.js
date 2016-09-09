'use strict';

import React from 'react';

const Loading = () => {
    return (
        <div className="treebeard-loading">
            loading...
        </div>
    );
};

const Toggle = (props) => {
    const height = 14;
    const width = 14;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div className="treebeard-toggle" onClick={props.onClick}>
            <svg height={height} width={width}>
                <polygon
                    points={points}
                />
            </svg>
        </div>
    );
};

Toggle.propTypes = {
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

const Header = (props) => {
    let classes = ['treebeard-header'];
    if (props.node.active) {
        classes.push('treebeard-active');
    }
    return (
        <div className={classes.join(' ')} onClick={props.onClick}>
            {props.node.name}
        </div>
    );
};

Header.propTypes = {
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

class Container extends React.Component {
    render(){
        let {decorators, terminal, onClick, node} = this.props;

        return (
            <div
                ref="clickable"
                className="treebeard-container"
            >
                { !terminal ? this.renderToggleDecorator() : null }
                <decorators.Header
                    node={node}
                    onClick={onClick}
                />
            </div>
        );
    }
    renderToggleDecorator(){
        const {decorators} = this.props;
        return (<decorators.Toggle onClick={this.props.onToggle} node={this.props.node} />);
    }
}

Container.propTypes = {
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    node: React.PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container
};
