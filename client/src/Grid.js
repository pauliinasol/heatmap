import React, { Component } from "react";
import colormap from "colormap";
import Hex, { gridPoints } from "react-hex";

const N_SHADES = 40;

let colors = colormap({
  colormap: "jet",
  nshades: N_SHADES,
  format: "hex",
  alpha: 1
});

class DrawHex extends Component {
  render() {
    const { type, x, y, size, value } = this.props;
    const colorIndex = Math.floor(value * N_SHADES);
    return (
      <Hex type={type} x={x} y={y} size={size} fill={colors[colorIndex]} />
    );
  }
}

class Grid extends React.Component {
  render() {
    const { users } = this.props;
    if (!users) {
      return null;
    }
    const type = "pointy-topped";
    const size = 5;
    const oX = 100;
    const oY = 100;
    // TODO Will brake if data size changes, now it works as 101*114 = 11514
    const width = 40;
    const height = 400;
    // TODO implement org based split
    const Hexes = gridPoints(type, oX, oY, size, width, height).map(
      ({ props, gridX, gridY }, index) => {
        if (index >= users.length) {
          return null;
        }
        return (
          <DrawHex
            key={`${gridX}-${gridY}`}
            {...props}
            value={users[index].failureRate}
          />
        );
      }
    );

    return (
      <div id="Grid">
        <svg width="1500" height="1000">
          {Hexes}
        </svg>
      </div>
    );
  }
}

export default Grid;
