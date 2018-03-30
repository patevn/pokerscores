import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <p>
        <button className="btn btn-danger btn-cons" onClick={onUndo} disabled={!canUndo}>
            Prev
       </button>
    </p>
)

const mapStateToProps = (state) => ({
    canUndo: state.kassie.past.length > 1,
    canRedo: state.kassie.future.length > 0
})

const mapDispatchToProps = ({
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)

export default UndoRedo