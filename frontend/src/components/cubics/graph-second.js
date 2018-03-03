import React from 'react';
import * as d3 from 'd3';

export default class CubicsGruph extends React.Component {
  constructor (props) {
    super(props);
    this.createElement = this.createElement.bind(this);
    this.createGraph = this.createGraph.bind(this)
  }

  componentDidMount () {
    if (!this.svg) {
      this.createElement();
    }
    this.createGraph();
  }

  componentDidUpdate () {
    this.createGraph();
  }

  createElement () {

    this.dm = {
      width: 800,
      height: 600,
      m: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    };

    // create an svg to draw in
    this.svg = d3.select(this.node)
      .append("svg")
      .attr("width", this.dm.width)
      .attr("height", this.dm.height)
      .append('g')
      .attr('transform', 'translate(' + this.dm.m.top + ',' + this.dm.m.left + ')');

    this.dm.width = this.dm.width - this.dm.m.left - this.dm.m.right;
    this.dm.height = this.dm.height - this.dm.m.top - this.dm.m.bottom;
  }

  createGraph () {
    const that = this;
    const data = this.props.data;
    if (!data || data.length === 0) {
      return;
    }

    var thisOpacity;
    var simulation = d3.forceSimulation()
      // pull nodes together based on the links between them
      .force("link", d3.forceLink().id(d => d.id).strength(1)) // last 0.025
      // push nodes apart to space them out
      .force("charge", d3.forceManyBody().strength(-200))
      // add some collision detection so they don't overlap
      .force("collide", d3.forceCollide().radius(12))
      // and draw them around the centre of the space
      .force("center", d3.forceCenter(this.dm.width / 2, this.dm.height / 2));

    // load the graph
    // set the nodes
    var nodes = data.nodes;
    // links between nodes
    var links = data.links;

    // add the curved links to our graphic
    var link = this.svg.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr('stroke', () => '#ddd');

    // add the nodes to the graphic
    var node = this.svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g");

    // a circle to represent the node
    node.append("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr('fill', d => (d.colour || '#dc241f'))
      .on("mouseover", mouseOver(.2))
      .on("mouseout", mouseOut);

    // hover text for the node
    node.append("title")
      .text(d => (d.twitter || 'Do not know'));

    // add a label to each node
    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.id)
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .style('fill', d => (d.colour || '#dc241f'));

    // add the nodes to the simulation and
    // tell it what to do on each tick
    simulation
      .nodes(nodes)
      .on("tick", ticked);

    // add the links to the simulation
    simulation
      .force("link")
      .links(links);

    // on each tick, update node and link positions
    function ticked() {
      link.attr("d", positionLink);
      node.attr("transform", positionNode);
    }

    // links are drawn as curved paths between nodes,
    // through the intermediate nodes
    function positionLink(d) {
      const offset = 5;

      const midpoint_x = (d.source.x + d.target.x) / 2;
      const midpoint_y = (d.source.y + d.target.y) / 2;

      const dx = (d.target.x - d.source.x);
      const dy = (d.target.y - d.source.y);

      const normalise = Math.sqrt((dx * dx) + (dy * dy));

      const offSetX = midpoint_x + offset*(dy/normalise);
      const offSetY = midpoint_y - offset*(dx/normalise);

      return "M" + d.source.x + "," + d.source.y +
        "S" + offSetX + "," + offSetY +
        " " + d.target.x + "," + d.target.y;
    }

    // move the node based on forces calculations
    function positionNode(d) {
      // keep the node within the boundaries of the svg
      if (d.x < 0) {
        d.x = 0
      };
      if (d.y < 0) {
        d.y = 0
      };
      if (d.x > that.dm.width) {
        d.x = that.dm.width
      };
      if (d.y > that.dm.height) {
        d.y = that.dm.height
      };
      return "translate(" + d.x + "," + d.y + ")";
    }

    // build a dictionary of nodes that are linked
    var linkedByIndex = {};
    links.forEach(function(d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // check the dictionary to see if nodes are linked
    function isConnected(a, b) {
      return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

    // fade nodes on hover
    function mouseOver(opacity) {
      return function(d) {
        // check all other nodes to see if they're connected
        // to this one. if so, keep the opacity at 1, otherwise
        // fade
        node.style("stroke-opacity", function(o) {
          thisOpacity = isConnected(d, o) ? 1 : opacity;
          return thisOpacity;
        });
        node.style("fill-opacity", function(o) {
          thisOpacity = isConnected(d, o) ? 1 : opacity;
          return thisOpacity;
        });
        // also style link accordingly
        link.style("stroke-opacity", function(o) {
          return o.source === d || o.target === d ? 1 : opacity;
        });
        link.style("stroke", function(o){
          return o.source === d || o.target === d ? o.source.colour : "#ddd";
        });
      };
    }

    function mouseOut() {
      node.style("stroke-opacity", 1);
      node.style("fill-opacity", 1);
      link.style("stroke-opacity", 1);
      link.style("stroke", "#ddd");
    }
  }

  render () {

    return (
      <div>
        <h2>Second Graph</h2>
        <div ref={node => this.node = node}></div>
      </div>
    );
  }
}
