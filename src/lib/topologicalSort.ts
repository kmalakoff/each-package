export type Node = string | number | symbol;
export type Graph<T extends Node> = {
  [key in T]: Array<T>;
};
export type Counter<T extends Node> = {
  [key in T]: number;
};
export interface GraphResult<T extends Node> {
  graph: Graph<T>;
  inDegree: Counter<T>;
}

export interface SortResult<T> {
  layers: Array<Array<T>>;
  cycles: Array<Array<T>>;
}

function buildGraph<T extends Node>(edges: Array<Array<T>>, nodes?: Array<T>): GraphResult<T> {
  const graph = {} as Graph<T>;
  const inDegree = {} as Counter<T>;

  // all nodes
  if (nodes)
    nodes.forEach((node) => {
      graph[node] = [];
      inDegree[node] = 0;
    });

  // all edges
  edges.forEach((edge) => {
    const from = edge[0];
    const to = edge[1];

    // initialize unseen
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    if (!inDegree[from]) inDegree[from] = 0;
    if (!inDegree[to]) inDegree[to] = 0;

    // add edge
    graph[from].push(to);
    inDegree[to]++;
  });

  return {
    graph: graph,
    inDegree: inDegree,
  };
}

function collectCycles<T extends Node>(graph: Graph<T>): Array<Array<T>> {
  const visited = {};
  const tempMark = {};
  const cycles = [];

  function visit(node, ancestors) {
    // found a cycle
    if (tempMark[node]) {
      cycles.push(ancestors.concat(node));
      return;
    }

    // visit only once
    if (visited[node]) return;
    visited[node] = true;

    // check for cycles from here
    tempMark[node] = true;
    graph[node].forEach((neighbor) => {
      visit(neighbor, ancestors.concat(node));
    });
    delete tempMark[node];
  }

  // check all nodes
  let nodes = Object.keys(graph);
  while (nodes.length > 0) {
    visit(nodes[0], []);

    // remove processed
    nodes = nodes.filter((node) => !visited[node]);
  }

  return cycles;
}

export default function topologicalSort<T extends Node>(edges: Array<Array<T>>, nodes?: Array<T>) {
  const layers = [];
  const graphData = buildGraph(edges, nodes);
  const graph = graphData.graph;
  const inDegree = graphData.inDegree;

  // find nodes with no incoming edges
  function findSources() {
    const sources = [];
    Object.keys(inDegree).forEach((node) => {
      if (inDegree[node] === 0) sources.push(node);
    });
    return sources;
  }

  // process the graph level by level
  let currentLevel = findSources();
  while (currentLevel.length > 0) {
    layers.push(currentLevel.slice());

    // track next level's nodes
    const nextLevel = [];
    const processed = {};

    // process all nodes in current level
    currentLevel.forEach((node) => {
      // remove the node
      inDegree[node] = -1;

      // reduce inDegree for all neighbors
      graph[node].forEach((neighbor) => {
        inDegree[neighbor]--;

        // If neighbor has no more dependencies and hasn't been processed
        if (inDegree[neighbor] === 0 && !processed[neighbor]) {
          nextLevel.push(neighbor);
          processed[neighbor] = true;
        }
      });
    });

    // Move to next level
    currentLevel = nextLevel;
  }

  // Check for cycles
  const hasCycles = Object.keys(inDegree).some((node) => inDegree[node] > 0);

  return {
    layers,
    cycles: hasCycles ? collectCycles(graph) : [],
  };
}
