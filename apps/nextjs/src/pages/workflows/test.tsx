import { useCallback } from "react";
import ReactFlow, {
  Connection,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/base.css";
import CustomNode from "~/components/workflow/CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      name: "Come up with content ideas for our AI healthcare product's blog",
      job: "Content strategist agent",
      emoji: "😎",
    },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      name: "Write an outline for each of the ideas",
      job: "Copywriting agent",
      emoji: "✍️",
    },

    position: { x: 0, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: {
      name: "Turn each outline into a blog post",
      job: "Copywriting agent",
      emoji: "✍️",
    },
    position: { x: 0, y: 350 },
  },
  {
    id: "4",
    type: "custom",
    data: {
      name: "Turn each blog post into a TikTok video script",
      job: "TikTok producer agent",
      emoji: "🎥",
    },
    position: { x: -450, y: 500 },
  },
  {
    id: "5",
    type: "custom",
    data: {
      name: "Turn each blog post into a YouTube video script",
      job: "YouTube producer agent",
      emoji: "🎥",
    },
    position: { x: 0, y: 500 },
  },
  {
    id: "6",
    type: "custom",
    data: {
      name: "Turn each blog post into a tweet thread",
      job: "Twitter expert agent",
      emoji: "🎥",
    },
    position: { x: 450, y: 500 },
  },
];

const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "2",
    target: "3",
  },
  {
    id: "e1-4",
    source: "3",
    target: "4",
  },
  {
    id: "e1-5",
    source: "3",
    target: "5",
  },
  {
    id: "e1-6",
    source: "3",
    target: "6",
  },
];

const Flow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
