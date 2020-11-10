import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import * as serviceWorker from "./serviceWorker";
import marked from "marked";
// *********
const defaultEditor = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
const defaultPreview = marked(defaultEditor);
marked.setOptions({
  breaks: true,
});
class Editor extends React.Component {
  render() {
    return (
      <textarea
        id="editor"
        onChange={this.props.handleInput}
        defaultValue={this.props.editorText}
      ></textarea>
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: this.props.markedText }}
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: defaultEditor,
      markedText: defaultPreview,
      verticalLayout: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleLayoutClick = this.handleLayoutClick.bind(this);
  }

  handleInput(e) {
    this.setState({
      editorText: e.target.value,
      markedText: marked(e.target.value),
    });
  }

  handleLayoutClick() {
    this.setState({ verticalLayout: !this.state.verticalLayout });
  }

  render() {
    const classes = this.state.verticalLayout
      ? ["vertical-layout", "fas fa-grip-horizontal"]
      : ["horizontal-layout", "fas fa-grip-vertical"];
    return (
      <div id="layout" className={classes[0]}>
        <div className="header side">
          <i className="far fa-edit"></i>
          <span>Editor</span>
          <i
            id="layout-changer"
            className={classes[1]}
            onClick={this.handleLayoutClick}
          ></i>
        </div>
        <Editor
          editorText={this.state.editorText}
          handleInput={this.handleInput}
        />
        <div className="header content">
          <i className="fab fa-markdown"></i>
          <span>Preview</span>
        </div>
        <Preview markedText={this.state.markedText} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
// **************
serviceWorker.unregister();
