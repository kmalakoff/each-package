/**
 * Implements topological sort for a directed acyclic graph (DAG)
 * @param {Array} edges - Array of [from, to] pairs representing directed edges
 * @returns {Array} A topologically sorted array of nodes, or null if a cycle is detected
 */
export default function topologicalSort(edges) {
  // Build adjacency list and collect unique nodes
  const graph = {};
  const nodes = {};

  edges.forEach((edge) => {
    const from = edge[0];
    const to = edge[1];

    // Add nodes to set
    nodes[from] = true;
    nodes[to] = true;

    // Build adjacency list
    if (!graph[from]) {
      graph[from] = [];
    }
    graph[from].push(to);
  });

  // Ensure all nodes have entries in graph, even if they have no outgoing edges
  Object.keys(nodes).forEach((node) => {
    if (!graph[node]) {
      graph[node] = [];
    }
  });

  const nodeList = Object.keys(nodes);
  const inDegree = {};
  const queue = [];
  const result = [];

  // Initialize in-degree for all nodes to 0
  nodeList.forEach((node) => {
    inDegree[node] = 0;
  });

  // Calculate in-degree for each node
  edges.forEach((edge) => {
    const to = edge[1];
    inDegree[to]++;
  });

  // Add all nodes with in-degree 0 to the queue
  nodeList.forEach((node) => {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  });

  // Process the queue
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    // Reduce in-degree of all neighbors
    if (graph[node]) {
      graph[node].forEach((neighbor) => {
        inDegree[neighbor]--;

        // If in-degree becomes 0, add to queue
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }
  }

  // If result length doesn't match number of nodes, there's a cycle
  if (result.length !== nodeList.length) {
    return null;
  }

  return result;
}
