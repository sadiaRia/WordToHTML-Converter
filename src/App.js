import React, { Component } from 'react';
import mammoth from 'mammoth';
// import async from 'async';
class App extends Component {
  state = {
    html: '',
    ishtmlGenerate: false,
    arrayBuffer: []
  }

  parseWordDocxFile = (event) => {
    console.log(event.target.files[0]);
    var files = event.target.files || [];
    if (!files.length) return;
    var file = files[0];

    console.time();
    var reader = new FileReader();
    reader.onloadend = (event) => {
      var arrayBuffer = reader.result;
      // debugger
      let result1 = {};
      let result2 = {};
      let result3 = {};
      this.setState({ ishtmlGenerate: true, arrayBuffer: arrayBuffer });
      // mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //   result1.innerHTML = resultObject.value;
        // console.log(resultObject.value)
      // })
      // console.timeEnd();

      // mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //   result2.innerHTML = resultObject.value
      //   console.log(resultObject.value)
      // })

      //   mammoth.convertToMarkdown({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //     result3.innerHTML = resultObject.value
      //     console.log(resultObject.value)
      //   })
    };
    reader.readAsArrayBuffer(file);
  }

  _getFormatedHtml = () => {
    let result1 = { innerHTML: '' };
    mammoth.convertToHtml({ arrayBuffer: this.state.arrayBuffer }).then((resultObject) => {
      result1.innerHTML = resultObject.value;
      console.log(result1.innerHTML)
      this.setState({ html: result1.innerHTML.toString() })
    })
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.parseWordDocxFile} />
        <div>
        <button onClick={() => this._getFormatedHtml()}>Generate Html</button>
        </div>
        <div>
          {this.state.html && <div dangerouslySetInnerHTML={{ __html: this.state.html }} />}
        </div>
      </div>
    );
  }
}

export default App;


