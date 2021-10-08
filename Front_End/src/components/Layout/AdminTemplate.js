import { AdminMenu } from './AdminMenu';
import HeaderAdmin from './HeaderAdmin';
import { Person, Menu, Loyalty } from '@material-ui/icons';
import SideBar from '../SideBar/SideBar';
import UserInfomation from '../UserInfomation/UserInfomation';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';

const options = [
  {
    icon: Menu,
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    icon: Loyalty,
    title: 'Products',
    subItems: [
      {
        title: 'Categories',
        link: '/admin/categories',
      },
      // {
      //   title: 'Sub Categories',
      //   link: '/admin/sub-categories',
      // },
      {
        title: 'Products',
        link: '/admin/products',
      },
    ],
  },
  {
    icon: Person,
    title: 'Users',
    link: '/admin/profile',
  },
  // {
  //   icon: AttachMoney,
  //   title: 'Orders',
  //   link: '/admin/orders',
  // },
];

const useStyles = makeStyles((theme) => ({
  navBar:{

  },
  main: {
    background: '#ddd',
    minHeight: '90vh',
    paddingTop: 64,
    marginBottom: 65,
    width: 'calc(100% - 300px)',
    marginLeft: '280px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 80,
      marginBottom: 85,
    },
  },
}));

export const AdminTemplate = ({children}) => {
  const classes = useStyles();
  return (
    <>
      <HeaderAdmin showMenu />
      <SideBar>
        <UserInfomation
          avatar="http://themes.pixelstrap.com/multikart/assets/images/dashboard/man.png"
          name="Super Admin"
          position="GENERAL MANAGER"
        />
        <AdminMenu options={options} />
      </SideBar>
      <main className={classes.main}>{children}</main>
      <Footer /> 
      {/* hasSideBar */}
    </>
  );
};
