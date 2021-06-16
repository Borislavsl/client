import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {

    const dispatch = useDispatch();

    const initialFetchStream = () => {
        
        dispatch(fetchStream(props.match.params.id));
    };

    useEffect(initialFetchStream, []);

    const stream = useSelector(state => state.streams[props.match.params.id])

    if (!stream) {
        return <div>Loading...</div>;
    }

    return (<div>
        <h1>stream.title</h1>
        <h5>stream.description</h5>
    </div>
    );
};

export default StreamShow;