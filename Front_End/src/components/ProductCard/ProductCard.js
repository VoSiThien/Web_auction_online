import { CardContent, makeStyles, Typography, Card, CardMedia } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteHTML } from '../../helpers/deleteHTML';

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow:
      'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
    transition: 'all .5s',
    '&:hover': {
      boxShadow: '0px 2px 8px rgba(0,0,0,.5)',
      '& $title': {
        textDecoration: 'underline',
      },
    },
  },

  link: {
    textDecoration: 'none',
  },

  content: {
    padding: '10px !important',
  },
  media: {
    height: 0,
    paddingTop: 'calc((9/16)*100%)',
    objectFit: 'cover',
    backgroundSize: 'contain',
  },
  title: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#333',
    fontSize: ({ size }) => (size === 'small' ? 14 : 22),
    fontFamily: "bold",
  },
  hasSale: {
    textDecoration: 'line-through',
    color: '#333 !important',
    opacity: 0.9,
    fontSize: '12px !important',
  },
  price: {
    color: theme.palette.secondary.dark,//https://mui.com/customization/palette/   from '@material-ui/core'
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
    '-webkit-box-orient': 'vertical',
    //https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow basic css
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ////////////////////////
    fontSize: ({ size }) => (size === 'small' ? 13 : 14),
  },
  subInfomation: {
    display: '-webkit-box',
    '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
    '-webkit-box-orient': 'vertical',
    //https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow basic css
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ////////////////////////
    fontSize: ({ size }) => (size === 'small' ? 13 : 14),
  },
}));

const ProductCard = ({
  id,
  title,
  image,
  price,
  salePrice,
  description,
  endDate,
  catName,
  currentPrice,
  size = 'normal'
}) => {
  const classes = useStyles({ size });

  return (
    <Card className={classes.card}>
      <Link to={`/details/${id}`} className={classes.link}>
        <CardMedia
          className={classes.media}
          image={image || 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="body1">
            {title}
          </Typography>
          <Typography
            variant="body1"
            className={`${classes.price} ${salePrice ? classes.hasSale : ''}`}>
            Giá : <strong>{price}</strong> VNĐ
          </Typography>



          <Typography className={classes.subInfomation}
            variant="body2"
            color="textSecondary"// https://mui.com/api/typography/#props
            component="p">
            Loại sản phẩm: <strong>{catName}</strong>
          </Typography>

          <Typography className={classes.subInfomation}
            variant="body2"
            color="textSecondary"
            component="p">
            Ngày hết hạn: <strong>{endDate}</strong>
          </Typography>

          <Typography className={classes.subInfomation}
            variant="body2"
            color="textSecondary"
            component="p">
            Giá hiện tại: <strong>{currentPrice == null ? 'Chưa có thông tin' : currentPrice + 'VNĐ'} </strong>
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}>
            Mô tả: <strong>{description && deleteHTML(description)}</strong>
          </Typography>
        </CardContent>

      </Link>
    </Card>
  );
};
export default ProductCard;
