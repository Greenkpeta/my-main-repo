import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify"; // Prevents XSS vulnerabilities
import "./App.css";

marked.setOptions({
  breaks: true, // Ensures line breaks work
});

function App() {
  const [text, setText] = useState(`# Markdown Previewer
## This is a sub-heading
[Link](https://www.freecodecamp.org)
\inline code\

\\\`
code block
\\\`

- List item
> Blockquote
![Image](https://picsum.photos/150)
*Bold text*
  `);

  return (
    <div className="container">
      <h1>Markdown Previewer</h1>
      <textarea
        id="editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(text)) }}
      />
    </div>
  );
}

export default App;