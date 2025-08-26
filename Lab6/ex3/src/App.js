import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  store,
  addAppointment,
  confirmAppointment,
  cancelAppointment
} from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

function Parent() {
  const dispatch = useDispatch();
  return (
    <div className="card p-3 mb-3">
      <h4>Parent: Book Appointment</h4>
      <button
        className="btn btn-primary"
        onClick={() =>
          dispatch(addAppointment({ parent: "John", doctor: "Dr. Smith" }))
        }
      >
        Book with Dr. Smith
      </button>
    </div>
  );
}

function Doctor() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  return (
    <div className="card p-3 mb-3">
      <h4>Doctor: Manage Appointments</h4>
      {appointments.map((a) => (
        <div
          key={a.id}
          className="d-flex justify-content-between align-items-center border-bottom py-2"
        >
          <span>
            {a.parent} booked with {a.doctor} →{" "}
            <strong className="text-info">{a.status}</strong>
          </span>
          {a.status === "pending" && (
            <div>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => dispatch(confirmAppointment(a.id))}
              >
                Confirm
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(cancelAppointment(a.id))}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Receptionist() {
  const appointments = useSelector((state) => state.appointments);
  return (
    <div className="card p-3 mb-3">
      <h4>Receptionist: View All Appointments</h4>
      {appointments.map((a) => (
        <div key={a.id} className="border-bottom py-2">
          {a.parent} → {a.doctor} →{" "}
          <span className="badge bg-secondary">{a.status}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="container mt-4">
        <h2 className="text-center mb-4">🏥 Appointment System</h2>
        <div className="row">
          <div className="col-md-4">
            <Parent />
          </div>
          <div className="col-md-4">
            <Doctor />
          </div>
          <div className="col-md-4">
            <Receptionist />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
