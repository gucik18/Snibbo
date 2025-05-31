import React, { useRef, useState } from 'react'
import { Box, HStack } from "@chakra-ui/react";
import {Editor} from "@monaco-editor/react"
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';

const CodeEditor = () => {
  let [value, setValue] = useState("");
  let [language, setLanguage] = useState("javascript");
  let editorRef = useRef();

  let Mount = (editor)=>{
    editorRef.current = editor;
    editor.focus();
  }

  let onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language])
  }

  return (
    <>
      <Box>
        <HStack spacing={4}>
          <Box w="50%">
              <LanguageSelector language={language} onSelect={onSelect} />
              <Editor height="75vh" theme='vs-dark' language={language} value={value} onChange={(value)=> setValue(value)} onMount={Mount} defaultValue={CODE_SNIPPETS[language]} />
          </Box>
          <Output editorRef={editorRef} language={language} />
        </HStack>
      </Box>
    </>
  )
}

export default CodeEditor