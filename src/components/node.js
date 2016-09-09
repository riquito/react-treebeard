'use strict';

import React from 'react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);

        this.onToggle = this.onToggle.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let onClick = this.props.onClick;
        if(onClick){onClick(this.props.node);}
    }
    onToggle(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){onToggle(this.props.node, toggled);}
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const cssClasses = 'treebeard-treenode ' + (this.props.node.toggled ? 'open' : 'closed');
        return (
            <li ref="topLevel" className={cssClasses}>
                {this.renderHeader(decorators)}
                {this.renderDrawer(decorators)}
            </li>
        );
    }
    renderDrawer(decorators){
        const toggled = this.props.node.toggled;
        if (toggled) {
            return this.renderChildren(decorators);
        }
    }
    renderHeader(decorators){
        return (
            <NodeHeader
                decorators={decorators}
                node={Object.assign({}, this.props.node)}
                onClick={this.onClick}
                onToggle={this.onToggle}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){return this.renderLoading(decorators);}
        return (
            <ul ref="subtree" className="treebeard-drawer">
                {(this.props.node.children || []).map((child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id || index}
                        node={child}
                        decorators={this.props.decorators}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul className="treebeard-loading-container">
                <li>
                    <decorators.Loading />
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return {
            onClick: this.props.onClick,
            onToggle: this.props.onToggle
        };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func,
    onClick: React.PropTypes.func
};

export default TreeNode;
