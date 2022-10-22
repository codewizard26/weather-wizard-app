import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import errorImg from './assets/error.png'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const NotFound = (props) => {
	const { notFoundSearch, open } = props;
	const [openBox, setOpenBox] = React.useState(open)
	const handleClickOpen = () => {
    // setOpen(true);
  };
  const handleClose = () => {
    setOpenBox(false);
  };
	return (
		// <h6 className="notFoundText">
		// 	No result for
		// 	<h6 className="notFoundTextError">{notFoundSearch}</h6>
		// </h6>
		<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openBox}
      >
			<IconButton
			          aria-label="close"
			          onClick={handleClose}
			          sx={{
			            position: 'absolute',
			            right: 8,
			            top: 8,
			            color: (theme) => theme.palette.grey[500],
			          }}
			        >
			          <CloseIcon />
			        </IconButton>
        <DialogContent >
				<img style={{ width: '250px', height: '250px' }} src={errorImg}/>
          <p className="notFoundText">
            City <span className="notFoundTextError"> {notFoundSearch}</span> not found !!!
          </p>
					<p>Try searching another city </p>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>
	);
};

export default NotFound;
