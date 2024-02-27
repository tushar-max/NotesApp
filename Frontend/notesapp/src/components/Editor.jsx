// import ExampleTheme from "./../themes/ExampleTheme";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./../plugins/TreeViewPlugin";
// import ToolbarPlugin from "./../plugins/ToolbarPlugin";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
// import { ListItemNode, ListNode } from "@lexical/list";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import { TRANSFORMERS } from "@lexical/markdown";

// import ListMaxIndentLevelPlugin from "./../plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./../plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./../plugins/AutoLinkPlugin";
// import "./Editor.css";
// import { useEffect, useRef, useState } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { $generateHtmlFromNodes } from '@lexical/html';


// function Placeholder() {
//   return <div className="editor-placeholder">Enter some rich text...</div>;
// }

// const editorConfig = {
//   // The editor theme
//   theme: ExampleTheme,
//   // Handling of errors during update
//   onError(error) {
//     throw error;
//   },
//   // Any custom nodes go here
//   nodes: [
//     HeadingNode,
//     ListNode,
//     ListItemNode,
//     QuoteNode,
//     CodeNode,
//     CodeHighlightNode,
//     TableNode,
//     TableCellNode,
//     TableRowNode,
//     AutoLinkNode,
//     LinkNode,
//   ],
// };

// const saveOnChange = (editor) => {
//   editor.update(() => {
//     const htmlString = $generateHtmlFromNodes(editor, null);
//     console.log('htmlString', htmlString);
//   });
// };

// function MyOnChangePlugin({ onChange }) {
//     const [editor] = useLexicalComposerContext();
//     saveOnChange(editor)
//     useEffect(() => {
//       return editor.registerUpdateListener(({editorState}) => {
//         onChange(editorState);
//       });
//     }, [editor, onChange]);
//     return null;
//   }

// export default function Editor() {
// //   const editorStateRef = useRef();
//   const [editorState, setEditorState] = useState();
//   function onChange(editorState) {
//     setEditorState(editorState);
//   }
//   return (
//     <>
//       <LexicalComposer initialConfig={editorConfig}>
//         <div className="editor-container">
//           <ToolbarPlugin />
//           <div className="editor-inner">
//             <RichTextPlugin
//               contentEditable={<ContentEditable className="editor-input" />}
//               placeholder={<Placeholder />}
//               ErrorBoundary={LexicalErrorBoundary}
//             />
//             <HistoryPlugin />
//             <TreeViewPlugin />
//             <AutoFocusPlugin />
//             <CodeHighlightPlugin />
//             <ListPlugin />
//             <LinkPlugin />
//             <AutoLinkPlugin />
//             <ListMaxIndentLevelPlugin maxDepth={7} />
//             <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
//             <MyOnChangePlugin onChange={onChange}/>
//           </div>
//         </div>
//       </LexicalComposer>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import ExampleTheme from "./../themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./../plugins/TreeViewPlugin";
import ToolbarPlugin from "./../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./../plugins/AutoLinkPlugin";
import "./Editor.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from '@lexical/html';

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

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    saveOnChange(editor, setHtmlString);
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

export default function Editor() {
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
            <MyOnChangePlugin onChange={onChange}/>
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
