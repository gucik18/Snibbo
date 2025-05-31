import React, { useState } from 'react'
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { executeCode } from '../api';

const Output = ({editorRef, language}) => {

  let toast = useToast();
  let [output,setOutput] = useState(null);
  let [loading,setLoading] = useState(false);
  let [error, setError] = useState(false);

  let getFileExtension = (language) => {
    switch (language){
      case "javascript":
        return ".js";
      case "typescript":
        return ".ts";
      case "python":
        return ".py";
      case "java":
        return ".java";
      case "csharp":
        return ".cs";
      case "php":
        return ".php";
    }
  }

  let runCode = async ()=> {
    let sourceCode = editorRef.current.getValue();
    if(!sourceCode) return;
    try {
        setLoading(true);
        let {run:result} = await executeCode(sourceCode, language);
        setOutput(result.output.split("\n"));
        result.stderr ? setError(true) : setError(false);
    } catch (error) {
      toast({
        title: "An error occured",
        description: error.message || "Unable to run code",
        status:"error",
        duration: 4000
      })
    } finally{
        setLoading(false);
    }
  }

  let handleDownload = () => {
    let sourceCode = editorRef.current.getValue();
    if(!sourceCode) return;

     const cleanedCode = sourceCode.replace(/^\uFEFF/, "");

    let fileExtension = getFileExtension(language);

    let blob = new Blob([cleanedCode], {type:"text/plain"});
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = `code${fileExtension}`;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Box w="50%">
        <Text mb={2} fontSize="lg">Output</Text>
        <Button variant="outline" colorScheme="green" mb={4} onClick={runCode} isLoading={loading}>Run Code</Button>

        <Button variant="outline" colorScheme="blue" ml={3} mb={4} onClick={handleDownload}>Download</Button>
         
        <Box overflowY="auto" height="75vh" p={2}  color={error ? "red.400" : ""} border="1px solid" borderRadius={4} borderColor={error ? "red.500" : "#333"} >
            {output ? 
              output.map((line,i) => <Text key={i}>{line}</Text>)
            : 'Click "Run Code" to see the output here'}
        </Box>
      </Box>
    </>
  )
}

export default Output;