import React from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';
import styled from 'styled-components';
import { times, map, filter, some } from 'lodash';
import flow from 'lodash/fp/flow';
import { default as fpMap } from 'lodash/fp/map';
import { default as fpFlatten } from 'lodash/fp/flatten';
import { default as fpUniq } from 'lodash/fp/uniq';

const margin = 10;
const diameter = 20;
const radius = diameter / 2;

const COLOR_CUBIC = '#000';

const GraphWrapper = styled.div`
  height: 100%;
`;

export default class CubicsGruph extends React.Component {
  componentDidMount() {
    if (this.props.data.length) {
      this.createGraph.call(this, this.props.data);
    }
  }

  componentDidUpdate() {
    if (this.props.data.length) {
      this.createGraph.call(this, this.props.data);
    }
  }

  createGraph(data) {
    const svgWidth = this.wrapper.clientWidth;
    const svgHeight = this.wrapper.clientHeight;

    const sourceArray = data;
    const links = map(sourceArray, (val) =>
      ({
        source: val,
        target: val === sourceArray.length - 1
          ? 0
          : val + 1
      }));
    const parentCubics = flow(
      fpMap(({ parents }) => parents),
      fpFlatten,
      fpMap(({ name }) => name),
      fpUniq,
    )(data);

    d3.select(this.node)
      .selectAll('*')
      .remove();

    const svg = d3.select(this.node)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
      //.force("collide", d3.forceCollide().radius(radius * 4))

    // todo parents cubics text
    svg.append('g')
      .selectAll('g')
      .data(parentCubics || [])
      .enter()
      .append('g')
      .append('text')
      .attr('dx', 12)
      .attr('dy', (d, i) => (i + 1) * 18)
      .text(d => d)
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .style('fill', '#dc241f');

    const cubics = svg.append('g').selectAll('g')
      .data(sourceArray)
      .enter()
      .append('g');

    cubics
      .append('circle')
      .attr('r', radius)
      .style('fill', COLOR_CUBIC)
      .attr('class', 'cubic')
      .attr('data-id', ({ id }) => id)
      .attr('data-has-children', ({ children }) => children.length);

    cubics
      .append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => `${d.name} (${d.children.length})`)
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .style('fill', '#dc241f');

    simulation.nodes(sourceArray).on('tick', () => {
      cubics.attr('transform', (d) => {
        const x = condition(d.x, diameter, svgWidth);
        const y = condition(d.y, diameter, svgHeight);
        return "translate(" + x + "," + y + ")";

        function condition (val, size, max, min = 0) {
          return val >= (max - margin)
            ? max - size - margin
            : val <= min + (size / 2) + margin
              ? (size / 2) + margin
              : val;
        }
      });
    })
  }

  static clickMe (history, e) {
    const target = e.target;
    if (target.classList.contains('cubic')) {
      const hasChildren = target.dataset.hasChildren !== '0';
      hasChildren && history.push(`?parents=${target.dataset.id}`);
    }
  }

  render () {
    const Graph = withRouter(({ history }) => (
      <GraphWrapper
        innerRef={ node => this.wrapper = node }
        onClick={this.constructor.clickMe.bind(this, history)}
      >
        <svg ref={ node => this.node = node }></svg>
      </GraphWrapper>
    ));
    return (
      <Graph />
    );
  }
}