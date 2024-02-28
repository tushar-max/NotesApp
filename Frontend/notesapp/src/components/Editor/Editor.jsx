import React, { useState, useEffect, useCallback } from "react";
import ExampleTheme from "../../themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "../../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../../plugins/AutoLinkPlugin";
import "./Editor.css";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical'

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const saveOnChange = (editor, setHtmlString) => {
  editor.update(() => {
    const htmlString = $generateHtmlFromNodes(editor, null);
    console.log('htmlString', htmlString);
    setHtmlString(htmlString);
  });
};
function MyOnChangePlugin({ onChange,temp }) {
  const [firstRender, setFirstRender] = useState(true);
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState(temp);

  const handleOnChange = useCallback((newEditorState) => {
    onChange(newEditorState);
  }, [onChange]);

  useEffect(() => {
    saveOnChange(editor, setHtmlString);
    if (firstRender) {
      editor.update(() => {
        setFirstRender(false);
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
      
        const nodes = $generateNodesFromDOM(editor, dom);
        console.log("nodes",nodes);
        $getRoot().select();
      
        $insertNodes(nodes);
      });
    }
    return editor.registerUpdateListener(({editorState}) => {
      handleOnChange(editorState);
    });
  }, [editor, handleOnChange, htmlString, firstRender]);

  return null; // Render nothing directly from this component
}

export default function Editor(props) {
  const [editorState, setEditorState] = useState();

  function onChange(editorState) {
    setEditorState(editorState);
  }

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            {/* <TreeViewPlugin /> */}
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <MyOnChangePlugin onChange={onChange} temp={props}/>
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
