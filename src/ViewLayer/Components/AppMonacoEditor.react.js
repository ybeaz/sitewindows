import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';
//import { Button } from 'semantic-ui-react';
//import MonacoEditor from 'react-monaco-editor';

const MonacoEditor = () => { return (<div></div>) }

class AppMonacoEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    } 
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  
  handleClick = () => {return;}
  
  
  content = () => {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (<MonacoEditor />);

  /*
    <MonacoEditor height='400' language='json'
      theme='vs-dark' value={JSON.stringify('[{'a':'abc'}]')}>
      options={monaco.options}
      requireConfig={monaco.config}
      className='monaco-editor' />
    
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        value={code}
        options={options}
        onChange={::this.onChange}
        editorDidMount={::this.editorDidMount}
      />
    </div>    
    
    
  */
  }
  
  render() {
    //console.info('AppMonacoEditor->render()',{props:this.props});
    return (
      <div contentEditable={true} className='w_inh h_100 p_a_0p5_em'>{this.content()}</div>
    );
  }
}

AppMonacoEditor.propTypes = {
};

export default CommonContainer(AppMonacoEditor)

