/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const defaultDecorators = require('../../../src/components/decorators').default;
const factory = require('../utils/factory');

const defaults = {
    node: { children: [] },
    terminal: false,
    decorators: factory.createDecorators(),
    onClick: function(){}
};

const Container = defaultDecorators.Container;

describe('container decorator component', () => {
    it('should render the toggle decorator not terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                terminal={false}
            />
        );
        const toggle = TestUtils.findRenderedComponentWithType(container, toggleType);
        toggle.should.exist;
    });

    it('should not render the toggle decorator if the node is terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                terminal={true}
            />
        );
        const toggle = TestUtils.scryRenderedComponentsWithType(container, toggleType);
        toggle.should.be.empty;
    });

    it('should render the header decorator', () => {
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(container, headType);
        head.should.exist;
    });

    it('should pass the node to the header decorator', () => {
        const node = { name: 'terminal-node' };
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                node={node}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(container, headType);
        head.props.node.should.equal(node);
    });
});
