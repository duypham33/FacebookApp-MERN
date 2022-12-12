import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GLOBAL_TYPES from '../../redux/actions/globalTypes';

import Loading from './Loading';
import Toast from './Toast';

const Notify = () => {
    const alert = useSelector(state => state.notify);
    const dispatch = useDispatch();

    return (
        <div>
            {alert.loading && <Loading />}

            {
                alert.error && 
                <Toast msg={{title: 'Error', body: alert.error}}
                handleShow={() => dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {}})} 
                bgColor="bg-danger" />
            }

            {
                alert.success && 
                <Toast msg={{title: 'Success', body: alert.success}} 
                handleShow={() => dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {}})}
                bgColor="bg-success" />
            }
        </div>
    )
}

export default Notify;