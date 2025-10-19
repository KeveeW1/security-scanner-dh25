import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface CodeViewerProps {
  code: string;
  highlightLine: number | null;
  filename: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  highlightLine,
  filename,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const getLanguage = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      php: "php",
      rb: "ruby",
      go: "go",
      cpp: "cpp",
      c: "c",
      cs: "csharp",
      html: "html",
      css: "css",
      json: "json",
    };
    return languageMap[ext || ""] || "plaintext";
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current && highlightLine) {
      // Scroll to the highlighted line
      editorRef.current.revealLineInCenter(highlightLine);

      // Add decoration to highlight the line
      const decorations = editorRef.current.deltaDecorations(
        [],
        [
          {
            range: {
              startLineNumber: highlightLine,
              startColumn: 1,
              endLineNumber: highlightLine,
              endColumn: 1,
            },
            options: {
              isWholeLine: true,
              className: "highlighted-line",
              glyphMarginClassName: "highlighted-line-glyph",
            },
          },
        ]
      );

      return () => {
        if (editorRef.current) {
          editorRef.current.deltaDecorations(decorations, []);
        }
      };
    }
  }, [highlightLine]);

  return (
    <div className="relative">
      <style>{`
        .highlighted-line {
          background-color: rgba(239, 68, 68, 0.15) !important;
          border-left: 4px solid #ef4444 !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.3) !important;
        }
        .highlighted-line-glyph {
          background-color: #ef4444 !important;
          width: 4px !important;
          border-radius: 2px !important;
        }
        .monaco-editor {
          border-radius: 0 !important;
        }
        .monaco-editor .margin {
          background-color: #1f2937 !important;
        }
        .monaco-editor .monaco-editor-background {
          background-color: #111827 !important;
        }
      `}</style>
      <Editor
        height="600px"
        className="code-viewer-height"
        language={getLanguage(filename)}
        value={code}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          lineHeight: 22,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', monospace",
          renderLineHighlight: "line",
          cursorStyle: "line",
          wordWrap: "on",
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
        }}
      />
    </div>
  );
};

export default CodeViewer;
