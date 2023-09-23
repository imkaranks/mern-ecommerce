import React, { useEffect } from 'react'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrders } from '../actions/orderAction'
import { Link } from 'react-router-dom';

function MyOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    state => state.user
  );
  const { loading, error, orders } = useSelector(
    state => state.myOrders
  );

  const columns = [
    {field: 'id', headerName: 'Order ID', minWidth: 300, flex: 0.75},
    {field: 'status', headerName: 'Status', minWidth: 150, flex: 0.5},
    {field: 'itemQty', headerName: 'Items Qty', type: 'number', minWidth: 150, flex: 0.3},
    {field: 'amount', headerName: 'Amount', type: 'number', minWidth: 220, flex: 0.5},
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      }
    },
  ];
  const rows = [];

  orders && orders.forEach((order, i) => {
    rows.push({
      itemQty: order.orderItems.length,
      id: order._id,
      status: order.orderStatus,
      amount: order.totalPrice
    });
  });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrders());
  }, [dispatch, error]);

  return (
    loading
    ? <Loader />
    : (
      <>
        <MetaData title={`${user.name} - Orders`} />
        <section className='py-8'>
          <div className='relative w-11/12 max-w-7xl mx-auto'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight
            />

            <Typography>{user.name}'s Orders</Typography>
          </div>
        </section>
      </>
    )
  )
}

export default MyOrders