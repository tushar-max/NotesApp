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
import SaveIcon from "@mui/icons-material/Save";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { Button, Snackbar } from "@mui/material";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

var res = "";

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

const getEmail = () => {
  return localStorage.getItem("jwt-email");
};

const handleUpdateDB = (props, email) => {
  if (res == "") {
    alert("Please make some changes to save.");
    return;
  }
  console.log("database", res);
  const data = {
    email: email ? email : getEmail(),
    description: res,
  };
  if (props === "") {
    const response = axios.post("http://localhost:3001/api", data);
    console.log("response", response);
  } else {
    const response = axios.put(`http://localhost:3001/api/${props}`, data);
    console.log("edited", response);
  }
};

const saveOnChange = (editor, setHtmlString) => {
  editor.update(() => {
    const htmlString = $generateHtmlFromNodes(editor, null);
    console.log("htmlString", htmlString);
    setHtmlString(htmlString);
    res = htmlString;
  });
};
function MyOnChangePlugin({ onChange, temp }) {
  const [firstRender, setFirstRender] = useState(true);
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState(temp);

  const handleOnChange = useCallback(
    (newEditorState) => {
      onChange(newEditorState);
    },
    [onChange]
  );

  useEffect(() => {
    if (firstRender) {
      editor.update(() => {
        setFirstRender(false);
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        console.log("nodes", nodes);
        $getRoot().select();
        $insertNodes(nodes);
      });
    }
  }, [editor, htmlString, firstRender]);

  useEffect(() => {
    if (!firstRender) {
      return editor.registerUpdateListener(({ editorState }) => {
        handleOnChange(editorState);
        saveOnChange(editor, setHtmlString);
      });
    }
  }, [editor, handleOnChange, firstRender]);

  return null;
}

export default function Editor(props) {
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = useState();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function onChange(editorState) {
    setEditorState(editorState);
  }

  const handleSaveButtonClick = () => {
    handleUpdateDB(props.id, props.email);
    handleClick();
    window.location.reload();
  };

  const handleShareButtonClick = () => {
    console.log("Share btn clicked!");
  };
  const handleDeleteButtonClick = () => {
    const response = axios.delete(`http://localhost:3001/api/${props.id}`);
    console.log("response", response);
    setOpen(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // window.location.reload();
  };

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
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <Button onClick={() => handleSaveButtonClick()}>
              <SaveIcon color="primary" />
            </Button>
            {localStorage.getItem("jwt-email")===props.email &&<>
            {props.email && (
              <Button onClick={() => handleDeleteButtonClick()} color="error">
                <DeleteIcon />
              </Button>
            )}</>}
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Synced"
            />
            <MyOnChangePlugin onChange={onChange} temp={props.description} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
