import ProductModal from './ProductModal';
import {
  Box,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '60rem',
    maxWidth: '90%',
    margin: '0 auto',
    overflow: 'hidden',
  },

  content: {
      background: '#fff',
      padding: theme.spacing(2),
      marginTop: '10vh',
  },
  
  title: {
    fontWeight: 'bold',
    display: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },

  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight: '500px',
    minHeight: '500px',
    overflow: 'hidden',
  },

  wrapperClass: {
    padding: '1rem',
    border: '1px solid #ccc',
  },
  
  editorClass: {
    maxheight: '400px',
    height: '400px',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    backgroundColor: 'lightgray',
    padding: '1rem',
    border: '1px solid #ccc',
  },

  toolbarClass: {
    border: '1px solid #ccc',
  },

  preview: {
    padding: '1rem',
    marginTop: '1rem',
  },

}));

const UpdateDescription = ({ isOpen, onClose, prodDescription, setProdDescription }) => {
  const classes = useStyles();

  const closeModalHandler = () => {
    onClose();
  };

  const handleEditorChange = (state) => {
    setProdDescription(state);
  }

  // const createMarkup = (html) => {
  //   console.log(html)
  //   return  {
  //     __html: DOMPurify.sanitize(html)
  //   }
  // }

  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div>   
        <Box borderRadius={6} className={classes.content}>
          <Box>
            <Box>
                <Typography variant="h5" className={classes.title}>
                Mô Tả
                </Typography>
            </Box>
            <Box marginBottom={2} className={classes.section}>
                <Editor 
                    editorState={prodDescription}
                    wrapperClassName={classes.wrapperClass}
                    editorClassName={classes.editorClass}
                    toolbarClassName={classes.toolbarClass}
                    onEditorStateChange={handleEditorChange} //(editorState) => setProdDescription(editorState)
                />
                {/* <div className={classes.preview} dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
            </Box>
            <Box marginTop={2}>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={onClose}>
                    Lưu
                </Button>
            </Box>
          </Box>
        </Box>
      </div>
  </ProductModal>
  );
};
// <textarea
// disabled
// value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
// />
export default UpdateDescription;
