import { makeStyles, Typography } from '@material-ui/core';
import { Image, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import UpdateProduct from '../../pages/admin/user-mgt/UpdateProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(5)}px 20px`,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginBottom: theme.spacing(1),
  },
}));

const AdminInfomation = ({ avatar, name, position, user }) => {
  const classes = useStyles();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openUpdateModalHandler = (item) => {
    setSelectedItem(user);
    setOpenUpdateModal(true);
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
  };

  return (
    <div className={classes.root}>
      {/* <img src={avatar} alt={name} className={classes.avatar} /> */}
      <UpdateProduct
              itemInfo={selectedItem}
              isOpen={openUpdateModal}
              onClose={closeModalHandler}
      />
      <OverlayTrigger
        trigger={["click","hover"]}
        delay={{ show: 100, hide: 10000 }}
        placement="right"
        overlay={
          <Popover >
            <Popover.Header style={{width:'50px', height:'50px', paddingTop:'10px'}}>
              <EditIcon
                onClick={() => openUpdateModalHandler(user)}
                fontSize="small"
                style={{ cursor: 'pointer' }}
              /> 
            </Popover.Header>
          </Popover>
        }
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="light"
            {...triggerHandler}
            className="d-inline-flex align-items-center"
          >
            <Image className={classes.avatar}
              ref={ref}
              // roundedCircle
              src={avatar} 
              alt={name}
            />
          </Button>
        )}
      </OverlayTrigger>

      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="caption" color="primary">
        {position}
      </Typography>
    </div>
  );
};

export default AdminInfomation;
