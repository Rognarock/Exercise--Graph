class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Adds a vertex (node) to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }


  addVertices(vertexArray) {
    // Add an array of verticies to our graph

    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }
  // Adds an edge between two vertices
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  // Removes an edge between two vertices
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  // Removes a vertex and updates adjacent nodes
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      for (let neighbor of vertex.adjacent) {
        neighbor.adjacent.delete(vertex);
      }
      this.nodes.delete(vertex);
    }
  }

    // Depth-first search (DFS) - returns array of values
    depthFirstSearch(start) {
      const visited = new Set();
      const result = [];
  
      function dfs(node) {
        if (!node) return;
        visited.add(node);
        result.push(node.value);
  
        node.adjacent.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            return dfs(neighbor);
          }
        });
      }
  
      dfs(start);
      return result;
    }

  depthFirstSearchIterative(start) {
    // Create an empty stack
    const stack = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // while there are still neighbors to visit
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex.value);

      // visit neighbors and push onto stack
      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // Breadth-first search (BFS) - returns array of values
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];
    let current;

    // visit node
    visited.add(start);

    // While there is still remaining vertices in queue
    while (queue.length) {
      current = queue.shift();
      result.push(current.value);

      // visit neighbors
      current.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

shortestPath(start, end) {
  if (start === end) {
    return [start.value];
  }

  var queue = [start];
  let visited = new Set();
  let predecessors = {};
  let path = [];

  while (queue.length) {
    let currentVertex = queue.shift();

    if (currentVertex === end) {
      let stop = predecessors[end.value];
      while (stop) {
        path.push(stop);
        stop = predecessors[stop];
      }
      path.unshift(start.value);
      path.reverse();
      return path;
    }

    visited.add(currentVertex);
    for (let vertex of currentVertex.adjacent) {
      if (!visited.has(vertex)) {
        predecessors[vertex.value] = currentVertex.value;
        queue.push(vertex);
      }
    }
  }
}
module.exports = { Graph, Node };
