import React from "react";

type RichTextNode = {
  type: string;
  level?: number;
  format?: string;
  indentLevel?: number;
  children: (RichTextNode | { text: string; bold?: boolean; type: string })[];
};

type Props = {
  content: RichTextNode[];
};

const LongDescriptionRenderer: React.FC<Props> = ({ content }) => {
  const renderNode = (node: RichTextNode, key: number): JSX.Element | null => {
    switch (node.type) {
      case "heading": {
        const level = node.level || 3;
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        const classMap: Record<number, string> = {
          1: "text-4xl font-bold my-4",
          2: "text-3xl font-semibold my-3",
          3: "text-2xl font-semibold my-2",
          4: "text-xl font-semibold my-2",
          5: "text-lg font-semibold my-1",
          6: "text-base font-medium my-1",
        };
        return (
          <Tag key={key} className={classMap[level]}>
            {node.children.map((child, i) =>
              typeof child === "object" && "text" in child ? (
                <span key={i}>{child.text}</span>
              ) : null
            )}
          </Tag>
        );
      }

      case "paragraph":
        return (
          <p key={key} className="my-2 text-gray-700">
            {node.children.map((child, i) =>
              typeof child === "object" && "text" in child ? (
                <span key={i} className={child.bold ? "font-bold" : ""}>
                  {child.text}
                </span>
              ) : null
            )}
          </p>
        );

      case "list":
        const isOrdered = node.format === "ordered";
        const ListTag = isOrdered ? "ol" : "ul";
        return (
          <ListTag
            key={key}
            className={`ml-6 my-2 ${
              isOrdered ? "list-decimal" : "list-disc"
            }`}
          >
            {node.children.map((child, i) =>
              typeof child === "object" && "type" in child
                ? renderNode(child as RichTextNode, i)
                : null
            )}
          </ListTag>
        );

      case "list-item":
        return (
          <li key={key} className="mb-1">
            {node.children.map((child, i) =>
              typeof child === "object" && "text" in child ? (
                <span key={i}>{child.text}</span>
              ) : typeof child === "object" ? (
                renderNode(child as RichTextNode, i)
              ) : null
            )}
          </li>
        );

      default:
        return null;
    }
  };

  return <div className="prose prose-sm max-w-none">{content.map(renderNode)}</div>;
};

export default LongDescriptionRenderer;
