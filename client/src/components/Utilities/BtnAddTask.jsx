import React from "react";
import PropTypes from 'prop-types';
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";

const BtnAddTask = ({ className }) => {
    const dispatch = useAppDispatch();
    const onOpenModal = () => {
        dispatch(modalActions.openModalCreateTask());
    };
    return (<>
      <button className={`btn  ${className}`} onClick={onOpenModal}>
        Add new task
      </button>
    </>);
};

BtnAddTask.propTypes = {
  className: PropTypes.string,
}

BtnAddTask.defaultProps = {
  className: ''
}

export default BtnAddTask;
