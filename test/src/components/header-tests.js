/*  eslint no-unused-expressions:0  */

'use strict';

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Header = require('../../../src/components/header').default;
const factory = require('../utils/factory');

const ContainerType = React.createClass({ render: () => <div/> });

const defaults = {
    node: { children: [] },
    decorators: factory.createDecorators({ container: ContainerType })
};

describe('header component', () => {
    it('should render the container decorator', () => {
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.should.exist;
    });

    it('should update the component if a prop changes', () => {
        const node = { toggled: false };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const nextProps = { node: { toggled: !node.toggled } };
        header.shouldComponentUpdate(nextProps).should.be.true;
    });

    it('should not update the component if no props change', () => {
        const node = { toggled: false };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const nextProps = Object.assign({}, defaults, { node: { toggled: node.toggled } });
        header.shouldComponentUpdate(nextProps).should.be.false;
    });

    it('should pass a true terminal prop to the container when there are no children in the node', () => {
        const node = { name: 'terminal-node' };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.terminal.should.be.true;
    });

    it('should pass a false terminal prop to the container when there are children in the node', () => {
        const node = { children: [{ name: 'child-node'}] };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.terminal.should.be.false;
    });
});
