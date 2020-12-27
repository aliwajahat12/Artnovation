import React from 'react';
import {UserOrders} from '../../store/actions/Order/Order';
import { useDispatch , useSelector} from 'react-redux'
import MessageBox from '../UI/Error';
import Spinner from '../UI/LoadingSpinner';
import { useEffect } from 'react';
const Ordered = (props)=>{

    const OrderList = useSelector((state) => state.OrderMine);
    const { loading, error, orders } = OrderList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(UserOrders());
    }, [dispatch]);
    return (
        <div>
          <h1>Order History</h1>
          {loading ? (
         <Spinner/>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((or) => (
                  <tr key={or._id}>
                    <td>{or._id}</td>
                    <td>{or.createdAt.substring(0, 10)}</td>
                    <td>{or.totalPrice}</td>
                    <td>{or.isPaid ? or.paidAt.substring(0, 10) : 'No'}</td>
                    <td>
                      {or.isDelivered
                        ? or.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          props.history.push(`/order/${or._id}`);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
}

export default Ordered;