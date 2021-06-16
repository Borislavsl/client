import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {

    const dispatch = useDispatch();

    const initialFetchStream = () => {
        dispatch(fetchStream(props.match.params.id));
    };

    useEffect(initialFetchStream, []);

    const onSubmit = (formValues) => {
        dispatch(editStream(props.match.params.id, formValues));
    }

    const stream = useSelector(state => state.streams[props.match.params.id]);
    
    if (!stream) {
        return <div>Loading...</div>;
    }

    return (<div>
        <h3>Edit a stream</h3>
        <StreamForm
            initialValues={_.pick(stream, 'title', 'description')}
            onSubmit={onSubmit}
        />
    </div>);
};


export default StreamEdit;