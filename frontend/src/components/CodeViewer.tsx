import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface CodeViewerProps {
  code: string;
  highlightLine: number | null;
  filename: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, highlightLine, filename }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'html': 'html',
      'css': 'css',
      'json': 'json',
    };
    return languageMap[ext || ''] || 'plaintext';
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
              className: 'highlighted-line',
              glyphMarginClassName: 'highlighted-line-glyph',
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
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <style>{`
        .highlighted-line {
          background-color: rgba(255, 0, 0, 0.1);
          border-left: 3px solid #ef4444;
        }
        .highlighted-line-glyph {
          background-color: #ef4444;
          width: 3px !important;
        }
      `}</style>
      <Editor
        height="500px"
        language={getLanguage(filename)}
        value={code}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 13,
          lineNumbers: 'on',
          glyphMargin: true,
          folding: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeViewer;
