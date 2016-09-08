'use strict';

import React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);

        this.style = Object.assign({}, {
            base: {},
            link: {},
            activeLink: {},
            toggle: {},
            header: {},
            subtree: {},
            loading: {}
        }, this.props.style);

        this.onToggle = this.onToggle.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let onClick = this.props.onClick;
        if(onClick){ onClick(this.props.node); }
    }
    onToggle(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    animations(){
        const props = this.props;
        if(props.animations === false){ return false; }
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        const cssClasses = 'treebeard-treenode ' + (this.props.node.toggled ? 'open' : 'closed');
        return (
            <li style={this.style.base} ref="topLevel" className={cssClasses}>
                {this.renderHeader(decorators, animations)}
                {this.renderDrawer(decorators, animations)}
            </li>
        );
    }
    renderDrawer(decorators, animations){
        const toggled = this.props.node.toggled;
        if(!animations && !toggled){ return null; }
        if(!animations && toggled){
            return this.renderChildren(decorators, animations);
        }
        return (
            <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                style={this.style.header}
                node={Object.assign({}, this.props.node)}
                onClick={this.onClick}
                onToggle={this.onToggle}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){ return this.renderLoading(decorators); }
        return (
            <ul style={this.style.subtree} ref="subtree" className="treebeard-drawer">
                {(this.props.node.children || []).map( (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id || index}
                        node={child}
                        decorators={this.props.decorators}
                        animations={this.props.animations}
                        style={this.style}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.style.subtree} className="treebeard-loading-container">
                <li>
                    <decorators.Loading style={this.style.loading}/>
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
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    onToggle: React.PropTypes.func,
    onClick: React.PropTypes.func
};

export default TreeNode;
