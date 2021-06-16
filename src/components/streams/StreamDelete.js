import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = (props) => {

    const dispatch = useDispatch();
    const initialFetchStream = () => {
        dispatch(fetchStream(props.match.params.id));
    };

    useEffect(initialFetchStream, []);

    const actions = () => {
        const { id } = props.match.params;

        return (
            <React.Fragment>
                <button onClick={() => dispatch(deleteStream(id))} className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>)
    };

    const stream = useSelector(state => state.streams[props.match.params.id]);

    const renderContent = () => {
        if (!stream) {
            return "Are you sure you want to delete this stream?"
        }

        return `Are you sure you want to delete the stream with title: ${stream.title}`
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={actions()}
            onDismiss={() => history.push('/')}
        />
    );
};

export default StreamDelete;